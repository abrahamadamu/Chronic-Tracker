import { Routes, Route, Navigate } from "react-router-dom";
import { Typography } from "@mui/material";

import ExplorePeople from "./ExplorePeople";

function Explore() {
  return (
    <>
      <Typography variant="h4">Explore Patient Data</Typography>

      <Routes>
        <Route path="/" element={<Navigate to="searchpeople" />} />
        <Route path="searchpeople/*" element={<ExplorePeople />} />
      </Routes>
    </>
  );
}

export default Explore;
