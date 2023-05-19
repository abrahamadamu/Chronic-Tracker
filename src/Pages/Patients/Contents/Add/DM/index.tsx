import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { Tabs, Tab, Box, Typography, Paper } from "@mui/material";

import History from "./History";
import Anthropometry from "./Anthropometry";
import PhysicalExam from "./PhysicalExam";
import Laboratory from "./Laboratory";
import Treatment from "./Treatment";

export type DataFormat = Record<string, Record<string, any> | string | number>;

const tabs = [
  { id: "history", text: "History and Risk Factors", component: History },
  {
    id: "anthropometry",
    text: "Anthropometry and Vital signs",
    component: Anthropometry,
  },
  { id: "physical", text: "Physical Examination", component: PhysicalExam },
  {
    id: "laboratory",
    text: "Laboratory Investigations",
    component: Laboratory,
  },
  {
    id: "treatment",
    text: "Treatment Plan and Adherence",
    component: Treatment,
  },
];

function DM() {
  const [data, setData] = useState<DataFormat>({ height: "1.6" });

  return (
    <Box sx={{ padding: "0 30px" }}>
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
      <Typography textAlign="center" variant="h5" sx={{ color: "grey" }}>
        Patient Data For DM and Hypertension
      </Typography>
      <br />
      <br />
      <Paper elevation={0} sx={{ padding: "0 0 20px 0" }}>
        <Tabs
          value={URL_dmcategory}
          onChange={(e, v) => setCurrentTab(tabs.find((tab) => tab.id === v))}
          variant="fullWidth"
          sx={{
            backgroundColor: "secondary.main",
            borderTop: "9px solid",
            borderTopColor: "secondary.main",
          }}
          TabIndicatorProps={{
            style: { backgroundColor: "white", color: "white" },
          }}
          textColor="secondary"
        >
          {tabs.map((tab) => (
            <Tab
              label={tab.text}
              value={tab.id}
              key={tab.id}
              sx={{
                textTransform: "none",
                color: "white",
                borderLeft: "2px solid white",
                "&:nth-child(1)": {
                  borderLeft: "unset",
                },
                "&.Mui-selected": {
                  // borderTop: "solid 5px",
                  // borderTopColor: "secondary.main",
                  // borderRadius: "10px 10px 0 0",
                  // marginTop: "4px",
                  backgroundColor: "white",
                },
              }}
            />
          ))}
        </Tabs>
        <br />
        <Box sx={{ padding: "20px" }}>
          {(() => {
            const tab = tabs.find((tab) => tab.id === URL_dmcategory);
            if (!tab) return <></>;
            const Component = tab.component ?? (() => <></>);

            return <Component data={data} id={tab.id} />;
          })()}
        </Box>
      </Paper>
    </>
  );
}

export default DM;
