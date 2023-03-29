import * as React from "react"
import PropTypes from "prop-types"
import { alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import { visuallyHidden } from "@mui/utils"
import {
  changeCurrencyFormat,
  changeStatusFormat,
} from "../../util/changeFormat"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

// {
//   "GenericMasterID": 2012,
//   "DataProviderID": 1,
//   "days_in_stock": 6,
//   "vin": "1FTER4FH8NLD22391",
//   "make": "Ford",
//   "model": "Ranger",
//   "year": 2022,
//   "mileage_value": 0,
//   "mileage_unit": "MI",
//   "fuel_type": "GASOLINE",
//   "body_style": "TRUCK",
//   "drivetrain": "4X4",
//   "price": "43420",
//   "sale_price": "43420",
//   "msrp": "43420",
//   "joined_images_urls": "https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/88f2666bbf594f16afa4947f8ed154fe.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/2613777dd1c04d54adcbad5da3a9b7d0.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/336615676fa6484888fb0671a9701e92.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/8c368e61f2844791a4bbbb7a3f86d2cd.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/d08e5c6ea0e647319a8e48c543d385c3.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/f7e3f5f25ed74972a9a9bcf76c76974f.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/2d5d18f017c84bafb24d18d208f4bd12.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/62641f2c8bbb4715883b92322699368f.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/558615d8f89d44fa82a1be3783e16a11.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/ad7b60eacee0490485f6c751d95bc6a0.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/c942160d2f174cfd9b76f10975665de8.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/927bc2f981b84de39fece8438090f4ac.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/21e5b7ea7efd4e36bfc7f3ae4a00e999.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/d96a881753254e9a98b6dd81a8618cdc.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/5115dd4351ab404a9ea2dacfe341c5c2.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/12f40681775d4c9a94d344e3e65f6f93.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/0ff4fdc1409642c69360b2399516119c.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/374c86cba0b84ce7b08d848eb2cf1301.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/7e1b8ef352574351a6bac28374c4f24b.jpg|https://content.homenetiol.com/2003078/2212532/~resize-fit.640x640~canvas-size.640x640xffffff/380d6a84c4e54dfba71d1d9a92f5166b.jpg|",
//   "views": 0,
//   "imageCount": 21
// },

const headCellsInventory = [
  {
    id: "imageCount",
    width: 300,
    numeric: true,
    disablePadding: true,
    label: "#Image Count",
  },
  {
    id: "days_in_stock",
    width: 300,
    numeric: true,
    disablePadding: true,
    label: "Days on Lot",
  },
  {
    id: "stockNumber",
    numeric: false,
    disablePadding: true,
    label: "Stock Number",
  },
  {
    id: "vin",
    numeric: false,
    disablePadding: true,
    label: "Vin",
  },
  {
    id: "make",
    numeric: false,
    disablePadding: true,
    label: "Make",
  },
  {
    id: "model",
    numeric: false,
    disablePadding: true,
    label: "Model",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: true,
    label: "Year",
  },
  {
    id: "mileage_value",
    numeric: true,
    disablePadding: true,
    label: "Mileage",
  },
  {
    id: "body_style",
    numeric: false,
    disablePadding: false,
    label: "Body Style",
  },

  {
    id: "state_of_vehicle",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "msrp",
    numeric: true,
    disablePadding: false,
    label: "MSRP",
  },
  {
    id: "vdp_url",
    numeric: true,
    disablePadding: false,
    label: "VDP Url",
  },
  {
    id: "trim",
    numeric: true,
    disablePadding: false,
    label: "Trim",
  },
  {
    id: "sale_price",
    numeric: true,
    disablePadding: false,
    label: "Other Price",
  },
  {
    id: "fuel_type",
    numeric: false,
    disablePadding: false,
    label: "Fuel",
  },
  {
    id: "drivetrain",
    numeric: false,
    disablePadding: false,
    label: "Drive Train",
  },
]
const headCellsSold = [
  {
    id: "imageCount",
    width: 300,
    numeric: true,
    disablePadding: true,
    label: "#Image Count",
  },
  {
    id: "days_in_stock",
    width: 300,
    numeric: true,
    disablePadding: true,
    label: "Days on Lot",
  },
  {
    id: "stockNumber",
    numeric: false,
    disablePadding: true,
    label: "Stock Number",
  },
  {
    id: "recordstatus",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "solddate",
    numeric: true,
    disablePadding: false,
    label: "Sold Date",
  },
  {
    id: "vin",
    numeric: false,
    disablePadding: true,
    label: "Vin",
  },
  {
    id: "make",
    numeric: false,
    disablePadding: true,
    label: "Make",
  },
  {
    id: "model",
    numeric: false,
    disablePadding: true,
    label: "Model",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: true,
    label: "Year",
  },
  {
    id: "mileage_value",
    numeric: true,
    disablePadding: true,
    label: "Mileage",
  },
  {
    id: "body_style",
    numeric: false,
    disablePadding: false,
    label: "Body Style",
  },

  {
    id: "state_of_vehicle",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "msrp",
    numeric: true,
    disablePadding: false,
    label: "MSRP",
  },
  {
    id: "sale_price",
    numeric: true,
    disablePadding: false,
    label: "Other Price",
  },
  {
    id: "fuel_type",
    numeric: false,
    disablePadding: false,
    label: "Fuel",
  },
  {
    id: "drivetrain",
    numeric: false,
    disablePadding: false,
    label: "Drive Train",
  },
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    view,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {(view === "sold" ? headCellsSold : headCellsInventory).map(
          (headCell) => (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

export default function EnhancedTable({ rows, view }) {
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [selected, setSelected] = React.useState([])
  const [page] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.GenericMasterID)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              view={view}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.GenericMasterID)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.GenericMasterID)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.GenericMasterID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.firstImageUrl ? (
                          <a
                            href={`${row.firstImageUrl}`}
                            rel="noreferrer"
                            className="underline"
                            target="_blank"
                          >
                            {row.imageCount}
                          </a>
                        ) : (
                          row.imageCount
                        )}
                      </TableCell>
                      <TableCell align="center">{row.days_in_stock}</TableCell>
                      <TableCell align="center">{row.stockNumber}</TableCell>
                      {view === "sold" && (
                        <TableCell align="center">
                          {changeStatusFormat(row.recordStatus.id)}
                        </TableCell>
                      )}
                      {view === "sold" && (
                        <TableCell align="center">{row.soldDate}</TableCell>
                      )}
                      <TableCell align="center">{row.vin}</TableCell>
                      <TableCell align="center">{row.make}</TableCell>
                      <TableCell align="center">{row.model}</TableCell>
                      <TableCell align="center">{row.year}</TableCell>
                      <TableCell align="center">{row.mileage_value}</TableCell>
                      <TableCell align="center">
                        {row.body_style === "" ? "Empty" : row.body_style}
                      </TableCell>

                      <TableCell align="center">
                        {row.state_of_vehicle}
                      </TableCell>
                      <TableCell align="center">
                        {`$ ${changeCurrencyFormat(row.price)}`}
                      </TableCell>
                      <TableCell align="center">{row.msrp}</TableCell>
                      {view === "inventory" && (
                        <TableCell align="center">
                          {row.final_url !== "" ? (
                            <a
                              href={row.final_url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline"
                            >
                              Show Site
                            </a>
                          ) : (
                            "No Site"
                          )}
                        </TableCell>
                      )}
                      {view === "inventory" && (
                        <TableCell align="center">{row.trim}</TableCell>
                      )}
                      <TableCell align="center">
                        {`$ ${changeCurrencyFormat(row.sale_price)}`}
                      </TableCell>
                      <TableCell align="center">{row.fuel_type}</TableCell>
                      <TableCell align="center">{row.drivetrain}</TableCell>
                    </TableRow>
                  )
                }
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  )
}
