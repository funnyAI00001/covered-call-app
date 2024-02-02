import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { connect } from "react-redux";

const CoveredCallReturnsTable = ({
  symbols,
  sharePrices,
  premium,
  ROIs,
  annualROIs,
}) => {
  const theme = useTheme();

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
          <Table
            aria-label="covered call premiums table"
            sx={{ "& .MuiTableCell-body": { color: "white" } }}
          >
            <TableHead sx={{ textTransform: "none" }}>
              <TableRow>
                <TableCell align="center">Symbol</TableCell>
                <TableCell align="center">Share price</TableCell>
                <TableCell align="center">Expiry Date</TableCell>
                <TableCell align="center">Premium</TableCell>
                <TableCell align="center">ROI</TableCell>
                <TableCell align="center">Annual. ROI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "&:last-child td, &:last-child th": { borderBottom: "none" },
              }}
            >
              {symbols.map((symbol, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {symbol}
                  </TableCell>
                  <TableCell align="center">${sharePrices[index]}</TableCell>
                  <TableCell align="center">Feb-16’24</TableCell>
                  <TableCell align="center">${premium[index]}</TableCell>
                  <TableCell align="center">{ROIs[index]}{" %"}</TableCell>
                  <TableCell align="center">{annualROIs[index]}{" %"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body1" color="initial" textAlign="right">
          Premiums per 100 shares
        </Typography>
      </Box>
    </fieldset>
  );
};

const mapStateToProps = (state) => ({
  sharePrices: state.stock.sharePrices,
});

export default connect(mapStateToProps)(CoveredCallReturnsTable);
