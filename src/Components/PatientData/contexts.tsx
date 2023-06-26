import { createContext } from "react";

export type FormDataType = {
  personal: Record<string, any>;
  dm: Record<string, any>;
  visit: Record<string, any>;
  patientid?: string;
  visitid?: string;
};

export type FormDataStateType = FormDataType | undefined;

const patientDataContext = createContext<{
  get: FormDataStateType;
  set: (
    v: FormDataStateType | ((prevData: FormDataStateType) => FormDataStateType)
  ) => void;
}>({ get: { personal: {}, dm: {}, visit: {} }, set: () => {} });

export { patientDataContext };
