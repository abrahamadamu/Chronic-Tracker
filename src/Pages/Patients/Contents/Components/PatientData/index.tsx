import { Tabs, Tab, Grid, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useNavigate,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { isEqual } from "lodash";
import { backend } from "Config/data";

import DM, { DataFormat } from "./DM";
import Personal from "./Personal";
import { TabType } from "./types";
import { Save } from "@mui/icons-material";

type FormDataType = Record<string, any>;

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
}: {
  formData: { get: FormDataType; set: (v: FormDataType) => void };
}) {
  return (
    <Routes>
      <Route path="" element={<Navigate to={tabs[0].id} />} />
      <Route
        path=":URL_chronicinfotype/*"
        element={<Content formData={formData} />}
      />
    </Routes>
  );
}

function Content({
  formData,
}: {
  formData: { get: FormDataType; set: (v: FormDataType) => void };
}) {
  const { URL_chronicinfotype } = useParams();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<TabType | undefined>();
  const [personalData, setPersonalData] = useState<
    Record<string, string | number>
  >(formData.get?.personal ?? {});
  const [dmData, setDmData] = useState<DataFormat>(
    formData.get?.dm ?? { height: "1.6" }
  );

  const [changed, setChanged] = useState(false);
  const prevFormData = useRef(formData.get);

  useEffect(() => {
    if (currentTab && currentTab.id !== URL_chronicinfotype) {
      navigate("../" + currentTab.id);
    }
  }, [currentTab, URL_chronicinfotype]);

  useEffect(() => {
    formData.set({ personal: personalData, dm: dmData });
  }, [personalData, dmData]);

  useEffect(() => {
    const changed = !isEqual(formData.get, prevFormData.current);
    if (changed && isEqual(prevFormData.current, {})) {
      prevFormData.current = formData.get;
      return;
    }
    setChanged(changed);
  }, [formData.get]);

  function saveData() {
    console.log(JSON.stringify(formData.get));
    // return;

    fetch(backend + "/patients/add", {
      method: "POST",
      body: JSON.stringify(formData.get),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.status >= 300 || response.status < 200) {
          throw new Error(await response.text());
        }
        setChanged(false);
        prevFormData.current = formData.get;
      })
      .catch((e) => {
        alert(e);
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
      {(() => {
        switch (URL_chronicinfotype) {
          case "personal":
            return (
              <Personal
                personalData={{ get: personalData, set: setPersonalData }}
              />
            );
          case "dmhypertension":
            return <DM dmData={{ get: dmData, set: setDmData }} />;
          case "heart":
            return <></>;
        }
        return <></>;
      })()}
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
