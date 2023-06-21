import { Routes, Route } from "react-router-dom";
import SearchPeople from "./SearchPeople";
import PatientVisits from "./PatientVisits";

export type PeopleRow = {
  firstname: string;
  fathername: string;
  grandfathername: string;
  regno: number;
  chno: number;
  age: number;
};

function ExplorePeople() {
  return (
    <Routes>
      <Route path="/" element={<SearchPeople />} />
      <Route path=":URL_regno/*" element={<PatientVisits />} />
    </Routes>
  );
}

export default ExplorePeople;
