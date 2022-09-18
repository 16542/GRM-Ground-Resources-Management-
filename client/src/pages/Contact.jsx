import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import styled from "styled-components";
const Form = styled.form`
  display: flex;
  width: 50vh;
  height: 100px;
`;
const InputSearch = styled.input`
  margin: 30px;
  padding: 2px;
  font-size: 20px;
  font-weight: 300;
  border: 0.5px solid teal;
  border-radius: 10px;
`;
const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredContact, setFilteredContact] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const { data } = await axios.get("http://localhost:5000/contact/");
      if (data) {
        setContacts(data);
      }
    };
    getContacts();
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
  const SearchItems = (SearchValue) => {
    setSearchInput(SearchValue);
    if (searchInput !== "") {
      const filteredData = contacts.filter((item) => {
        return Object.values(item.contactName)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredContact(filteredData);
    } else {
      setFilteredContact(contacts);
    }
  };
  return (
    <>
      <h1 style={{ color: "white" }}>Contact number: {contacts.length} </h1>
      <Form>
        <InputSearch
          placeholder="search for contact..."
          onChange={(e) => SearchItems(e.target.value)}
        />
      </Form>
      <TableContainer component={Paper} style={{ backgroundColor: "#a2c11c" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "red" }}>Name</TableCell>
              <TableCell
                align="right"
                style={{ color: "red", fontSize: "17px" }}
              >
                State
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "red", fontSize: "17px" }}
              >
                Status
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "red", fontSize: "17px" }}
              >
                Begin
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "red", fontSize: "17px" }}
              >
                End
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchInput.length > 1
              ? filteredContact.map((item) => {
                  return (
                    <TableRow
                      key={item.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.contactName}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "16px" }}>
                        {item.contactState}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "16px" }}>
                        {item.contactStatus}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "16px" }}>
                        {ConvertToDate(item.contactBeginTimestamp)}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "16px" }}>
                        {ConvertToDate(item.contactEndTimestamp)}
                      </TableCell>
                    </TableRow>
                  );
                })
              : contacts.slice(0, 15).map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.contactName}
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {item.contactState}
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {item.contactStatus}
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {ConvertToDate(item.contactBeginTimestamp)}
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {ConvertToDate(item.contactEndTimestamp)}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Contact;
