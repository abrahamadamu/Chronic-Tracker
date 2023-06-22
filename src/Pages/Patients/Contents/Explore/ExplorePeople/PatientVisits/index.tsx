import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  Box,
  Grid,
  LinearProgress,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  Checklist,
  ChevronLeft,
  Add,
} from "@mui/icons-material";

import { backend } from "Config/data";
import { getFullName } from "Common/utilities";

function PatientVisits() {
  const { URL_regno } = useParams();
  const navigate = useNavigate();

  const [visitsData, setVisitsData] = useState<{
    patient: Record<string, any>;
    visits: Record<string, any>[];
  }>({ patient: {}, visits: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!URL_regno) return;
    setLoading(true);
    fetch(backend + "/visits/find", {
      method: "POST",
      body: JSON.stringify({ regno: URL_regno }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) =>
        response.json().then((json) => {
          setVisitsData(json);
        })
      )
      .finally(() => setLoading(false));
  }, [URL_regno]);

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Button startIcon={<ChevronLeft />} onClick={() => navigate("..")}>
        {"Back"}
      </Button>
      <Typography sx={{ marginTop: "20px" }} variant="h5">
        Patient history
      </Typography>
      <br />
      <Paper sx={{ padding: "20px" }}>
        <Grid container direction="row" sx={{ marginTop: "20px", gap: 15 }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            width="fit-content"
          >
            <Box sx={{ position: "relative" }}>
              {loading && (
                <Grid
                  container
                  sx={{ position: "absolute", width: "100%", height: "100%" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress />
                </Grid>
              )}
              <Grid
                container
                direction="column"
                alignItems="center"
                width="fit-content"
                sx={{ opacity: loading ? "0" : "unset" }}
              >
                <AccountCircle sx={{ fontSize: "120px", color: "#0007" }} />
                <Typography fontWeight="bold" fontSize="14pt">
                  {loading && "Abebe Molla Zergaw"}
                  {getFullName(
                    visitsData.patient.firstname,
                    visitsData.patient.fathername,
                    visitsData.patient.grandfathername
                  )}
                </Typography>
                <br />
                <LinearProgress
                  variant="determinate"
                  value={37}
                  sx={{ width: "100%", height: "10px", borderRadius: "10px" }}
                  color="error"
                />
                <Typography fontSize="10pt" fontWeight="bold" color="red">
                  CVD Risk: 37% (HIGH)
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            width="0"
            sx={{ flexGrow: 1 }}
          >
            <Typography fontSize="20px" width="100%">
              Previous Visits
            </Typography>

            {loading ? (
              <LinearProgress
                sx={{ margin: "20px", width: "90%", marginLeft: "-7%" }}
              />
            ) : visitsData.visits.length > 0 ? (
              <Table>
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "605%" }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography fontWeight="bold">Visit Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">CVD Risk</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visitsData?.visits.map((visit) => (
                    <Item data={visit} />
                  ))}
                </TableBody>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Button startIcon={<Add />} variant="contained">
                      Add Visit
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
            ) : (
              <Grid container justifyContent="center" sx={{ padding: "40px" }}>
                <Typography variant="h6" color="#0008">
                  No results found
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

function Item({ data }: { data: Record<string, any> }) {
  const navigate = useNavigate();

  return (
    <TableRow
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "background.lightinput",
        },
      }}
      onClick={() => navigate(data._id)}
    >
      <TableCell>
        <Checklist />
      </TableCell>
      <TableCell>{new Date(data.dateofvisit).toDateString()}</TableCell>
      <TableCell>{(data.cvdrisk ?? 0) + "%"}</TableCell>
    </TableRow>
  );
}

export default PatientVisits;
