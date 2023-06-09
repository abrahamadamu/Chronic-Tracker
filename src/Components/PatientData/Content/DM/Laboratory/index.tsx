import { useState, useContext } from "react";
import {
  TextField,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { patientDataContext, FormDataStateType } from "../../../contexts";

import { FormContainer, DividerText } from "../styled";

import { DataFormat } from "..";

function Laboratory({ id }: { id: string }) {
  const units = ["mg/dl"];

  const patientData = useContext(patientDataContext);

  function setValue(key: string, value: string | number, number?: boolean) {
    if (!key) return;
    patientData.set((prevData) => {
      if (!prevData) return;

      const out = {
        ...prevData,
        dm: {
          ...prevData?.dm,
          laboratory: {
            ...(prevData?.dm as Record<string, any>)?.laboratory,
            [key]: number ? Number(value) : value,
          },
        },
      };

      if (value === "") {
        delete out.dm.laboratory[key];
        delete out.dm.laboratory[key + "unit"];
      }
      if (JSON.stringify(out.dm.laboratory) === "{}") {
        delete out.dm.laboratory;
      }

      return out;
    });
  }
  function getValue(key: string) {
    if (!key) return;
    const dt = patientData.get?.dm?.laboratory;
    return isRecord(dt) ? dt[key] ?? "" : "";

    function isRecord(value: any): value is Record<string, any> {
      return !!value;
    }
  }

  return (
    <>
      <FormContainer>
        <InputWithUnit
          id="fbs"
          label="FBS"
          units={units}
          value={{
            get: getValue,
            set: setValue,
          }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="RBS"
          id="rbs"
          units={units}
          value={{
            get: getValue,
            set: setValue,
          }}
          defaultUnit={units[0]}
        />

        <TextField
          label="HBA1C"
          placeholder="HBA1C"
          value={getValue("hba1c")}
          onChange={(e) => setValue("hba1c", e.target.value)}
        />

        <DividerText>Urine Analysis</DividerText>

        <TextField
          label="Urine Protein"
          placeholder="U/A Protein"
          value={getValue("uaprotein")}
          onChange={(e) => setValue("uaprotein", e.target.value)}
        />
        <TextField
          label="Urine Ketone"
          placeholder="U/A Ketone"
          value={getValue("uaketone")}
          onChange={(e) => setValue("uaketone", e.target.value)}
        />
        <TextField
          label="Urine Glucose"
          placeholder="U/A Glucose"
          value={getValue("uaglucose")}
          onChange={(e) => setValue("uaglucose", e.target.value)}
        />

        <DividerText>Others</DividerText>

        <InputWithUnit
          label="HDL"
          id="hdl"
          units={units}
          value={{
            get: getValue,
            set: setValue,
          }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="LDL"
          id="ldl"
          units={units}
          value={{
            get: getValue,
            set: setValue,
          }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="Triglycerides"
          id="triglycerides"
          units={units}
          value={{
            get: getValue,
            set: setValue,
          }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="Total Cholesterol"
          id="cholesterol"
          units={units}
          value={{
            get: getValue,
            set: setValue,
          }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="Cr"
          id="cr"
          units={units}
          value={{
            get: getValue,
            set: setValue,
          }}
          defaultUnit={units[0]}
        />

        <TextField
          label="BUN"
          placeholder="BUN"
          value={getValue("bun")}
          onChange={(e) => setValue("bun", e.target.value)}
        />

        <TextField
          label="Estimated GFR"
          placeholder="Estimated GFR"
          value={(() => {
            if (!patientData.get) {
              return "error";
            }

            const age = Number(patientData.get.personal.age);
            const weight = patientData.get.dm.weight;
            const sex = patientData.get.personal.sex;
            const cr = getValue("cr");

            if (!age) return "Enter age First";
            if (!weight) return "Enter weight First";
            if (!sex) return "Enter Sex First";
            if (!cr) return "Enter Cr First";

            let result: number | string =
              (((140 - age) * weight) / (cr * 72)) * (sex === "f" ? 0.85 : 1);
            result = result.toFixed(4);

            return result;
          })()}
        />
      </FormContainer>
    </>
  );
}

function InputWithUnit({
  id,
  label,
  units,
  value,
  defaultUnit,
}: {
  id: string;
  label: string;
  units: string[];
  value: {
    get: (k: string) => string;
    set: (k: string, v: string, n?: boolean) => void;
  };
  defaultUnit?: string;
}) {
  const [unit, setUnit] = useState(
    (value.get(id + "unit") || defaultUnit) ?? ""
  );

  function saveUnit(curval: string) {
    if (curval === "") return;
    value.set(id + "unit", unit);
  }

  return (
    <FormControl>
      <InputLabel id="inputlabel">{label}</InputLabel>
      <OutlinedInput
        label={label}
        placeholder={label}
        type="number"
        value={value.get(id)}
        onChange={(e) => {
          value.set(id, e.target.value, true);
          saveUnit(e.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <Select
              sx={{
                margin: "0",

                "&::before, &::after": {
                  borderBottom: "none",
                },
                svg: {
                  marginLeft: "10px",
                },
              }}
              label={"label"}
              labelId="doselabel"
              placeholder={"label"}
              variant="standard"
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            >
              {units.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
            {/* </FormControl> */}
          </InputAdornment>
        }
        sx={{
          "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
            },
        }}
      />
    </FormControl>
  );
}

export default Laboratory;
