import symptomsList from "./symptoms";
import riskfactorsList from "./riskfactors";
import oralList from "./oral";

export type CategoryValuePair = {
  category: { code: string; text: string };
  value: { code: string; text: string };
};

export { symptomsList, riskfactorsList, oralList };
