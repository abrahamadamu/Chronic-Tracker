import { useState, useEffect } from "react";

import MultiList from "../MultiList";
import MedicationInput, { GivenMedicationFormat } from "./MedicationInput";

function MedicationList() {
  const [medications, setMedications] = useState<GivenMedicationFormat[]>([]);
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
        itemsList={medications.map((item) => ({
          id: item.name,
          text: item.name,
        }))}
      />
      <MedicationInput
        open={{ get: open, set: setOpen }}
        chosen={{ get: medications, set: setMedications }}
      />
    </>
  );
}

export default MedicationList;
