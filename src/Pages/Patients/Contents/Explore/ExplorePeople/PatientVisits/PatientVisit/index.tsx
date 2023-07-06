import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientData, { saveData } from "Components/PatientData";
import { FormDataType } from "Components/PatientData/contexts";
import { Box, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import Api from "Services/api";

import { VisitsDataType } from "..";

function PatientVisit({
  visitsData,
}: {
  visitsData: { get: VisitsDataType; set: (v: VisitsDataType) => void };
}) {
  const [formData, setFormData] = useState<FormDataType | undefined>(undefined);

  const { URL_visitid } = useParams();
  const navigate = useNavigate();
  // const useEffect

  useEffect(() => {
    const personal = visitsData.get.patient;
    const visit = visitsData.get.visits.find(
      (visit) => visit._id === URL_visitid
    );
    if (!visit) return;

    setFormData({
      personal: personal,
      dm: visit.data?.dm ?? {},
      visit: visit ?? {},
      patientid: personal._id,
      visitid: visit._id,
    });
  }, [visitsData]);

  // useEffect(() => {
  //   if (!URL_visitid) return;
  //   fetch(backend + "/visits/find", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ _id: URL_visitid }),
  //   }).then((response) =>
  //     response.json().then((json) => {
  //       const visit = json.visits.length > 0 ? json.visits[0] : {};
  //       setFormData({
  //         personal: json.patient,
  //         dm: visit?.data?.dm ?? {},
  //         visit: visit ?? {},
  //         patientid: json.patient._id,
  //         visitid: visit?._id,
  //       });
  //     })
  //   );
  // }, [URL_visitid]);

  async function saveAction() {
    let result;
    try {
      result = await saveData(formData);

      if (formData) {
        const newVisits = [...visitsData.get.visits];
        const currentVisitIndex = newVisits.findIndex(
          (visit) => visit._id === formData.visit._id
        );
        console.log({
          currentVisitIndex,
          compare: { newVisits, forDataVisit: formData.visit },
        });
        if (currentVisitIndex >= 0) {
          newVisits[currentVisitIndex] = {
            ...formData.visit,
            data: { dm: formData.dm },
          };
        }

        visitsData.set({
          patient: formData.personal ?? visitsData.get.patient,
          visits: newVisits,
        });

        console.log("Visit Datas Comparison", {
          old: visitsData.get,
          new: {
            patient: formData.personal ?? visitsData.get.patient,
            visits: newVisits,
          },
        });
      }
    } catch (e) {}

    return !!result;
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
