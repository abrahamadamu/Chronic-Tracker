import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import History from "./History";

type Data = Record<string, Record<string, any>>;

const tabs = [
  "History and Risk Factors",
  "Anthropometry and Vital signs",
  "Physical Examination",
  "Laboratory Investigations",
  "Treatment Plan and Adherence",
];

function DM() {
  const [tab, setTab] = useState(tabs[0]);
  const [data, setData] = useState<Data>({});

  return (
    <Box sx={{ padding: "0 30px", marginTop: "20px" }}>
      {/* <Typography variant="h5"> DM And Hypertension</Typography> */}
      {/* <br /> */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="fullWidth">
        {tabs.map((tab) => (
          <Tab
            label={tab}
            value={tab}
            key={tab}
            sx={{ textTransform: "none" }}
          />
        ))}
      </Tabs>
      <br />
      <History data={{ get: data, set: setData }} id="history" />
    </Box>
  );
}

export default DM;