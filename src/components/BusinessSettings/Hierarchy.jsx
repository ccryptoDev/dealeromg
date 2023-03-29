import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import axios from "axios"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import supportIcon from "../../assets/images/reset.png"
import { dealerInfo } from "../../atoms/DealerAtom"
import { CollapseRightBar } from "../../atoms/SideBars"
import CollapsingButton from "../../components/Fields/CollapsingButton"
import useAuth from "../../Hooks/useAuth"
import check from "../../assets/images/check.svg"
import Support from "./Support"

function Hierarchy() {
  const authPermRols = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  )
  const history = useNavigate()
  const [checked, setChecked] = useState([])
  const [dealers, setDealers] = useState([])
  const [success, setSuccess] = useState(false)
  const [dealerGroups, setDealerGroups] = useState([
    {
      dealerGroupID: "",
      dealerGroupName: "",
      createdAt: "",
    },
  ])
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]
  const [dealerGroup, setDealerGroup] = useState(dealerInfoValue.dealerGroup)
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const getDealerGroups = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}DealerGroups`)
      .then((data) => setDealerGroups(data.data))
      .catch((error) => console.log(error))
  }

  const getDealers = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Dealers`)
      .then((res) => {
        setDealers(res.data)
        setLeft(res.data)
      })
      .catch((error) => console.log(error))
  }

  const filteredDealers = useMemo(() => {
    return dealers.filter((dealer) => {
      return dealer.dealerGroup.dealerGroupID === dealerGroup.dealerGroupID
    })
  }, [dealers, dealerGroup])

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
    getDealerGroups()
    getDealers()
  }, [])

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1)
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1)
  }

  function union(a, b) {
    return [...a, ...not(b, a)]
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const numberOfChecked = (items) => intersection(checked, items).length

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleSelect = (event) => {
    const auxDealerGroup = dealerGroups.filter(
      (dealerG) =>
        parseInt(dealerG.dealerGroupID) === parseInt(event.target.value)
    )
    setDealerGroup(auxDealerGroup[0])
  }

  const handleDealerGroupConnections = () => {
    const dealersGroupConnections = right.map((dealerRight) => {
      return {
        dealer_id: dealerRight.dealerID,
        dealergroup_id: dealerGroup.dealerGroupID,
      }
    })

    axios
      .patch(
        `${process.env.REACT_APP_API_DOMG_NODE}dealers/dealergroup`,
        dealersGroupConnections
      )
      .then(() => {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 10000)
      })
      .catch((error) => console.log(error))
  }

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.dealerID}-label`

          return (
            <ListItem
              key={value.dealerID}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.businessName} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )

  return (
    <>
      {authPermRols[2] ? (
        <div className="flex bg-[#F5F9FF] rounded-xl">
          <div className="grid col-span-5 2xl:text-[14px] text-[12px] rounded-l-xl p-4 w-[83%] grow">
            {success ? (
              <div className="flex w-full justify-center">
                <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]">
                  <img
                    className="mx-2 pt-[4px] h-[85%]"
                    src={check}
                    alt="check"
                  />
                  <h3 className="text-white font-bold text-[15px]">
                    Your connections were saved successfully.
                  </h3>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-[#586283]">Dealer Group</h3>
              <div className="bg-white rounded-lg flex flex-col items-start justify-center p-2">
                <p className="font-light text-[#586283]">Platform ID</p>
                <p className="font-bold text-[#586283]">0003452356364</p>
              </div>
            </div>
            <hr className="my-2" />
            <h3 className="font-bold text-[#586283]">
              Bulk Dealer Group Connections
            </h3>
            <div>
              <Grid
                className="my-10"
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>{customList("Choices", left)}</Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList("Chosen", right)}</Grid>
              </Grid>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-1" />
              <div className="col-span-2 flex flex-row justify-between">
                <select
                  className="rounded-xl w-[340px] p-[16px]  focus:outline-[#58628325]"
                  onChange={handleSelect}
                  value={dealerGroup.dealerGroupID}
                >
                  {dealerGroups.map((dealergroup) => (
                    <option
                      value={dealergroup.dealerGroupID}
                      key={dealergroup.dealerGroupID}
                    >
                      {dealergroup.dealerGroupName} -{" "}
                      {dealergroup.dealerGroupID}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleDealerGroupConnections}
                  className="flex items-center w-auto justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <button className="flex items-center w-auto justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center">
                  Add / Replace
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#586283]">Current Hierarchy</h3>
              <hr className="my-2" />
              <div className="flex flex-row space-x-5">
                <h3 className="font-bold text-[#586283]">Dealer Group</h3>
                <h2 className="font-medium text-[#586283]">
                  {dealerGroup.dealerGroupName} / {dealerGroup.dealerGroupID}
                </h2>
              </div>
              <div className="flex flex-row space-x-5">
                <h3 className="font-bold text-[#586283]">Dealership(s)</h3>
                <div className="flex flex-col">
                  {filteredDealers.map((dealer) => (
                    <h2
                      className="font-medium text-[#586283]"
                      key={dealer.dealerID}
                    >
                      {dealer.businessName} / {dealer.dealerID}
                    </h2>
                  ))}

                  <h2 className="font-medium text-[#586283]">
                    [name] / Account ID (link)
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {rightMenuCollapse ? (
            <div className="flex flex-col">
              <CollapsingButton side="right" />
              <div className="flex items-center justify-center w-[48px] h-[48px]">
                <img src={supportIcon} alt="support" />
              </div>
            </div>
          ) : (
            <div className="p-2 2xl:text-[14px] text-[12px] rounded-r-xl bg-[#FFFFFF] w-[17%]">
              <CollapsingButton side="right" />
              <Support />
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

export default Hierarchy
