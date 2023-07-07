import { Visit } from "../../models/Visit";
import * as patientData from "./patient";
import * as createError from "http-errors";

/**
 * Saves visit data
 * @param {Record<string,any>} data data to save
 * @return {Promise<{ id: string }>}
 */
async function save(data: Record<string, any>): Promise<{ id: string }> {
  const visit = {
    regno: data.personal.regno,
    dateofvisit: data.visit.dateofvisit,
    data: {},
  };

  const dmData = data.dm;
  visit.data = { ...visit.data, dm: dmData };

  if (data.visitid) {
    const existingVisit = await Visit.findOne({ _id: data.visitid });
    if (!existingVisit) throw createError(400, "Visit doesn't exist");

    Object.assign(existingVisit, visit);
    await existingVisit.save();

    return { id: data.visitid };
  } else {
    return { id: (await Visit.create(visit))._id + "" };
  }
}

/**
 * Finds visits and returns including the patient data
 * @param {Record<string,any>} data searching parameters
 * @return {Promise}
 */
async function find(
  data: Record<string, any>
): Promise<{ patient: Record<string, any>; visits: Record<string, any>[] }> {
  if (!data.regno && !data._id) {
    throw createError(400, "regno or id is required");
  }

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

  const patientResult = await patient;
  if (!patientResult || patientResult.length <= 0) {
    throw createError(400, "Patient not found");
  }

  const result = {
    patient: patientResult[0],
    visits: await visits,
  };

  return result;
}

export { save, find };
