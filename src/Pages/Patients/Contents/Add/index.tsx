import { useState, ReactNode } from "react";
import { Grid, Typography, Tabs, Tab } from "@mui/material";
import { TabType, FormDataType } from "./types";
import { TextField } from "@mui/material";
import { FormContainer, SubContainer } from "./styled";

const tabs: TabType[] = [
  { name: "Personal", title: "Personal Information" },
  { name: "Hypertension", title: "Hypertension" },
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
      <FormContainer>
        {(() => {
          switch (currentTab.name) {
            case "Personal":
              return (
                <>
                  <InputGroup title="Basic Info">
                    <TextField
                      variant="standard"
                      label="Medical reg. number"
                      size="small"
                    />
                    <TextField
                      variant="standard"
                      label="Full name"
                      size="small"
                    />
                    <TextField variant="standard" label="Age" size="small" />
                    <TextField variant="standard" label="Sex" size="small" />
                    <TextField variant="standard" label="Height" size="small" />
                    <TextField
                      variant="standard"
                      label="Waist Circumference (cm)"
                      size="small"
                    />
                  </InputGroup>
                  <InputGroup title="Address">
                    <TextField
                      variant="standard"
                      label="Zone/Sub-City"
                      size="small"
                    />
                    <TextField variant="standard" label="Woreda" size="small" />
                    <TextField variant="standard" label="Kebele" size="small" />
                    <TextField
                      variant="standard"
                      label="House Number"
                      size="small"
                    />
                    <TextField
                      variant="standard"
                      label="Phone Number"
                      size="small"
                    />
                  </InputGroup>
                  <InputGroup title="More">
                    <TextField
                      variant="standard"
                      label="Date of enrollment"
                      size="small"
                    />
                    <TextField
                      variant="standard"
                      label="Full initial diagnosis"
                      size="small"
                    />
                  </InputGroup>
                </>
              );
          }
        })()}
      </FormContainer>
    </>
  );
}

function InputGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <SubContainer>
      <Typography
        fontWeight="bold"
        sx={{ gridColumnEnd: "span 2", marginY: "10px" }}
      >
        {title}
      </Typography>
      {children}
    </SubContainer>
  );
}

export default AddPatient;
