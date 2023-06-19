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

  // const newPatient = await Patient.create(personal);
  // return newPatient;
}

function preparePersonal(data: Record<string, any>) {
  const personal = { ...data }.personal;
  // handle name vs fullname

  const yearofbirth = new Date().getUTCFullYear() - (personal.age ?? 0);
  delete personal.age;
  personal.yearofbirth = yearofbirth;

  return personal;
}

export { savePatient };
