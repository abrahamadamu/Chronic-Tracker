import { useState } from "react";
import { FormContainer } from "../styled";
import EditableList, { ListData } from "../Components/EditableList";
import AddToList from "../Components/AddToList";

type DataType = Record<string, Record<string, any>>;

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataType; set: (v: DataType) => void };
}) {
  const [history, setHistory] = useState<DataType>({
    symptoms: [
      { group: "Some", value: "Apromania" },
      { group: "Some", value: "Nausia" },
      { group: "Some", value: "Dieting" },
    ],
  });

  return (
    <>
      <FormContainer>
        <EditableList
          title="Symptoms"
          id="symptoms"
          data={{ get: history, set: setHistory }}
        />
      </FormContainer>
      <AddToList />
    </>
  );
}

export default History;
