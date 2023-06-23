import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientData from "Components/PatientData";
import { FormDataType } from "Components/PatientData/contexts";
import { Box, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import { backend } from "Config/data";

function AddVisit() {
  const [formData, setFormData] = useState<FormDataType>({
    personal: {},
    dm: {},
    visit: {},
  });

  const { URL_regno } = useParams();
  const navigate = useNavigate();
  // const useEffect

  useEffect(() => {
    if (!URL_regno) return;
    fetch(backend + "/patients/find", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regno: URL_regno }),
    }).then((response) =>
      response.json().then((json) => {
        if (json.length > 0) {
          setFormData({
            personal: json[0],
            dm: {},
            visit: {},
            patientid: json[0]._id,
          });
        }
      })
    );
  }, [URL_regno]);

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
            ...formData,
            patientid: json.patientid,
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
          formData={{ get: formData, set: setFormData }}
          saveAction={saveAction}
        />
      </Box>
    </>
  );
}

export default AddVisit;
