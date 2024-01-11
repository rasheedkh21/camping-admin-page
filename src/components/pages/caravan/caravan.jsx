import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


const BASEURL = "http://localhost:3000/api/v1";

export default function Caravan() {
  const [allData, setAllData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}/caravan/getAllCaravan`);
        const data = await response.json();
        setAllData(data.data);
      } catch (error) {
        console.log("Caravan data is not found", error);
      }
    };
    fetchData();
  }, []);
  console.log("data:", allData);

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
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained" color="success">
          ADD
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name of the car</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Licence</TableCell>
              <TableCell>People</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Tools</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((data) => (
              <TableRow
                key={data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{data.name || "Data is not available"}</TableCell>
                <TableCell>{data.company || "Data is not available"}</TableCell>
                <TableCell>{data.cost || "Data is not available"}</TableCell>
                <TableCell>{data.licence || "Data is not available"}</TableCell>
                <TableCell>{data.people || "Data is not available"}</TableCell>
                <TableCell>
                  {data.location || "Data is not available"}
                </TableCell>
                <TableCell>
                <div style={{display:"flex", gap:"20px"}}>
                 <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                  <Button variant="outlined" startIcon={<EditIcon/>}>
                    Delete
                  </Button>
                 </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
