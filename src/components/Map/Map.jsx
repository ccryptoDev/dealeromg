import { useRef, useEffect } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

import consumerMarker from "./map_consumer_pin.png"
import dealerMarker from "./map_dealer_pin.png"

let consumerPopup, currentUserPopup, unclusteredPopUp

const Map = ({ consumerGeoJson, lng, lat, zoom, apiKey, showMap }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) {
      // stops map from intializing more than once
      map.current.getSource("consumers").setData({
        type: "FeatureCollection",
        features: [...consumerGeoJson],
      })
    } else {
      map.current = new maplibregl.Map({
        container: mapContainer.current, // reference to the map container div in the DOM
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`, // API key should come from an env file
        center: [lng, lat], // center of the map
        zoom, // initial zoom level
        attributionControl: false,

        // please remove pitch and bearing if you do not want the prespective view

        // pitch: 60, // pitch in degrees
        // bearing: 0, // bearing in degrees

        /* 
              
              bearing(number): The desired bearing in degrees. The bearing is the compass direction that is "up". 
              For example, bearing: 90 orients the map so that east is up.
              
              pitch(number): The desired pitch in degrees. The pitch is the angle towards the horizon measured in degrees with a range between 0 and 85 degrees. 
              For example, pitch: 0 provides the appearance of looking straight down at the map, 
              while pitch: 60 tilts the user's perspective towards the horizon. Increasing the pitch value is often used to display 3D objects.
              
              https://docs.mapbox.com/mapbox-gl-js/api/properties/#cameraoptions
  
              */
      })

      map.current.on("load", () => {
        map.current.addSource("postcodeData", {
          type: "vector",
          url: `https://api.maptiler.com/tiles/countries/tiles.json?key=${apiKey}`,
        })

        // add layer of postal codes with the label of the postal code and its borders
        map.current.addLayer({
          id: "postalcodes-data",
          type: "line",
          source: "postcodeData",
          "source-layer": "postal",
          filter: ["==", "level", 1],
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "rgba(255, 0, 0)",
            "line-width": 1,
          },
        })

        map.current.addLayer({
          id: "clusters-label",
          type: "symbol",
          source: "postcodeData",
          "source-layer": "postal",
          filter: ["==", "level", 1],
          // "minzoom": 10,
          layout: {
            "text-field": "{code}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          paint: {
            "text-color": "rgba(255, 0, 0)",
          },
        })

        // load consumer data
        map.current.loadImage(consumerMarker, (error, image) => {
          if (error) throw error
          map.current.addImage("consumerMarker", image) // consumerMarker is availble to use on the map
        })

        // load current user marker
        map.current.loadImage(dealerMarker, (error, image) => {
          if (error) throw error
          map.current.addImage("dealerMarker", image)
        })

        map.current.addSource("consumers", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [...consumerGeoJson],
          },
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points
        })

        // add consumer marker navy blue circle
        map.current.addLayer({
          id: "consumer",
          type: "symbol",
          source: "consumers",
          layout: {
            "icon-image": "consumerMarker",
            "icon-ignore-placement": true,
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.25],
            "text-anchor": "top",
          },
        })

        map.current.addSource("consumerspostal", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [...consumerGeoJson],
          },
        })

        map.current.addLayer({
          id: "postal",
          type: "circle",
          source: "consumerspostal",
          paint: {
            "circle-color": "#000080",
            "circle-radius": 8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        })

        map.current.setLayoutProperty("postal", "visibility", "none")

        map.current.on("click", "postal", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice()
          const properties = e.features[0].properties
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          consumerPopup = new maplibregl.Popup().setLngLat(coordinates)
            .setHTML(`
                            ${properties.address1},
                            ${properties.address2}<br>
                            ${properties.city}<br>
                            ${properties.state}<br>
                            ${properties.postalCode}
                        `)
          consumerPopup.addTo(map.current)
        })
        // add culsters to map
        map.current.addLayer({
          id: "clusters",
          type: "circle",
          source: "consumers",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#ffffff",
              750,
              "#ffffff",
              751,
              "#ffffff",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              21,
              750,
              22,
            ],
            "circle-stroke-width": 1,
            "circle-stroke-color": "#000080",
          },
        })

        // show text(numbers) point count
        map.current.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "consumers",
          filter: ["has", "point_count"],

          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
            "text-allow-overlap": true,
          },
          paint: {
            "text-color": "#000080",
          },
        })

        // layer to show unclustered points
        map.current.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "consumers",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#000080",
            "circle-radius": 8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#000080",
          },
        })

        // clusters click
        map.current.on("click", "clusters", (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          })
          const clusterId = features[0].properties.cluster_id
          map.current
            .getSource("consumers")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return
              map.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom,
              })
            })
        })

        // unclustered
        map.current.on("click", "unclustered-point", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice()
          const properties = e.features[0].properties
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          unclusteredPopUp = new maplibregl.Popup().setLngLat(coordinates)
            .setHTML(`
                            ${properties.address1},
                            ${properties.address2}<br>
                            ${properties.city}<br>
                            ${properties.state}<br>
                            ${properties.postalCode}
                        `)
          unclusteredPopUp.addTo(map.current)
        })

        // make pointer cursor on hover
        map.current.on("mouseenter", "clusters", () => {
          map.current.getCanvas().style.cursor = "pointer"
        })

        // change cursor to normal on mouse leave
        map.current.on("mouseleave", "clusters", () => {
          map.current.getCanvas().style.cursor = ""
        })

        // load current user layer source
        map.current.addSource("currentUser", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  description: "<strong>test</strong>",
                  icon: "theatre",
                },
                geometry: {
                  type: "Point",
                  coordinates: [lng, lat],
                },
              },
            ],
          },
        })

        // add current user layer to map
        map.current.addLayer({
          id: "currentUser",
          type: "symbol",
          source: "currentUser",
          layout: {
            "icon-image": "dealerMarker",
            "icon-ignore-placement": true,
            "text-allow-overlap": true,
          },
        })

        // show popup if required currently it says 'you are here'
        map.current.on("click", "currentUser", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice()
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          currentUserPopup = new maplibregl.Popup({
            closeOnClick: true,
            offset: [0, -20],
          })
            .setLngLat(coordinates)
            .setHTML(`You are here.`)
          currentUserPopup.addTo(map.current)
        })

        // add map controls e.g. zoom and compass
        map.current.addControl(new maplibregl.NavigationControl(), "top-right")
        map.current.addControl(
          new maplibregl.AttributionControl(),
          "bottom-right"
        )
      })
    }
  }, [showMap])

  return (
    <div className="relative w-[100%] h-[100%] flex place-content-center">
      <div ref={mapContainer} className="absolute w-[100%] h-[630px]" />
    </div>
  )
}
export default Map
