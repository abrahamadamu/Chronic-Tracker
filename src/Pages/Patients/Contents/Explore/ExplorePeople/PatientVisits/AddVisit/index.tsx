import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientData from "Components/PatientData";
import { FormDataType } from "Components/PatientData/contexts";
import { Box, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import Api from "Services/api";

function AddVisit() {
  const [formData, setFormData] = useState<FormDataType | undefined>({
    personal: {},
    dm: {},
    visit: {},
  });

  const { URL_regno } = useParams();
  const navigate = useNavigate();
  // const useEffect

  useEffect(() => {
    if (!URL_regno) return;
    Api.post("/patients/find", { regno: URL_regno }).then((response) => {
      const data = response.data;
      {
        if (data.length > 0) {
          setFormData({
            personal: data[0],
            dm: {},
            visit: {},
            patientid: data[0]._id,
          });
        }
      }
    });
  }, [URL_regno]);

  function saveAction(): Promise<any> {
    // return new Promise((r) => r(3));
    return Api.post("/patients/save", formData)
      .then((response) => {
        if (response.status >= 300 || response.status < 200) {
          throw new Error(response.data);
        }
        if (!formData) return undefined;

        const data = response.data;

        const newFormData = {
          ...formData,
          patientid: data.patientid,
        };
        setFormData(newFormData);
        console.log({ newFormData });

        return true;
      })
      .catch((e) => {
        const error = e.response.data ?? e.message;
        alert(error);
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
