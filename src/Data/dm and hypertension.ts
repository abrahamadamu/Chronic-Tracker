type DataFormat = { category: string; value: string };

const valueMap = [
  {
    code: "SYMP_VAL_0",
    value: "Polyuria",
  },
  {
    code: "SYMP_VAL_1",
    value: "Nocturia",
  },
  {
    code: "SYMP_VAL_2",
    value: "Polydispsia",
  },
  {
    code: "SYMP_VAL_3",
    value: "Fatigue",
  },
  {
    code: "SYMP_VAL_4",
    value: "Nausea",
  },
  {
    code: "SYMP_VAL_5",
    value: "Vomiting",
  },
  {
    code: "SYMP_VAL_6",
    value: "fast and deep breathing",
  },
  {
    code: "SYMP_VAL_7",
    value: "weakness",
  },
  {
    code: "SYMP_VAL_8",
    value: "worsening poly symptoms",
  },
  {
    code: "SYMP_VAL_9",
    value: "abdominal pain",
  },
  {
    code: "SYMP_VAL_10",
    value: "Hunger",
  },
  {
    code: "SYMP_VAL_11",
    value: "palpitations",
  },
  {
    code: "SYMP_VAL_12",
    value: "light headedness",
  },
  {
    code: "SYMP_VAL_13",
    value: "dizziness",
  },
  {
    code: "SYMP_VAL_14",
    value: "sweating",
  },
  {
    code: "SYMP_VAL_15",
    value: "extreme fatigue",
  },
  {
    code: "SYMP_VAL_16",
    value: "confusion",
  },
  {
    code: "SYMP_VAL_17",
    value: "bad dreams",
  },
  {
    code: "SYMP_VAL_18",
    value: "F:fever",
  },
  {
    code: "SYMP_VAL_19",
    value: "C:cold",
  },
  {
    code: "SYMP_VAL_20",
    value: "SL: Skin lesions",
  },
  {
    code: "SYMP_VAL_21",
    value: "dysuria",
  },
  {
    code: "SYMP_VAL_22",
    value: "frequency",
  },
  {
    code: "SYMP_VAL_23",
    value: "Diabetic Foot Ulcer",
  },
  {
    code: "SYMP_VAL_24",
    value: "tingling",
  },
  {
    code: "SYMP_VAL_25",
    value: "numbness",
  },
  {
    code: "SYMP_VAL_26",
    value: "burning sensation of Feet and hands",
  },
  {
    code: "SYMP_VAL_27",
    value: "Postural dizziness",
  },
  {
    code: "SYMP_VAL_28",
    value: "Sexual dysfunction",
  },
  {
    code: "SYMP_VAL_29",
    value: "Visual Blurring",
  },
];

const categoryMap = [
  {
    code: "SYMP_CAT_0",
    value: "HyperG",
  },
  {
    code: "SYMP_CAT_1",
    value: "DKA",
  },
  {
    code: "SYMP_CAT_2",
    value: "HypoG",
  },
  {
    code: "SYMP_CAT_3",
    value: "Infection",
  },
  {
    code: "SYMP_CAT_4",
    value: "UTI",
  },
  {
    code: "SYMP_CAT_5",
    value: "DFU",
  },
  {
    code: "SYMP_CAT_6",
    value: "PN",
  },
  {
    code: "SYMP_CAT_7",
    value: "AutoN",
  },
  {
    code: "SYMP_CAT_8",
    value: "VisB",
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
    '"' + map.value + '"'
  );
});
categoryMap.forEach((map) => {
  symptomsString = symptomsString.replaceAll(
    '"' + map.code + '"',
    '"' + map.value + '"'
  );
});

const symptoms: DataFormat[] = JSON.parse(symptomsString);

export { symptoms };
