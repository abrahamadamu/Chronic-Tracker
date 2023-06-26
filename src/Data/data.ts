import symptomsList from "./symptoms";
import riskfactorsList from "./riskfactors";
import oralList from "./oral";
import skinList from "./skin";
import musculoskeletalList from "./musculoskeletal";
import neurologicList from "./neurologic";
import laboratoryList from "./laboratory";
import lifestyleChangesList from "./lifestyle";
import adherenceList from "./adherence";
import physical_othersList from "./physical_others";

export type CategoryValuePair = {
  category: { code: string; text: string };
  value: { code: string; text: string };
};

export type CodeTextPair = { code: string; text: string };

export const allExports = {
  symptomsList,
  riskfactorsList,
  oralList,
  skinList,
  musculoskeletalList,
  neurologicList,
  laboratoryList,
  lifestyleChangesList,
  adherenceList,
  physical_othersList,
};

export {
  symptomsList,
  riskfactorsList,
  oralList,
  skinList,
  musculoskeletalList,
  neurologicList,
  laboratoryList,
  lifestyleChangesList,
  adherenceList,
  physical_othersList,
};

const duplicateValidation = CheckExportsDuplicateValueCodeError(allExports);
if (duplicateValidation) throw Error(duplicateValidation);

function CheckExportsDuplicateValueCodeError(
  toExport: Record<string, CategoryValuePair[] | CodeTextPair[]>
) {
  for (const key of Object.keys(toExport)) {
    const dataset = toExport[key];
    if (dataset.length < 1) continue;
    const test = isCategoryValuePair(dataset)
      ? dataset.map((data) => data.value.code)
      : dataset.map((data) => data.code);

    if (test.length !== Array.from(new Set(test)).length) {
      const uniqueArray = Array.from(new Set(test));
      const bigger = test.length > uniqueArray.length ? test : uniqueArray;
      const smaller = test.length < uniqueArray.length ? test : uniqueArray;

      const counter: Record<string, boolean> = {};
      for (const value of bigger) {
        if (counter[value]) {
          return (
            "Duplicate found On object " + key + ", for value code " + value
          );
        }
        counter[value] = true;
      }
      return key;
    }
  }
}

function isCategoryValuePair(
  data: CategoryValuePair[] | CodeTextPair[]
): data is CategoryValuePair[] {
  if (data.length < 1) return true;
  return !!(data as CategoryValuePair[])[0]?.category;
}
