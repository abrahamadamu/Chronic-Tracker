import { useState, useEffect } from "react";

import MultiList from "../MultiList";
import MedicationInput, { GivenMedicationFormat } from "./MedicationInput";

function MedicationList() {
  const [chosen, setChosen] = useState<GivenMedicationFormat[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  function addItem() {
    setOpen(true);
  }
  function deleteItem() {}

  return (
    <>
      <MultiList
        title="Medications"
        {...{ addItem, deleteItem }}
        itemsList={chosen.map((item) => ({ id: item.name, text: item.name }))}
      />
      <MedicationInput
        open={{ get: open, set: setOpen }}
        chosen={{ get: chosen, set: setChosen }}
      />
    </>
  );
}

export default MedicationList;
