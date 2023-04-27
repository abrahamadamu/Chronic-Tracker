import { useState } from "react";
import { Grid, Typography, Tabs, Tab } from "@mui/material";
import { TabType, FormDataType } from "./types";

import Personal from "./Personal";
import DM from "./DM";

const tabs: TabType[] = [
  { name: "Personal", title: "Personal Information" },
  { name: "DM And Hypertension", title: "DM And Hypertension" },
  { name: "Heart Disease", title: "Heart Disease" },
];

function AddPatient() {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({});

  return (
    <Grid container direction="column" gap={3}>
      <Typography variant="h4"> New patient</Typography>
      <Tabs onChange={(e, v) => setCurrentTab(v)} value={currentTab}>
        {tabs.map((tab) => (
          <Tab label={tab.name} key={tab.name} />
        ))}
      </Tabs>
      <TabContent
        currentTab={tabs[currentTab]}
        formData={{ get: formData, set: setFormData }}
      />
    </Grid>
  );
}

function TabContent({
  currentTab,
  formData,
}: {
  currentTab: TabType;
  formData: { get: FormDataType; set: (v: FormDataType) => void };
}) {
  return (
    <>
      <Typography variant="h5"> {currentTab.title}</Typography>
      {(() => {
        switch (currentTab.name) {
          case "Personal":
            return <Personal />;
          case "DM And Hypertension":
            return <DM />;
        }
      })()}
    </>
  );
}

export default AddPatient;
