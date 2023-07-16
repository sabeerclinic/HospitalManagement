import React from "react";
import { Routes, Route } from "react-router-dom";
import AddPatient from "../Component/AddPatient";
import List from "../Component/PatientList";
import Diagnosis from "../Component/Diagnosis";
import Details from "../Component/Details";

function HomeRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AddPatient />} />
        
        <Route path="/list" element={<List />} />
        <Route path="/dia" element={<Diagnosis />} />
        <Route path="/det" element={<Details />} />
      </Routes>
    </div>
  );
}

export default HomeRoute;
