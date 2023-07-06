import { useState, useEffect, useContext } from "react";
import { TextField } from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { patientDataContext } from "../../../contexts";

import { DataFormat } from "..";

function VisitInformation({ id }: { id: string }) {
  const patientData = useContext(patientDataContext);

  function setValue(key: string, value: string | number, number?: boolean) {
    if (!key) return;
    patientData.set((prevData) => {
      if (!prevData) return;

      return {
        ...prevData,
        visit: {
          ...prevData?.visit,
          [key]: number ? Number(value) : value,
        },
      };
    });
  }

  function getValue(key: string) {
    if (!key) return;
    const dt = patientData.get?.visit;
    return isRecord(dt) ? dt[key] ?? "" : "";

    function isRecord(value: any): value is Record<string, any> {
      return !!value;
    }
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Visit"
          onChange={(e) =>
            setValue(
              "dateofvisit",
              e ? (e as any).toDate().getTime() : "",
              true
            )
          }
          value={dayjs(getValue("dateofvisit") || new Date())}
        />
      </LocalizationProvider>
    </>
  );
}

export default VisitInformation;
