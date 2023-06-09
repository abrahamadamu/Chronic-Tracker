import { useState } from "react";
import {
  TextField,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { FormContainer, DividerText } from "../styled";

import { DataFormat } from "..";

function Laboratory({
  data,
  id,
}: {
  id: string;
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  const units = ["mg/dl"];

  function setValue(key: string, value: string | number) {
    if (!key) return;
    data.set({
      ...data.get,
      laboratory: {
        ...(data.get as Record<string, any>)?.laboratory,
        [key]: value,
      },
    });
  }
  function getValue(key: string) {
    if (!key) return;
    const dt = data.get?.laboratory;
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
          value={{ get: getValue, set: setValue }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="RBS"
          id="rbs"
          units={units}
          value={{ get: getValue, set: setValue }}
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
          value={{ get: getValue, set: setValue }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="LDL"
          id="ldl"
          units={units}
          value={{ get: getValue, set: setValue }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="Triglycerides"
          id="triglycerides"
          units={units}
          value={{ get: getValue, set: setValue }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="Total Cholesterol"
          id="cholesterol"
          units={units}
          value={{ get: getValue, set: setValue }}
          defaultUnit={units[0]}
        />

        <InputWithUnit
          label="Cr"
          id="cr"
          units={units}
          value={{ get: getValue, set: setValue }}
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
          value="CALCULATED"
          disabled
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
    set: (k: string, v: string) => void;
  };
  defaultUnit?: string;
}) {
  return (
    <FormControl>
      <InputLabel id="inputlabel">{label}</InputLabel>
      <OutlinedInput
        label={label}
        placeholder={label}
        type="number"
        value={value.get(id)}
        onChange={(e) => {
          value.set(id, e.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            {/* <FormControl size="small" > */}
            {/* <InputLabel id="doselabel">{label}</InputLabel> */}
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
              value={(value.get(id + "unit") || defaultUnit) ?? ""}
              onChange={(e) => {
                value.set(id + "unit", e.target.value);
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