import { useState, useEffect } from "react";
import PatientData from "Components/PatientData";

function PatientVisit() {
  const [formData, setFormData] = useState({ personal: {}, dm: {}, visit: {} });

  function saveAction() {
    return new Promise((r) => r(true));
  }

  return (
    <>
      <PatientData
        formData={{ get: formData, set: setFormData }}
        saveAction={saveAction}
      />
    </>
  );
}

export default PatientVisit;
