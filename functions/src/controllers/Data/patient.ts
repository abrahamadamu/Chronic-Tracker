import {Patient} from "../../models/Patient";

async function savePatient(data: Record<string, any>, newPatient:boolean) {
  
  if(!newPatient){{
    if(!data.regno) throw new Error("Registration Number required")
    
    const item = Patient.findOne({regno:data.regno})
    if(!item) throw new Error("User doesn't exist")
  }
  const personal = preparePersonal(data);

  console.log("to save", personal);

  // const newPatient = await Patient.create(personal);
  // return newPatient;
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

export { savePatient as addPatient };
