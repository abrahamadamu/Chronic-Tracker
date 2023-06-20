import { useState, useEffect } from "react";

import SearchPeople from "./SearchPeople";

export type PeopleRow = {
  firstname: string;
  fathername: string;
  grandfathername: string;
  regno: number;
  chno: number;
  age: number;
};

function ExplorePeople() {
  const [data, setData] = useState<PeopleRow[]>([]);
  return <SearchPeople data={data} />;
}

export default ExplorePeople;
