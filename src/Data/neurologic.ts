import { CategoryValuePair } from "./data";

const neurologicList: CategoryValuePair[] = [
  {
    category: {
      code: "NEUR_CAT_0",
      text: "Neurologic",
    },
    value: {
      code: "NEUR_VAL_0",
      text: "Motor, Sensory and Eye Exam",
    },
  },
  {
    category: {
      code: "NEUR_CAT_1",
      text: "Dilated eye exam needed",
    },
    value: {
      code: "NEUR_VAL_1",
      text: "All type 2 patients annually starting from Dx",
    },
  },
  {
    category: {
      code: "NEUR_CAT_1",
      text: "Dilated eye exam needed",
    },
    value: {
      code: "NEUR_VAL_2",
      text: "All type 1 annually 5 years from Dx",
    },
  },
  {
    category: {
      code: "NEUR_CAT_1",
      text: "Dilated eye exam needed",
    },
    value: {
      code: "NEUR_VAL_3",
      text: "Hypersensiive patients with suspected hypersensitive urgency or emergency",
    },
  },
];

export default neurologicList;
