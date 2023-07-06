import { Grid, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  patientDataContext,
  FormDataStateType,
  FormDataType,
} from "./contexts";
import { TabType } from "./Content/types";

import Api from "Services/api";

import Content from "./Content";

const tabs: TabType[] = [
  {
    id: "personal",
    name: "Personal",
    title: "Personal Information",
  },
  {
    id: "dmhypertension",
    name: "DM And Hypertension",
    title: "DM And Hypertension",
  },
  {
    id: "heart",
    name: "Heart Disease",
    title: "Heart Disease",
  },
];

function PatientData({
  formData,
  saveAction,
}: {
  formData:
    | {
        get: FormDataStateType;
        set: (
          v:
            | FormDataStateType
            | ((prevData: FormDataStateType) => FormDataStateType)
        ) => void;
      }
    | undefined;
  saveAction: () => Promise<any>;
}) {
  return (
    <Grid container direction="column">
      {formData ? (
        <Routes>
          <Route path="" element={<Navigate to={tabs[0].id} />} />
          <Route
            path=":URL_chronicinfotype/*"
            element={
              <patientDataContext.Provider value={formData}>
                <Content saveAction={saveAction} tabs={tabs} />
              </patientDataContext.Provider>
            }
          />
        </Routes>
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress sx={{ marginTop: "130px" }} />
        </Grid>
      )}
    </Grid>
  );
}

export function saveData(
  formData: FormDataType | undefined
): Promise<FormDataType & { patientid: string; visitid: string }> {
  console.log({ formData });
  // return new Promise((r) => r(3));
  return Api.post("/patients/save", formData)
    .then((response) => {
      if (response.status >= 300 || response.status < 200) {
        throw new Error(response.data());
      }
      if (!formData) throw new Error("No form data");

      const data = response.data;

      const newFormData = {
        ...formData,
        patientid: data.patientid,
        visitid: data.visitid,
      };
      console.log({ newFormData });
      return newFormData;
    })
    .catch((e) => {
      const error = e.response.data ?? e.message;
      alert(error);
      throw error;
    });
}

export default PatientData;
