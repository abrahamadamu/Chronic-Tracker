import symptomsList from "./symptoms";
import riskfactorsList from "./riskfactors";

export type CategoryValuePair = {
  category: { code: string; text: string };
  value: { code: string; text: string };
};

export { symptomsList, riskfactorsList };
