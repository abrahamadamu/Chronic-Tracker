import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Patients from "./Patients";
import Login from "./Auth/Login";

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/patients" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:URL_mainpage/*" element={<MainPages />} />
      </Routes>
    </>
  );
}

function MainPages() {
  const pages = [{ path: "patients", page: <Patients /> }];
  const { URL_mainpage } = useParams();

  return (() => {
    for (const page of pages) {
      if (page.path === URL_mainpage) return page.page;
    }
    return <></>;
  })();
}

export default Pages;
