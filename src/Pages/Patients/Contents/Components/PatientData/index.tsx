import { Tabs, Tab, Grid, Button } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import {
  useParams,
  useNavigate,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { isEqual } from "lodash";

import { patientDataContext, FormDataType } from "./contexts";

import DM, { DataFormat } from "./DM";
import Personal from "./Personal";
import { TabType } from "./types";
import { Save } from "@mui/icons-material";

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
  formData: { get: FormDataType; set: (v: FormDataType) => void };
  saveAction: () => Promise<any>;
}) {
  return (
    <Routes>
      <Route path="" element={<Navigate to={tabs[0].id} />} />
      <Route
        path=":URL_chronicinfotype/*"
        element={
          <patientDataContext.Provider value={formData}>
            <Content saveAction={saveAction} />
          </patientDataContext.Provider>
        }
      />
    </Routes>
  );
}

function Content({ saveAction }: { saveAction: () => Promise<any> }) {
  const { URL_chronicinfotype } = useParams();
  const navigate = useNavigate();

  const patientData = useContext(patientDataContext);

  const [currentTab, setCurrentTab] = useState<TabType | undefined>();
  const [personalData, setPersonalData] = useState<
    Record<string, string | number>
  >(patientData.get?.personal ?? {});
  const [dmData, setDmData] = useState<DataFormat>(patientData.get?.dm ?? {});

  const [changed, setChanged] = useState(false);
  const prevFormData = useRef(patientData.get);

  const [visitData, setVisitData] = useState(
    patientData.get?.visit ?? { visitdate: new Date().getTime() }
  );

  useEffect(() => {
    if (currentTab && currentTab.id !== URL_chronicinfotype) {
      navigate("../" + currentTab.id);
    }
  }, [currentTab, URL_chronicinfotype]);

  useEffect(() => {
    patientData.set({
      personal: personalData,
      dm: dmData,
      visit: { ...patientData.get.visit },
    });
  }, [personalData, dmData]);

  useEffect(() => {
    const changed = !isEqual(patientData.get, prevFormData.current);
    if (changed && isEqual(prevFormData.current, {})) {
      prevFormData.current = patientData.get;
      return;
    }
    setChanged(changed);
  }, [patientData.get]);

  function saveData() {
    console.log(JSON.stringify(patientData.get));
    saveAction().then((r) => {
      setChanged(false);
      prevFormData.current = patientData.get;
    });
  }

  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Tabs
          value={URL_chronicinfotype}
          onChange={(e, value) => {
            setCurrentTab(tabs.find((tab) => tab.id === value));
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.name} value={tab.id} />
          ))}
        </Tabs>
        {changed && (
          <Button
            startIcon={<Save />}
            variant="contained"
            onClick={() => {
              // prevFormData.current = formData.get;
              saveData();
            }}
          >
            Save Changes
          </Button>
        )}
      </Grid>
      <patientDataContext.Provider value={patientData}>
        {(() => {
          switch (URL_chronicinfotype) {
            case "personal":
              return <Personal />;
            case "dmhypertension":
              return <DM />;
            case "heart":
              return <></>;
          }
          return <></>;
        })()}
      </patientDataContext.Provider>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ minHeight: "50px" }}
      >
        {changed && (
          <Button
            startIcon={<Save />}
            onClick={() => {
              saveData();
            }}
            variant="contained"
          >
            Save Changes
          </Button>
        )}
      </Grid>
    </>
  );
}

export default PatientData;
