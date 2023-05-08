import { CategoryValuePair } from "./data";

const riskfactors: CategoryValuePair[] = [
  {
    category: { code: "RISK_CAT_0", text: "Tbco" },
    value: { code: "RISK_VAL_0", text: "Tobacco Use Including shisha" },
  },
  {
    category: { code: "RISK_CAT_1", text: "PhIn" },
    value: { code: "RISK_VAL_1", text: "Physical Inactivity" },
  },
  {
    category: { code: "RISK_CAT_2", text: "Alc" },
    value: {
      code: "RISK_VAL_2",
      text: "Alcohol Use (>2 for women and >3 drinks/day for men)",
    },
  },
  {
    category: { code: "RISK_CAT_3", text: "Salt" },
    value: { code: "RISK_VAL_3", text: "Hight Salt Consumption" },
  },
  {
    category: { code: "RISK_CAT_4", text: "Sug" },
    value: { code: "RISK_VAL_4", text: "High Sugar Consumption" },
  },
  {
    category: { code: "RISK_CAT_5", text: "Fat" },
    value: { code: "RISK_VAL_5", text: "High Fat Consumption" },
  },
  {
    category: { code: "RISK_CAT_6", text: "Veg" },
    value: { code: "RISK_VAL_6", text: "Low Vegitable and Fruit Consumption" },
  },
  {
    category: { code: "RISK_CAT_7", text: "Khat" },
    value: { code: "RISK_VAL_7", text: "Khat Consumption" },
  },
];

export default riskfactors;
