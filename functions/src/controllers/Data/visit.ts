import { Visit } from "../../models/Visit";

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

export { saveVisit };
