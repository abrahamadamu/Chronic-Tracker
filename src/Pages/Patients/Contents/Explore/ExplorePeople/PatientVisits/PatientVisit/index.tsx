import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientData from "Components/PatientData";
import { FormDataType } from "Components/PatientData/contexts";
import { Box, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import { backend } from "Config/data";

function PatientVisit() {
  const [formData, setFormData] = useState<FormDataType | undefined>();

  const { URL_visitid } = useParams();
  const navigate = useNavigate();
  // const useEffect

  useEffect(() => {
    if (!URL_visitid) return;
    fetch(backend + "/visits/find", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: URL_visitid }),
    }).then((response) =>
      response.json().then((json) => {
        const visit = json.visits.length > 0 ? json.visits[0] : {};
        setFormData({
          personal: json.patient,
          dm: visit?.data?.dm ?? {},
          visit: visit ?? {},
          patientid: json.patient._id,
          visitid: visit?._id,
        });
      })
    );
  }, [URL_visitid]);

  function saveAction(): Promise<any> {
    // return new Promise((r) => r(3));
    return fetch(backend + "/patients/save", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.status >= 300 || response.status < 200) {
          throw new Error(await response.text());
        }
        return response.json().then((json) => {
          const newFormData = {
            ...json,
            patientid: json.patientid,
            visitid: json.visitid,
          };
          setFormData(newFormData);
          console.log({ newFormData });

          return true;
        });
      })
      .catch((e) => {
        alert(e);
      });
  }

  return (
    <>
      <Box sx={{ marginTop: "24px" }}>
        <Button
          color="secondary"
          startIcon={<ChevronLeft />}
          onClick={() => navigate("..")}
        >
          {"Back"}
        </Button>
        <PatientData
          formData={formData && { get: formData, set: setFormData }}
          saveAction={saveAction}
        />
      </Box>
    </>
  );
}

export default PatientVisit;
