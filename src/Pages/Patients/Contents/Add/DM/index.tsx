import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";

import History from "./History";

type DataFormat = Record<string, Record<string, any>>;

const tabs = [
  { id: "history", text: "History and Risk Factors", component: History },
  { id: "anthropometry", text: "Anthropometry and Vital signs" },
  { id: "physical", text: "Physical Examination" },
  { id: "laboratory", text: "Laboratory Investigations" },
  { id: "treatment", text: "Treatment Plan and Adherence" },
];

function DM() {
  const [data, setData] = useState<DataFormat>({});

  return (
    <Box sx={{ padding: "0 30px", marginTop: "20px" }}>
      <Routes>
        <Route path="" element={<Navigate to={tabs[0].id} />} />
        <Route
          path=":URL_dmcategory/*"
          element={<Content data={{ get: data, set: setData }} />}
        />
      </Routes>
    </Box>
  );
}

function Content({
  data,
}: {
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  const { URL_dmcategory } = useParams();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<
    { id: string; text: string } | undefined
  >();

  useEffect(() => {
    if (currentTab) {
      navigate("../" + currentTab.id);
    }
  }, [currentTab]);

  return (
    <>
      {/* <Typography variant="h5"> DM And Hypertension</Typography> */}
      {/* <br /> */}
      <Tabs
        value={URL_dmcategory}
        onChange={(e, v) => setCurrentTab(tabs.find((tab) => tab.id === v))}
        variant="fullWidth"
      >
        {tabs.map((tab) => (
          <Tab
            label={tab.text}
            value={tab.id}
            key={tab.id}
            sx={{ textTransform: "none" }}
          />
        ))}
      </Tabs>
      <br />
      {(() => {
        const tab = tabs.find((tab) => tab.id === URL_dmcategory);
        if (!tab) return <></>;
        const Component = tab.component ?? (() => <></>);

        return <Component data={data} id={tab.id} />;
      })()}
    </>
  );
}

export default DM;
