import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Grid, Typography, Tabs, Tab } from "@mui/material";
import { TabType, FormDataType } from "./types";

import Personal from "./Personal";
import DM from "./DM";

const tabs: TabType[] = [
  {
    id: "personal",
    name: "Personal",
    title: "Personal Information",
    component: Personal,
  },
  {
    id: "dmhypertension",
    name: "DM And Hypertension",
    title: "DM And Hypertension",
    component: DM,
  },
  {
    id: "heart",
    name: "Heart Disease",
    title: "Heart Disease",
    component: () => <></>,
  },
];

function AddPatient() {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({});

  return (
    <Grid container direction="column" gap={3}>
      <Typography variant="h4"> New patient</Typography>
      <Routes>
        <Route path="" element={<Navigate to={tabs[0].id} />} />
        <Route
          path=":URL_chronicinfotype/*"
          element={<Content formData={{ get: formData, set: setFormData }} />}
        />
      </Routes>
    </Grid>
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

  useEffect(() => {
    if (currentTab && currentTab.id !== URL_chronicinfotype) {
      navigate("../" + currentTab.id);
    }
  }, [currentTab, URL_chronicinfotype]);

  const Component =
    tabs.find((tab) => tab.id === URL_chronicinfotype)?.component ||
    (() => <></>);

  return (
    <>
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
      <Component />
    </>
  );
}

export default AddPatient;
