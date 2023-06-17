import { Visit } from "../../models/Visit";

async function addVisit(data: Record<string, any>) {
  const dmData = prepareDm(data);
  console.log("visit to save", dmData);

  const newVisit = await Visit.create(dmData);
  return newVisit;
}

function prepareDm(data: Record<string, any>) {
  const personalData = { ...data }.personal;
  const dmData = { ...data }.dm;

  dmData.regno = personalData.regno;

  return dmData;
}

export { addVisit };
