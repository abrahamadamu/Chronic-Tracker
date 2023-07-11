import { useContext, useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import InputGroup from "../../Components/InputGroup";
import { FormContainer } from "./styled";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { patientDataContext } from "../../contexts";
import EditableList from "../DM/Components/CustomMultiList";
import { CodeTextPair } from "Data/data";

const diagnosis = [
  "Type 1 Diabetes Mellitus",
  "Type 2 Diabetes Mellitus",
  "Essential Hypertension",
  "Dilated Cardiomyopathy",
  "Hypertensive heart disease",
  "Asthma",
  "Heart Failure",
  "Chronic liver disease",
  "Polyneuropathy",
  "Rheumatoid arthritis",
  "Osteoarthritis",
  "Thyrotoxicosis",
  "Thyrocardiac disease",
  "Chronic obstructive pulmonary disease",
  "Ischemic heart disease",
  "Cor pulmonale",
];

let diagnosisMap: CodeTextPair[] = diagnosis.map((dg) => ({
  code: dg,
  text: dg,
}));

function Personal() {
  const patientData = useContext(patientDataContext);

  const [initialDiag, setInitialDiag] = useState<CodeTextPair[]>(
    (() => {
      if (patientData.get?.personal?.initialdiagnosis) {
        let diag: string[] = patientData.get.personal
          .initialdiagnosis as string[];
        return diag.map((dg) => ({ code: dg, text: dg }));
      }
      return [];
    })()
  );

  useEffect(() => {
    if (!patientData.get) return;
    if (!patientData.get?.personal) return;

    let personal = patientData.get?.personal;

    if (initialDiag.length > 0) {
      personal = {
        ...personal,
        initialdiagnosis: initialDiag.map((diag) => diag.text),
      };
    } else {
      delete personal["initialdiagnosis"];
    }

    patientData.set({ ...patientData.get, personal });
  }, [initialDiag]);

  function getValue(id: string) {
    if (!patientData.get) return "";
    return patientData.get.personal[id] ?? "";
  }
  function setValue(key: string, value: string | number, number?: boolean) {
    if (!key) return;
    patientData.set((prevData) => {
      if (!prevData) return;

      const out = {
        ...prevData,
        personal: {
          ...prevData?.personal,
          [key]: number ? Number(value) : value,
        },
      };

      if (value === "") {
        delete out.personal[key];
      }

      return out;
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
          onChange={(e) => {
            if ((e.target.value + "dummy")[0] === "0") {
              alert("registration number shouldn't start with 0");
              return;
            }
            setValue("regno", (e.target.value + "").replace(/^0*/, ""));
          }}
        />
        <TextField
          variant="standard"
          label="Chronic reg. number"
          size="small"
          value={getValue("chno")}
          onChange={(e) => setValue("chno", e.target.value)}
          type="number"
        />
        <TextField
          variant="standard"
          label="Given name"
          size="small"
          value={getValue("givenname")}
          onChange={(e) => setValue("givenname", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Middle name (father)"
          size="small"
          value={getValue("middlename")}
          onChange={(e) => setValue("middlename", e.target.value)}
        />
        <TextField
          variant="standard"
          label="Familly name"
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
        <EditableList
          title="Full Initial Diagnosis"
          choices={diagnosisMap}
          chosen={{ get: initialDiag, set: setInitialDiag }}
          listType="simple"
        />
      </InputGroup>
    </FormContainer>
  );
}

export default Personal;
