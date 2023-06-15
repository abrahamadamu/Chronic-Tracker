import { Patient } from "../models/Patients";

async function addPatient(data: Record<string, any>) {
  const personal = preparePersonal(data);
  console.log("to save", personal);

  const newPatient = await Patient.create(personal);
  return newPatient;
}

function preparePersonal(data: Record<string, any>) {
  const personal = { ...data }.personal;
  // handle name vs fullname

  const yearofbirth = new Date().getUTCFullYear() - personal.age;
  delete personal.age;
  personal.yearofbirth = yearofbirth;

  return personal;
}

function prepareDM(data: Record<string, any>) {
  const dmData = { ...data }.dm;
  dmData._id = dmData.regno;
  delete dmData.regno;

  // handle name vs fullname

  const yearofbirth = new Date().getUTCFullYear() - dmData.age;
  delete dmData.age;
  dmData.yearofbirth = yearofbirth;

  return dmData;
}

export { addPatient };
