type ChoiceMapType = Record<
  string,
  {
    title: string;
    options: { code?: string; description?: string; group?: string }[];
  }
>;

const choicesMap = {
  c: {
    title: "Symptoms",
    options: [
      {
        code: "HyperG",
        description: "Polyuria, Nocturia, Polydispsia, Fatigue",
        group: "DM",
      },
      {
        code: "DKA",
        description:
          "Nausea, Vomiting, fast and deep breathing, weakness, worsening poly symptoms, abdominal pain",
        group: "DM",
      },
      {
        code: "HypoG",
        description:
          "Hunger, palpitations, light headedness, dizziness, sweating, extreme fatigue, confusion, bad dreams",
        group: "DM",
      },
      {
        code: "Infection",
        group: "DM",
      },
      {
        code: "F",
        description: "Fever",
        group: "DM",
      },
      {
        code: "C",
        description: "Cough",
        group: "DM",
      },
      {
        code: "SL",
        description: "Skin Lesions",
        group: "DM",
      },
      {
        code: "UTI",
        description: "dysuria, frequency",
        group: "DM",
      },
      {
        code: "DFU",
        description: "Diabetic Foot Ulcer",
        group: "DM",
      },
      {
        code: "PN",
        description: "tingling, numbness, burning sensation of Feet and hands",
        group: "DM",
      },
      {
        code: "AutoN",
        description: "Postural dizziness, Sexual dysfunction",
        group: "DM",
      },
      {
        code: "VisB",
        description: "Visual Blurring",
        group: "DM",
      },
      {
        code: "Dysp",
        description: "Dyspnea",
        group: "HTN",
      },
      {
        code: "Ortp",
        description: "Orthopnea",
        group: "HTN",
      },
      {
        code: "PND",
        description: "Paroxysmal Nocturnal Dyspnea",
        group: "HTN",
      },
      {
        code: "LSw",
        description: "Leg swelling",
        group: "HTN",
      },
      {
        code: "Ang",
        description: "Anglna",
        group: "HTN",
      },
      {
        code: "IntCL",
        description: "Intermittent claudication",
        group: "HTN",
      },
      {
        code: "HemP",
        description: "Hemiparesis / Hemiplegia",
        group: "HTN",
      },
      {
        code: "SpA",
        description: "Speech Abnormality",
        group: "HTN",
      },
      {
        code: "Seiz",
        description: "Seizure",
        group: "HTN",
      },
      {
        code: "HA",
        description: "Headache",
        group: "HTN",
      },
      {
        code: "PhP",
        description: "Photophobia",
        group: "HTN",
      },
      {
        code: "NkP",
        description: "Neck pain and Stiffnesss",
        group: "HTN",
      },
      {
        code: "UOP",
        description: "Decreased Urine Output",
        group: "HTN",
      },
    ],
  },
};

function getChoice(name: string) {}

export { getChoice };
