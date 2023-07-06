import { Routes, Route } from "react-router-dom";
import SearchPeople from "./SearchPeople";
import PatientVisits from "./PatientVisits";

export type PeopleRow = {
  givenname: string;
  middlename: string;
  familyname: string;
  regno: string;
  chno: string;
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
