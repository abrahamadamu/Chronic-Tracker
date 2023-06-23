import { Visit } from "../../models/Visit";
import { Patient } from "../../models/Patient";

async function saveVisit(data: Record<string, any>) {
  const visit = {
    regno: data.personal.regno,
    dateofvisit: data.visit.dateofvisit,
    data: {},
  };

  const dmData = data.dm;
  visit.data = { ...visit.data, dm: dmData };

  if (data.visitid) {
    await Visit.updateOne({ _id: data.visitid }, visit);
    return { id: data.visitid };
  } else {
    return { id: (await Visit.create(visit))._id + "" };
  }
}

async function find(data: Record<string, any>) {
  if (!data.regno && !data._id) throw new Error("regno or id is required");

  let patient;

  let visits;

  if (data.regno) {
    patient = Patient.findOne({ regno: data.regno });
    visits = Visit.find({ regno: data.regno });
  } else {
    const visit = await Visit.findById(data._id);
    if (visit) {
      patient = visit && Patient.findOne({ regno: visit.regno });
    }
    visits = visit ? [visit] : [];
  }
  const result = { patient: await patient, visits: await visits };

  if (!result.patient) throw new Error("Visit not found");

  return result;
}

export { saveVisit, find };
