import { useContext } from "react";
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
import { patientDataContext } from "../contexts";

function Personal() {
  const patientData = useContext(patientDataContext);

  function getValue(id: string) {
    if (!patientData.get) return "";
    return patientData.get.personal[id] ?? "";
  }
  function setValue(key: string, value: string | number, number?: boolean) {
    if (!key) return;
    patientData.set((prevData) => {
      if (!prevData) return;

      return {
        ...prevData,
        personal: {
          ...prevData?.personal,
          [key]: number ? Number(value) : value,
        },
      };
    });
  }

  return (
    <FormContainer>
      <InputGroup title="Basic Info">
        <TextField
          variant="standard"
          label="Medical reg. number"
          size="small"
          value={getValue("regno")}
          onChange={(e) => setValue("regno", e.target.value, true)}
          type="number"
        />
        <TextField
          variant="standard"
          label="Chronic reg. number"
          size="small"
          value={getValue("chno")}
          onChange={(e) => setValue("chno", e.target.value, true)}
          type="number"
        />
        <TextField
          variant="standard"
          label="First name"
          size="small"
          value={getValue("givenname")}
          onChange={(e) => setValue("givenname", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Father's name"
          size="small"
          value={getValue("middlename")}
          onChange={(e) => setValue("middlename", e.target.value)}
        />
        <TextField
          variant="standard"
          label="G.Father's name"
          size="small"
          value={getValue("familyname")}
          onChange={(e) => setValue("familyname", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Age"
          size="small"
          value={getValue("age")}
          onChange={(e) => setValue("age", e.target.value, true)}
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
            label="Date of enrolment"
            onChange={(e) =>
              setValue(
                "dateofenrolment",
                e ? (e as any).toDate().getTime() : "",
                true
              )
            }
            value={dayjs(getValue("dateofenrolment") || new Date())}
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
