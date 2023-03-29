import axios from "axios"

export const getInventoryBuilder = (filters = {}) => {
  axios
    .post(`${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/Get`, filters)
    .then((response) => {
      if (response.status === 200) return response.data
    })
    .catch((error) => console.log(error))
}
