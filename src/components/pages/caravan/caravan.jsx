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
import Popup from "reactjs-popup";

const BASEURL = "https://api-camping.isabek.uz/api/v1/";

export default function Caravan() {
  const [allData, setAllData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [licence, setLicence] = React.useState("");
  const [people, setPeople] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [filteredData, setFilteredData] = React.useState("");
  const [search, setSearch] = React.useState("");

  //To get ALL DATA from Server
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}caravan/getAllCaravan`);
        const caravan = await response.json();
        setAllData(caravan.data);
        setFilteredData(caravan.data);
      } catch (error) {
        console.log("Caravan data is not found", error);
      }
    };
    fetchData();
  }, []);

  //ADD
  const handleAddClick = async () => {
    try {
      const response = await fetch(`${BASEURL}caravan/addNewCaravan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          company: company,
          cost: cost,
          licence: licence,
          people: people,
          location: location,
        }),
      });
      await response.json();
      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.log("Add caravan data is wrong:", error);
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASEURL}caravan/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // fetchData();
      }
    } catch (error) {
      console.log("Error deleting caravan data", error);
    }
  };
  console.log("data:", allData);

  //TO SEARCH DATA
  const handleSearch = (query) => {
    setSearch(query);
    const filtered = allData.filter(
      (data) =>
        data.name.toLowerCase().includes(query.toLowerCase()) ||
        data.company.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  // const filteredSearch = searchFilter;
  console.log("filter", filteredData);

  //TO ADD added date
  const formatDate = (createdAt) => {
    const data = new Date(createdAt);
    return data.toISOString().split("T")[0];
  };
  console.log(formatDate);

  //To Update information
  const handleUpdateClick = async (_id) => {
    try {
      const response = await fetch(`${BASEURL}caravan/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Fix the typo here
        },
        body: JSON.stringify({
          name: name,
          company: company,
          cost: cost,
          licence: licence,
          people: people,
          location: location,
        }),
      });
      if (response.ok) {
        console.log(response.ok);
        setEditOpen(false);
      }
    } catch (error) {
      console.log("update is wrong", error);
    }
  };

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
              <Input
                color="primary"
                placeholder="Add number of people"
                onChange={(e) => setPeople(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="Add location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", justifyContent: "right" }}
            >
              <Button variant="solid" color="success" onClick={handleAddClick}>
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
              <TableCell style={{   background:"linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)", color:"white", font:"10px" }}>
                Name of the car
              </TableCell>
              <TableCell style={{  background:"linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)",color:"white", font:"10px" }}>
                Brand
              </TableCell>
              <TableCell style={{  background:"linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)",color:"white", font:"10px" }}>Cost</TableCell>
              <TableCell style={{   background:"linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)",  color:"white", font:"10px"}}>
                Licence
              </TableCell>
              <TableCell style={{   background:"linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)", color:"white", font:"10px" }}>
                People
              </TableCell>
              <TableCell style={{  background:"linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)", color:"white", font:"10px" }}>
                Location
              </TableCell>
              <TableCell style={{  background:"linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)", color:"white", font:"10px"}}>Date</TableCell>
              <TableCell style={{  background:"linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)",color:"white", font:"10px" }}>
                Tools
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.map((data) => (
                <TableRow
                  key={data.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{data.name || "Data is not available"}</TableCell>
                  <TableCell>
                    {data.company || "Data is not available"}
                  </TableCell>
                  <TableCell>{data.cost || "Data is not available"}</TableCell>
                  <TableCell>
                    {data.licence || "Data is not available"}
                  </TableCell>
                  <TableCell>
                    {data.people || "Data is not available"}
                  </TableCell>
                  <TableCell>
                    {data.location || "Data is not available"}
                  </TableCell>
                  <TableCell>
                    {formatDate(data.createdAt || "No Data")}
                  </TableCell>
                  <TableCell align="right">
                    <div style={{ display: "flex", gap: "20px" }}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          handleDelete(data._id);
                        }}
                      >
                        Delete
                      </Button>
                      <Popup
                        trigger={
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => {
                              setEditOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                backgroundColor: "#0066CC",
                                width: "20vw",
                                height: "50%",
                              }}
                            >
                              <Typography
                                level="title-lg"
                                sx={{ textAlign: "center" }}
                              >
                                Update Information
                              </Typography>
                              <Typography
                                sx={{ mt: 1, mb: 2 }}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "20px",
                                  backgroundColor: "#0066CC",
                                }}
                              >
                                <Input
                                  color="primary"
                                  placeholder="Name"
                                  onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                  color="primary"
                                  placeholder="Company"
                                  onChange={(e) => setCompany(e.target.value)}
                                />
                                <Input
                                  color="primary"
                                  placeholder="Cost"
                                  onChange={(e) => setCost(e.target.value)}
                                />
                                <Input
                                  color="primary"
                                  placeholder="Licence"
                                  onChange={(e) => setLicence(e.target.value)}
                                />
                                <Input
                                  color="primary"
                                  placeholder="people"
                                  onChange={(e) => setPeople(e.target.value)}
                                />
                                <Input
                                  color="primary"
                                  placeholder="Location"
                                  onChange={(e) => setLocation(e.target.value)}
                                />
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                  display: "flex",
                                  justifyContent: "right",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => {
                                    handleUpdateClick(data._id);
                                  }}
                                  
                                >
                                  Update
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    console.log("modal closed ");
                                    close();
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Stack>
                            </div>
                          </div>
                        )}
                      </Popup>
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
