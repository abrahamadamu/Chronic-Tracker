import { useState } from "react";
import { FormContainer } from "../styled";
import EditableList from "../Components/EditableList";

import { symptoms as symptomsData, CategoryValuePair } from "Data/data";

type DataType = Record<string, Record<string, any>>;

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataType; set: (v: DataType) => void };
}) {
  const [chosen, setChosen] = useState<CategoryValuePair[]>([]);

  return (
    <>
      <FormContainer>
        <EditableList
          title="Symptoms"
          choices={symptomsData}
          chosen={{ get: chosen, set: setChosen }}
        />
      </FormContainer>
    </>
  );
}

export default History;
