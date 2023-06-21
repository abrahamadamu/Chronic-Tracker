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

  if (data.visitID) {
    await Visit.updateOne({ _id: data.visitID }, visit);
    return data.visitID;
  } else {
    return (await Visit.create(visit))._id + "";
  }
}

async function find(data: Record<string, any>) {
  if (!data.regno) throw new Error("regno is required");

  const patient = Patient.findOne({ regno: data.regno });
  const visits = Visit.find({ regno: data.regno });
  return { patient: await patient, visits: await visits };
}

export { saveVisit, find };
