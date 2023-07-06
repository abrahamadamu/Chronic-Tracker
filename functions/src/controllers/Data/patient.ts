import { Patient } from "../../models/Patient";
import * as visitData from "./visit";
import * as createError from "http-errors";

/**
 * Saves patient data to database
 * @param {Record<string,any>} data - data to save
 * @return {Promise}
 **/
async function save(
  data: Record<string, any>
): Promise<{ patientid?: string; visitid?: string }> {
  const personal = preparePersonal(data);

  if (!data.personal.regno) {
    throw createError(400, "Registration Number required");
  }

  const response: { patientid?: string; visitid?: string } = {};

  if (!data.patientid) {
    const newPatient = await Patient.create(personal);
    response.patientid = newPatient._id + "";
  } else {
    const item = await Patient.findOne({ _id: data.patientid });
    if (!item) throw createError(400, "Patient doesn't exist");

    await Patient.updateOne({ _id: data.patientid }, personal);
    response.patientid = data.patientid;
  }

  console.log("to save", data);

  const savedVisit = await visitData.save(data);
  response.visitid = savedVisit.id;

  return response;

  /**
   * Prepares and parses personal data before saving
   * @param {Record<string, any>} data - data to parse and prepare
   * @return {Record<string,any>}
   **/
  function preparePersonal(data: Record<string, any>): Record<string, any> {
    const personal = { ...data }.personal;
    // handle name vs fullname

    let yearofbirth;
    if (personal.age) {
      yearofbirth = new Date().getUTCFullYear() - personal.age;
      personal.yearofbirth = yearofbirth;
    }
    delete personal.age;

    return personal;
  }
}

/**
 * finds patients using parameters
 * @param {Record<string,any>} params - parameters to search with
 * @return {Promise}
 **/
async function find(
  params: Record<string, any>
): Promise<Record<string, any>[]> {
  params = { ...params };
  console.log({ params });

  let result;

  if (params.id) {
    const item: Record<string, any> | null = {
      ...((await Patient.findById(params.id))?.toJSON() ?? {}),
    };
    if (!item) return [];

    item.id = item._id;
    delete item["_id"];

    result = [item];
  } else {
    for (const key of Object.keys(params)) {
      if (params[key] === "") {
        delete params[key];
        continue;
      }
      if (key.includes("name")) {
        params[key] = new RegExp(params[key], "i");
      }
    }
    const items = await Patient.find(params).limit(20);

    result = items ?? [];
  }

  for (let i = 0; i < result.length; i++) {
    const item: any = result[i].toJSON();
    item.age = new Date().getUTCFullYear() - item.yearofbirth;
    result[i] = item;
  }
  return result;
}

export { save, find };
