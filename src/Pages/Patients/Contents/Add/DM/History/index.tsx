import { FormContainer } from "../styled";
import EditableList from "../Components/EditableList";

function History() {
  return (
    <FormContainer>
      <EditableList
        title="Symptoms"
        items={["Apromania", "Nausia", "Dieting"]}
      />
    </FormContainer>
  );
}

export default History;
