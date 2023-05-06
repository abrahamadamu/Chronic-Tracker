import { CategoryValuePair } from "./data";

const valueMap = [
  {
    code: "SYMP_VAL_0",
    text: "Polyuria",
  },
  {
    code: "SYMP_VAL_1",
    text: "Nocturia",
  },
  {
    code: "SYMP_VAL_2",
    text: "Polydispsia",
  },
  {
    code: "SYMP_VAL_3",
    text: "Fatigue",
  },
  {
    code: "SYMP_VAL_4",
    text: "Nausea",
  },
  {
    code: "SYMP_VAL_5",
    text: "Vomiting",
  },
  {
    code: "SYMP_VAL_6",
    text: "fast and deep breathing",
  },
  {
    code: "SYMP_VAL_7",
    text: "weakness",
  },
  {
    code: "SYMP_VAL_8",
    text: "worsening poly symptoms",
  },
  {
    code: "SYMP_VAL_9",
    text: "abdominal pain",
  },
  {
    code: "SYMP_VAL_10",
    text: "Hunger",
  },
  {
    code: "SYMP_VAL_11",
    text: "palpitations",
  },
  {
    code: "SYMP_VAL_12",
    text: "light headedness",
  },
  {
    code: "SYMP_VAL_13",
    text: "dizziness",
  },
  {
    code: "SYMP_VAL_14",
    text: "sweating",
  },
  {
    code: "SYMP_VAL_15",
    text: "extreme fatigue",
  },
  {
    code: "SYMP_VAL_16",
    text: "confusion",
  },
  {
    code: "SYMP_VAL_17",
    text: "bad dreams",
  },
  {
    code: "SYMP_VAL_18",
    text: "F:fever",
  },
  {
    code: "SYMP_VAL_19",
    text: "C:cold",
  },
  {
    code: "SYMP_VAL_20",
    text: "SL: Skin lesions",
  },
  {
    code: "SYMP_VAL_21",
    text: "dysuria",
  },
  {
    code: "SYMP_VAL_22",
    text: "frequency",
  },
  {
    code: "SYMP_VAL_23",
    text: "Diabetic Foot Ulcer",
  },
  {
    code: "SYMP_VAL_24",
    text: "tingling",
  },
  {
    code: "SYMP_VAL_25",
    text: "numbness",
  },
  {
    code: "SYMP_VAL_26",
    text: "burning sensation of Feet and hands",
  },
  {
    code: "SYMP_VAL_27",
    text: "Postural dizziness",
  },
  {
    code: "SYMP_VAL_28",
    text: "Sexual dysfunction",
  },
  {
    code: "SYMP_VAL_29",
    text: "Visual Blurring",
  },
];

const categoryMap = [
  {
    code: "SYMP_CAT_0",
    text: "HyperG",
  },
  {
    code: "SYMP_CAT_1",
    text: "DKA",
  },
  {
    code: "SYMP_CAT_2",
    text: "HypoG",
  },
  {
    code: "SYMP_CAT_3",
    text: "Infection",
  },
  {
    code: "SYMP_CAT_4",
    text: "UTI",
  },
  {
    code: "SYMP_CAT_5",
    text: "DFU",
  },
  {
    code: "SYMP_CAT_6",
    text: "PN",
  },
  {
    code: "SYMP_CAT_7",
    text: "AutoN",
  },
  {
    code: "SYMP_CAT_8",
    text: "VisB",
  },
];

const symptomsData = [
  {
    category: "SYMP_CAT_0",
    value: "SYMP_VAL_0",
  },
  {
    category: "SYMP_CAT_0",
    value: "SYMP_VAL_1",
  },
  {
    category: "SYMP_CAT_0",
    value: "SYMP_VAL_2",
  },
  {
    category: "SYMP_CAT_0",
    value: "SYMP_VAL_3",
  },
  {
    category: "SYMP_CAT_1",
    value: "SYMP_VAL_4",
  },
  {
    category: "SYMP_CAT_1",
    value: "SYMP_VAL_5",
  },
  {
    category: "SYMP_CAT_1",
    value: "SYMP_VAL_6",
  },
  {
    category: "SYMP_CAT_1",
    value: "SYMP_VAL_7",
  },
  {
    category: "SYMP_CAT_1",
    value: "SYMP_VAL_8",
  },
  {
    category: "SYMP_CAT_1",
    value: "SYMP_VAL_9",
  },
  {
    category: "SYMP_CAT_2",
    value: "SYMP_VAL_10",
  },
  {
    category: "SYMP_CAT_2",
    value: "SYMP_VAL_11",
  },
  {
    category: "SYMP_CAT_2",
    value: "SYMP_VAL_12",
  },
  {
    category: "SYMP_CAT_2",
    value: "SYMP_VAL_13",
  },
  {
    category: "SYMP_CAT_2",
    value: "SYMP_VAL_14",
  },
  {
    category: "SYMP_CAT_2",
    value: "SYMP_VAL_15",
  },
  {
    category: "SYMP_CAT_2",
    value: "SYMP_VAL_16",
  },
  {
    category: "SYMP_CAT_2",
    value: "SYMP_VAL_17",
  },
  {
    category: "SYMP_CAT_3",
    value: "SYMP_VAL_18",
  },
  {
    category: "SYMP_CAT_3",
    value: "SYMP_VAL_19",
  },
  {
    category: "SYMP_CAT_3",
    value: "SYMP_VAL_20",
  },
  {
    category: "SYMP_CAT_4",
    value: "SYMP_VAL_21",
  },
  {
    category: "SYMP_CAT_4",
    value: "SYMP_VAL_22",
  },
  {
    category: "SYMP_CAT_5",
    value: "SYMP_VAL_23",
  },
  {
    category: "SYMP_CAT_6",
    value: "SYMP_VAL_24",
  },
  {
    category: "SYMP_CAT_6",
    value: "SYMP_VAL_25",
  },
  {
    category: "SYMP_CAT_6",
    value: "SYMP_VAL_26",
  },
  {
    category: "SYMP_CAT_7",
    value: "SYMP_VAL_27",
  },
  {
    category: "SYMP_CAT_7",
    value: "SYMP_VAL_28",
  },
  {
    category: "SYMP_CAT_8",
    value: "SYMP_VAL_29",
  },
];

let symptomsString: string = JSON.stringify(symptomsData);
valueMap.forEach((map) => {
  symptomsString = symptomsString.replaceAll(
    '"' + map.code + '"',
    JSON.stringify({ code: map.code, text: map.text })
  );
});
categoryMap.forEach((map) => {
  symptomsString = symptomsString.replaceAll(
    '"' + map.code + '"',
    JSON.stringify({ code: map.code, text: map.text })
  );
});

const symptoms: CategoryValuePair[] = JSON.parse(symptomsString);

export { symptoms };
