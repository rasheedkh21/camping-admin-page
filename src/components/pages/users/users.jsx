import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BASEURL = "http://localhost:5050/api/v1/";

export default function Users() {
  const [allData, setAllData] = React.useState([]);
  const [totalUsers, setTotalUsers] = React.useState(0); // State to store the total
  const [filteredData, setFilteredData] = React.useState("");
  const [search, setSearch] = React.useState("");

  //to get All Users Data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}auth/getAllUsers`);
        const users = await response.json();
        setAllData(users.data);
        filteredData(users.data)
      } catch (error) {
        console.log("Users  data is wrong:", error);
      }
    };
    fetchData();
  }, []);

  //TO ADD added date
  const formatDate = (createdAt) => {
    const data = new Date(createdAt);
    return data.toISOString().split("T")[0];
  };
  console.log(formatDate);
  React.useEffect(() => {
    // Calculate total users after data is fetched
    setTotalUsers(allData.length);
  }, [allData]);

  //TO SEARCH DATA
  const handleSearch = (query) => {
    setSearch(query);
    const filtered = allData.filter(
      (data) =>
        data.name.toLowerCase().includes(query.toLowerCase()) ||
        data.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  // const filteredSearch = searchFilter;
  console.log("filter", filteredData);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Registred date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredData &&
              filteredData.map((data) => (
              <StyledTableRow key={data.name}>
                <StyledTableCell>{data.name || "No Data"}</StyledTableCell>
                <StyledTableCell>{data.email || "No Data"}</StyledTableCell>
                <StyledTableCell> {formatDate(data.createdAt || "No Data")}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Total Users: {totalUsers}</h3>
    </div>
  );
}
