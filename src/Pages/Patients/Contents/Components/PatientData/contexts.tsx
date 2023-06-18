import { createContext } from "react";

export type FormDataType = {
  personal: Record<string, any>;
  dm: Record<string, any>;
  visit: Record<string, any>;
};

const patientDataContext = createContext<{
  get: FormDataType;
  set: (v: FormDataType) => void;
}>({ get: { personal: {}, dm: {}, visit: {} }, set: () => {} });

export { patientDataContext };