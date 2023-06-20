import { Typography } from "@mui/material";

import ExplorePeople from "./ExplorePeople";

const people = [
  { name: "alemu akana", regno: 14122, chno: 5263, age: 33 },
  { name: "dagne wale", regno: 14353, chno: 5275, age: 53 },
  { name: "melat kiflom", regno: 14153, chno: 5163, age: 27 },
];

function Explore() {
  return (
    <>
      <Typography variant="h4">Explore Patient Data</Typography>

      <ExplorePeople />
    </>
  );
}

export default Explore;
