import { useState } from "react";
import { FormContainer } from "../styled";
import EditableList from "../Components/EditableList";

import { symptomsList, riskfactorsList, CategoryValuePair } from "Data/data";

type DataType = Record<string, Record<string, any>>;

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataType; set: (v: DataType) => void };
}) {
  const [symptoms, setSymptoms] = useState<CategoryValuePair[]>([]);
  const [riskfactors, setRiskFactors] = useState<CategoryValuePair[]>([]);

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
        />
      </FormContainer>
    </>
  );
}

export default History;
