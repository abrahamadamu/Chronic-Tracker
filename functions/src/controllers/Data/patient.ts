import { Patient } from "../../models/Patient";
import { addVisit } from "./visit";

async function savePatient(data: Record<string, any>, newPatient: boolean) {
  const personal = preparePersonal(data);

  if (!data.personal.regno) throw new Error("Registration Number required");

  if (newPatient) {
    await Patient.create(personal);
  } else {
    const item = await Patient.findOne({ regno: data.regno });
    if (!item) throw new Error("User doesn't exist");

    await Patient.updateOne({ regno: personal.regno }, personal);
  }

  console.log("to save", data);

  return await addVisit(data);

  function preparePersonal(data: Record<string, any>) {
    const personal = { ...data }.personal;
    // handle name vs fullname

    const yearofbirth = new Date().getUTCFullYear() - (personal.age ?? 0);
    delete personal.age;
    personal.yearofbirth = yearofbirth;

    return personal;
  }
}

async function find(params: Record<string, any>) {
  params = { ...params };
  console.log({ params });

  if (params.id) {
    const item: Record<string, any> | null = {
      ...((await Patient.findById(params.id))?.toJSON() ?? {}),
    };
    if (!item) return [];

    item.id = item._id;
    delete item["_id"];

    return [item];
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
    const items = await Patient.find(params);
    return items ?? [];
  }
}

export { savePatient, find };
