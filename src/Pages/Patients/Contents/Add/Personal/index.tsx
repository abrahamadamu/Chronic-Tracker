import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import InputGroup from "../Components/InputGroup";
import { FormContainer } from "./styled";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function Personal({
  personalData,
}: {
  personalData: {
    get: Record<string, string | number>;
    set: (v: Record<string, string | number>) => void;
  };
}) {
  function getValue(id: string) {
    if (!personalData.get) return "";
    return personalData.get[id] ?? "";
  }
  function setValue(id: string, value: string | number) {
    personalData.set({ ...personalData.get, [id]: value });
  }

  return (
    <FormContainer>
      <InputGroup title="Basic Info">
        <TextField
          variant="standard"
          label="Medical reg. number"
          size="small"
          value={getValue("regno")}
          onChange={(e) => setValue("regno", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Full name"
          size="small"
          value={getValue("fullname")}
          onChange={(e) => setValue("fullname", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Age"
          size="small"
          value={getValue("age")}
          onChange={(e) => setValue("age", e.target.value)}
          type="number"
        />

        <FormControl size="small">
          <InputLabel
            size="small"
            id="sex-label"
            sx={{ marginLeft: "-12px", marginTop: "5px" }}
          >
            Sex
          </InputLabel>
          <Select
            size="small"
            label="Sex"
            labelId="sex-label"
            value={getValue("sex")}
            onChange={(e) => setValue("sex", e.target.value)}
            variant="standard"
          >
            <MenuItem value="m">Male</MenuItem>
            <MenuItem value="f">Female</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          label="Height"
          size="small"
          type="number"
          value={getValue("height")}
          onChange={(e) => setValue("height", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Waist Circumference (cm)"
          size="small"
          value={getValue("waist")}
          onChange={(e) => setValue("waist", e.target.value)}
          type="number"
        />
      </InputGroup>
      <InputGroup title="Address">
        <TextField
          variant="standard"
          label="Zone/Sub-City"
          size="small"
          value={getValue("zone")}
          onChange={(e) => setValue("zone", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Woreda"
          size="small"
          value={getValue("woreda")}
          onChange={(e) => setValue("woreda", e.target.value)}
        />
        <TextField
          variant="standard"
          label="City"
          size="small"
          value={getValue("city")}
          onChange={(e) => setValue("city", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Kebele"
          size="small"
          value={getValue("kebele")}
          onChange={(e) => setValue("kebele", e.target.value)}
        />
        <TextField
          variant="standard"
          label="House Number"
          size="small"
          value={getValue("houseno")}
          onChange={(e) => setValue("houseno", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Phone Number"
          size="small"
          value={getValue("phonenumber")}
          onChange={(e) => setValue("phonenumber", e.target.value)}
          type="number"
        />
      </InputGroup>

      <InputGroup title="More">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of enrollment"
            onChange={(e) =>
              setValue("enrolmentdate", e ? (e as any).toDate().getTime() : "")
            }
            value={dayjs(getValue("enrolmentdate") || new Date())}
          />
        </LocalizationProvider>
        <TextField
          variant="standard"
          label="Full initial diagnosis"
          size="small"
          value={getValue("initialdiagnosis")}
          onChange={(e) => setValue("initialdiagnosis", e.target.value)}
        />
      </InputGroup>
    </FormContainer>
  );
}

export default Personal;
