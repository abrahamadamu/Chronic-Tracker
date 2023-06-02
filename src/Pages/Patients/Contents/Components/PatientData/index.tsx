import { Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import DM, { DataFormat } from "./DM";
import Personal from "./Personal";
import { TabType } from "./types";

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

  useEffect(() => {
    if (currentTab && currentTab.id !== URL_chronicinfotype) {
      navigate("../" + currentTab.id);
    }
  }, [currentTab, URL_chronicinfotype]);

  useEffect(() => {
    formData.set({ personal: personalData, dm: dmData });
  }, [personalData, dmData]);

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
    </>
  );
}

export default PatientData;
