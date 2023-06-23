import { Visit } from "../../models/Visit";
import * as patientData from "./patient";

async function save(data: Record<string, any>) {
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
    patient = patientData.find({ regno: data.regno });
    visits = Visit.find({ regno: data.regno });
  } else {
    const visit = await Visit.findById(data._id);
    if (visit) {
      patient = visit && patientData.find({ regno: visit.regno });
    }
    visits = visit ? [visit] : [];
  }

  let patientResult = (await patient) ?? [];

  const result = {
    patient: patientResult?.length > 0 ? patientResult[0] : {},
    visits: await visits,
  };

  if (!result.patient) throw new Error("Visit not found");

  return result;
}

export { save, find };
