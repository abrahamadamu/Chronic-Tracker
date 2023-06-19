import { Visit } from "../../models/Visit";

async function addVisit(data: Record<string, any>) {
  const visit = {
    regno: data.personal.regno,
    dateofvisit: data.visit.dateofvisit,
    data: {},
  };

  const dmData = data.dm;
  visit.data = { ...visit.data, dm: dmData };

  if (data.visit.id) {
    return await Visit.updateOne({ _id: data.visit.id }, visit);
  } else {
    return await Visit.create(visit);
  }
}

export { addVisit };
