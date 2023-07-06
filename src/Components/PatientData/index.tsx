import { Grid, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import { patientDataContext, FormDataStateType } from "./contexts";

import { TabType } from "./Content/types";

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

export default PatientData;
