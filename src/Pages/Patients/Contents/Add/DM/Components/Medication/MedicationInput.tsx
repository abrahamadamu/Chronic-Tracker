import {
  Modal,
  Grid,
  Typography,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Box,
} from "@mui/material";
import { ModalWindow } from "../styles";
import { Close } from "@mui/icons-material";
import { ReactNode } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as UIData from "./UIData";

const centerStyle = { placeItems: "center", justifyContent: "center" };

export type GivenMedicationFormat = {
  name: string;
  dose: number;
  doseunit: string;
  frequency: string;
  route: string;
  startdate: number;
  duration: number;
  durationunit: string;
  totalquantity: number;
  totalquantityunit: string;
};

function AddMedication({
  chosen,
  open,
}: {
  chosen: {
    get: GivenMedicationFormat[];
    set: (v: GivenMedicationFormat[]) => void;
  };
  open: { get: boolean; set: (v: boolean) => void };
}) {
  return (
    <Modal open={open.get}>
      <Grid
        id="emptycontainer"
        container
        sx={{ height: "100%", ...centerStyle }}
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "emptycontainer")
            open.set(false);
        }}
      >
        <ModalWindow
          container
          sx={{
            ...centerStyle,

            maxHeight: "70vh",
            height: "100%",
            flexDirection: "column",
            position: "relative",
          }}
          gap={2}
        >
          <Close
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              cursor: "pointer",
              fontSize: "30px",
              "&:hover": { color: "red" },
            }}
            onClick={() => open.set(false)}
          />
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            Add Medication
          </Typography>
          <Box sx={{ overflow: "auto", flexGrow: 1, height: "0px" }}>
            <Grid
              container
              gap={2}
              sx={{
                flexGrow: 1,
                height: "unset",
                width: "100%",
                paddingTop: "5px",
              }}
              direction="column"
            >
              <TextField label="Name" size="small" />
              <Grid container gap={1} sx={{}}>
                <TextField label="Dose" type="number" size="small" />
                <SelectInput label="Unit">
                  {UIData.doseUnits.map((unit) => (
                    <MenuItem value={unit.id} key={unit.id}>
                      {unit.text}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Grid>
              <SelectInput label="Frequency">
                {UIData.frequencyUnits.map((unit) => (
                  <MenuItem value={unit.id} key={unit.id}>
                    {unit.text}
                  </MenuItem>
                ))}
              </SelectInput>
              <SelectInput label="Route">
                {UIData.routes.map((unit) => (
                  <MenuItem value={unit.id} key={unit.id}>
                    {unit.text}
                  </MenuItem>
                ))}
              </SelectInput>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Start Date" />
              </LocalizationProvider>
              <Grid container gap={1} sx={{}}>
                <TextField label="Duration" type="number" size="small" />
                <SelectInput label="Unit">
                  {UIData.timeUnits.map((unit) => (
                    <MenuItem value={unit.id} key={unit.id}>
                      {unit.text}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Grid>
              <Grid container gap={1} sx={{}}>
                <TextField label="Total Quantity" type="number" size="small" />
                <SelectInput label="Unit">
                  {UIData.doseUnits.map((unit) => (
                    <MenuItem value={unit.id} key={unit.id}>
                      {unit.text}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Grid>
            </Grid>
          </Box>
        </ModalWindow>
      </Grid>
    </Modal>
  );
}

function SelectInput({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <FormControl size="small" sx={{ minWidth: "120px" }}>
      <InputLabel id="doselabel">{label}</InputLabel>
      <Select label={label} labelId="doselabel" placeholder={label}>
        {children}
      </Select>
    </FormControl>
  );
}

export default AddMedication;
