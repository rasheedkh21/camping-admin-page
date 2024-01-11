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
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Input } from "@mui/joy";
import Snackbar from "@mui/joy/Snackbar";

const BASEURL = "http://localhost:5050/api/v1";

export default function Motors() {
  const [allData, setAllData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [licence, setLicence] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}/motors/getAllMotors`);
        const data = await response.json();
        setAllData(data.data);
      } catch (error) {
        console.log("Motor data is not found", error);
      }
    };
    fetchData();
  }, []);

  //ADD
  const handleClick = async () => {
    try {
      const response = await fetch(`${BASEURL}/motors/addNewMotor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          company: company,
          cost: cost,
          licence: licence,
        }),
      });
      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.log("New motor data is not defined", error);
    }
  };
  //DELETE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASEURL}/motors/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        console.log(response);
        // setOpen(true);
        // fetchData();
      }
    } catch (error) {
      console.log("Error deleting motor data", error);
    }
  };
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
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
        >
          ADD
        </Button>
        <Snackbar
          autoHideDuration={5000}
          variant="solid"
          color="primary"
          size="lg"
          invertedColors
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={(theme) => ({
            background: `linear-gradient(45deg, ${theme.palette.primary[600]} 30%, ${theme.palette.primary[500]} 90%})`,
            maxWidth: 360,
          })}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography level="title-lg" sx={{ textAlign: "center" }}>
              Add New Information
            </Typography>
            <Typography
              sx={{ mt: 1, mb: 2 }}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Input
                color="primary"
                placeholder="Add car name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Add car Company"
                onChange={(e) => setCompany(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Add cost"
                onChange={(e) => setCost(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Add licence type"
                onChange={(e) => setLicence(e.target.value)}
              />
              {/* <Input
                color="primary"
                placeholder="Add number of people"
                onChange={(e) => setPeople(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Add location"
                onChange={(e) => setLocation(e.target.value)}
              /> */}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", justifyContent: "right" }}
            >
              <Button variant="solid" color="success" onClick={handleClick}>
                Add
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          </div>
        </Snackbar>
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
                  <div style={{ display: "flex", gap: "20px" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                    
                    >
                      Edit
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
