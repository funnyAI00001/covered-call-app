import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const CoveredCallPremiumsTable = ({
  symbols,
  sharePrices,
  ATMs,
  OTM5s,
  OTM10s,
  expiration_date,
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
                <TableCell align="center">Share price x 100</TableCell>
                <TableCell align="center">Expiration Date</TableCell>
                <TableCell align="center">ATM</TableCell>
                <TableCell align="center">5% OTM</TableCell>
                <TableCell align="center">10% OTM</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "&:last-child td, &:last-child th": { borderBottom: "none" },
              }}
            >
              {symbols.map((symbol, index) => (
                <TableRow
                  key={symbol}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {symbol}
                  </TableCell>
                  <TableCell align="center">
                    $
                    {Intl.NumberFormat("en-US").format(
                      sharePrices[index] * 100
                    )}
                  </TableCell>
                  <TableCell align="center">{expiration_date}</TableCell>
                  <TableCell align="center">${ATMs[index]}</TableCell>
                  <TableCell align="center">${OTM5s[index]}</TableCell>
                  <TableCell align="center">${OTM10s[index]}</TableCell>
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

export default CoveredCallPremiumsTable;
