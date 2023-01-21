import { useState } from "react";
import {
  Table,
  TableBody,
  Select,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  MenuItem,
  FormControl,
} from "@mui/material";
import { rows as data } from "../constants/mock";
import "./index.scss";

export default function BasicTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [caseType, setCaseType] = useState("");
  const [rows, setRows] = useState(data);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeView = (event: any) => {
    const values = event.target.value
      ? data.filter((item) => item.caseType === event.target.value)
      : data;
    setRows(values);
    setCaseType(event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mx={3}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" align="center" fontWeight="bold">
            View :
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={caseType}
              onChange={handleChangeView}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="Open">My Open Cases</MenuItem>
              <MenuItem value="New">Action Required</MenuItem>
              <MenuItem value="Closed">My Closed Cases</MenuItem>
              <MenuItem value="">All</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" align="center" fontWeight="bold">
            Records per page :
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "18px" }}
              align="left"
            >
              Case Number
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "18px" }}
              align="left"
            >
              Case Type
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "18px" }}
              align="left"
            >
              Subject
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "18px" }}
              align="left"
            >
              Created By
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "18px" }}
              align="left"
            >
              Last Activity
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                key={row.caseNumber}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.caseNumber}
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  {row.caseType}
                </TableCell>
                <TableCell align="left">{row.subject}</TableCell>
                <TableCell align="left">
                  {row.createdBy.toDateString()}
                </TableCell>
                <TableCell align="left">
                  {row.lastActvity.toDateString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Typography
        variant="h6"
        align="center"
        fontWeight="bold"
        my={3}
      >{`Page 1 of ${rowsPerPage}: ${rows.length} Total Records`}</Typography>
    </TableContainer>
  );
}
