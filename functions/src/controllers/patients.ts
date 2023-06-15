import { Patient } from "../models/Patients";

async function addPatient(data: Record<string, any>) {
  const personal = { ...data }.personal;
  personal._id = personal.regno;
  delete personal.regno;

  // handle name vs fullname

  const yearofbirth = new Date().getUTCFullYear() - personal.age;
  delete personal.age;
  personal.yearofbirth = yearofbirth;

  console.log("to save", personal);

  const newPatient = await Patient.create(personal);
  return newPatient;
}

export { addPatient };
