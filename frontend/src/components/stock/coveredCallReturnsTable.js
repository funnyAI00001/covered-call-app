import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { connect } from "react-redux";

const CoveredCallReturnsTable = ({
  symbols,
  sharePrices,
  premium,
  ROIs,
  annualROIs,
  expiration_date,
  strikePrices,
}) => {
  const theme = useTheme();
  const rowNames = [
    "Symbol",
    "Share price x 100",
    "Expiry Date",
    "Strike Price",
    "Premium",
    "ROI",
    "Annual. ROI",
  ];

  return (
    <fieldset
      style={{
        width: "60%",
        margin: "auto",
        borderColor: theme.palette.text.third,
        borderRadius: 5,
        marginTop: "3vh",
      }}
    >
      <Box
        textAlign="center"
        sx={{
          width: "80vw",
          "@media (min-width: 600px)": {
            width: "auto", // Set to auto for screens wider than 600px
          },
        }}
      >
        <TableContainer>
          <Table aria-label="covered call premiums table">
            <TableBody
              sx={{
                "&:last-child td, &:last-child th": { borderBottom: "none" },
              }}
            >
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{
                    color: theme.palette.text.third,
                    fontWeight: 600,
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {rowNames[0]}
                </TableCell>
                {symbols.map((item, index) => (
                  <TableCell align="center" key={index}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{
                    color: theme.palette.text.third,
                    fontWeight: 600,
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {rowNames[1]}
                </TableCell>
                {sharePrices.map((item, index) => (
                  <TableCell align="center" key={index}>
                    ${Intl.NumberFormat("en-US").format(item * 100)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{
                    color: theme.palette.text.third,
                    fontWeight: 600,
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {rowNames[2]}
                </TableCell>
                {sharePrices.map((item, index) => (
                  <TableCell align="center" key={index}>
                    {expiration_date}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{
                    color: theme.palette.text.third,
                    fontWeight: 600,
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {rowNames[3]}
                </TableCell>
                {strikePrices.map((item, index) => (
                  <TableCell align="center" key={index}>
                    ${item}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{
                    color: theme.palette.text.third,
                    fontWeight: 600,
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {rowNames[4]}
                </TableCell>
                {premium.map((item, index) => (
                  <TableCell align="center" key={index}>
                    ${item}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{
                    color: theme.palette.text.third,
                    fontWeight: 600,
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {rowNames[5]}
                </TableCell>
                {ROIs.map((item, index) => (
                  <TableCell align="center" key={index}>
                    {item}%
                  </TableCell>
                ))}
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{
                    color: theme.palette.text.third,
                    fontWeight: 600,
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {rowNames[6]}
                </TableCell>
                {annualROIs.map((item, index) => (
                  <TableCell align="center" key={index}>
                    {item}%
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </fieldset>
  );
};

const mapStateToProps = (state) => ({
  sharePrices: state.stock.sharePrices,
  expiration_date: state.stock.expiration_date,
});

export default connect(mapStateToProps)(CoveredCallReturnsTable);
