import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const getalerts = async () => {
      const { data } = await axios.get("http://localhost:5000/alerts");
      if (data) {
        setAlerts(data);
      }
    };
    getalerts();
  }, []);
  const ConvertToDate = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };
  return (
    <>
      <h1 style={{color:"white"}}>Contact number: {alerts.length} </h1>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "red" }}>Name</TableCell>
              <TableCell
                align="right"
                style={{ color: "red", fontSize: "17px" }}
              >
                Message
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "red", fontSize: "17px" }}
              >
                Category
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "red", fontSize: "17px" }}
              >
                Time
              </TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.slice(0, 15).map((err) => (
              <TableRow
                key={err.errorMessage}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {err.errorMessage}
                </TableCell>
                <TableCell align="right" style={{ fontSize: "16px" }}>
                  {err.errorCategory}
                </TableCell>
                <TableCell align="right" style={{ fontSize: "16px" }}>
                {ConvertToDate(err.errorTime)}
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Alerts;
