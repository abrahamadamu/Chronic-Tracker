import { useState, useEffect, useContext } from "react";
import { FormContainer } from "../styled";
import EditableList from "../Components/CustomMultiList";

import { patientDataContext } from "../../contexts";

import { DataFormat } from "..";

import {
  symptomsList,
  riskfactorsList,
  CategoryValuePair,
  CodeTextPair,
} from "Data/data";

import { getCategoryValuePair, getCodeTextPair, getCodes } from "Data/datautil";

function History({ id }: { id: string }) {
  const patientData = useContext(patientDataContext);

  const [symptoms, setSymptoms] = useState<CategoryValuePair[]>(
    getCategoryValuePair((patientData.get?.dm?.symptoms as string[]) ?? [])
  );
  const [riskfactors, setRiskFactors] = useState<CategoryValuePair[]>(
    getCategoryValuePair((patientData.get?.dm?.riskfactors as string[]) ?? [])
  );

  const dataStates: Record<string, CategoryValuePair[] | CodeTextPair[]> = {
    symptoms,
    riskfactors,
  };

  useEffect(() => {
    let newData = patientData.get?.dm;
    Object.keys(dataStates).forEach((stateName) => {
      const codes = getCodes(dataStates[stateName]);
      if (codes.length > 0) {
        newData = { ...newData, [stateName]: codes };
      } else {
        delete newData[stateName];
      }
    });
    patientData.set({ ...patientData.get, dm: { ...newData } });
  }, Object.values(dataStates));

  return (
    <>
      <FormContainer>
        <EditableList
          title="Symptoms"
          choices={symptomsList}
          chosen={{ get: symptoms, set: setSymptoms }}
        />
        <EditableList
          title="Risk Factors"
          choices={riskfactorsList}
          chosen={{ get: riskfactors, set: setRiskFactors }}
          listType="simple"
        />
      </FormContainer>
    </>
  );
}

export default History;
