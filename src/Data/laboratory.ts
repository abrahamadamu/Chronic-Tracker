import { CategoryValuePair } from "./data";

const laboratoryList: CategoryValuePair[] = [
  {
    category: { code: "LABT_CAT_1", text: "U/A" },
    value: {
      code: "LABT_VAL_0",
      text: "Protein (P-, P+ to P++++) - check annually",
    },
  },
  {
    category: { code: "LABT_CAT_1", text: "U/A" },
    value: {
      code: "LABT_VAL_1",
      text: "Ketone (k-, k+to k++++) - Type 1 DM every visit, for type 2 when FBS/RBS>300mg/dl",
    },
  },
  {
    category: { code: "LABT_CAT_1", text: "U/A" },
    value: {
      code: "LABT_VAL_2",
      text: "Microscopy to see Casts",
    },
  },
  {
    category: { code: "LABT_CAT_2", text: "RFT" },
    value: {
      code: "LABT_VAL_3",
      text: "RFT done anually for type 2dm; for type 1 starting 5 years after diagnosis",
    },
  },
  {
    category: { code: "LABT_CAT_0", text: "FBC / HBA1C" },
    value: { code: "LABT_VAL_6", text: "FBS (to be done every visit)" },
  },
  {
    category: { code: "LABT_CAT_0", text: "FBC / HBA1C" },
    value: { code: "LABT_VAL_5", text: "HBA1C (every 3 months)" },
  },
];

export default laboratoryList;
