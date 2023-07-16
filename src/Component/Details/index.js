import React, { useEffect, useState } from "react";
import { db, logout } from "../../firebase";
import backgroundImage from "../../assets/background.jpg";

import { FaSignOutAlt } from "react-icons/fa";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { PiUserList } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
 
} from "firebase/firestore";
import LoadingIndicator from "../Loading";

export default function Details() {

  const [data, setPdata] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const myProp = location.state?.prop;
  const [patientData, setPatientData] = useState(null);

  const getPatient = async (patientId) => {
    try {
      const patientRef = doc(collection(db, "Patients"), patientId);
      const docSnap = await getDoc(patientRef);

      if (docSnap.exists()) {
        const patientData = docSnap.data();
        console.log("Patient data:", patientData);
        setPatientData(patientData);
      } else {
        console.log("Patient does not exist");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  const fetchPatientById = async (patientId) => {
    try {
      const patientRef = doc(db, "Diagnosis", patientId);
      const subcollectionRef = collection(patientRef, "data");
      const querySnapshot = await getDocs(subcollectionRef);
      const patientData = [];

      querySnapshot.forEach((doc) => {
        patientData.push(doc.data());
      });
      console.log(patientData, "---------");
      setPdata(patientData);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      return [];
    }
  };

  // Example usage

  // Example usage

  useEffect(() => {
    getPatient(myProp);
    fetchPatientById(myProp);
  }, [myProp]);

  async function Logout() {
    try {
      const confirmed = window.confirm("Are you sure you want to log out?");
      if (confirmed) {
        await logout();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="w-full h-screen bg-cover absolute"
    >
      <div className="block max-w-[70%] h-[85%] min-w-[70%]  bg-white border border-gray-200 rounded-2xl shadow  m-auto mt-20  ">
        <div className="flex flex-row h-full">
          <div className="min-w-[20%] h-full rounded-l-2xl bg-[#BCD5F3] flex flex-col m-auto">
            <div className="w-full h-[20%] rounded-tl-2xl bg-[#0000FF]">
              <div className="flex gap-1 mb-5 flex-col">
                {/* <img src={hos} className=" w-10 h-10 items-center ml-16" /> */}
                <LiaHospitalAltSolid className=" w-10 h-10 items-center m-auto" />

                <h1 className="text-xl font-serif text-white mt-1 ml-4">
                  SABEER CLINIC
                </h1>
              </div>
            </div>

            <div
              className="flex flex-row items-center justify-center gap-3 mb-5 mt-10 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <BiSolidMessageSquareAdd className="w-7 h-7" />
              <h1 className="text-sm font-semibold">ADD PATIENT</h1>
            </div>
            <div
              className="flex flex-row items-center justify-center gap-3 my-5 cursor-pointer"
              onClick={() => {
                navigate("/list");
              }}
            >
              <PiUserList className="w-7 h-7" />

              <h1 className="text-sm font-semibold">PATIENT LIST</h1>
            </div>

            <button
              className="flex flex-row items-center justify-center gap-3 my-5 cursor-pointer"
              onClick={() => {
                Logout();
              }}
            >
              <FaSignOutAlt size={20} className="items-center justify-center" />
              <h1 className="text-sm font-semibold items-center justify-center">
                SIGN OUT
              </h1>
            </button>
          </div>
          <div className="flex flex-col w-[100%]">
            <div className="w-[100%] h-[15%] rounded-tr-2xl bg-[#BCD5F3] ">
              <h1 className="md:text-2xl md:mx-[25%] sm:text-xl mx-[15%] mt-7">
                PATIENT DETAILS
              </h1>
            </div>
            {/* code here */}
            {patientData ? (
              <div className="w-[85%] h-[75%] rounded-2xl bg-[#BCD5F3] m-auto mt-6">
                <div className="min-w-[30%] min-h-[25%] rounded-2xl bg-white mx-8 my-3 flex flex-col ">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                    <div className="flex gap-3 ">
                      <h1 className="font-semibold ml-5 my-3">Name :</h1>

                      <h1 className="ml-3 my-3 text-[#0000FF] font-semibold">
                        {patientData.name}
                      </h1>
                    </div>
                    <div className="flex gap-3">
                      <h1 className="font-semibold ml-5 mb-3">Age :</h1>

                      <h1 className="ml-6 mb-3 text-[#0000FF] font-semibold">
                        {patientData.age}
                      </h1>
                    </div>
                    <div className="flex gap-3">
                      <h1 className="font-semibold ml-5 mb-3">Mobile :</h1>

                      <h1 className="ml-2 mb-3 text-[#0000FF] font-semibold">
                        {patientData.mobile}
                      </h1>
                    </div>
                    <div className="flex gap-3">
                      <h1 className="font-semibold ml-5 ">Gender :</h1>

                      <h1 className=" mb-3 text-[#0000FF] font-semibold">
                        {patientData.gender}
                      </h1>
                    </div>
                    <div className="flex gap-3">
                      <h1 className="font-semibold ml-5 ">Place :</h1>

                      <h1 className="ml-3 mb-3 text-[#0000FF] font-semibold">
                        {patientData.place}
                      </h1>
                    </div>
                    </div>
                    <div className="w-[28%] h-[38%] my-auto mr-[20%] rounded-xl">
                      <img src={patientData.img} alt="Captured" />
                    </div>
                  </div>
                </div>
                <h1 className="font-semibold ml-4">Medical History</h1>
                {data ? (
                  <div className=" overflow-y-auto h-[50%]">
                    {data?.map((item) => (
                      <div
                        className="min-w-[30%] min-h-[25%] rounded-2xl bg-white mx-8 my-3 flex flex-col "
                        key={item.id}
                      >
                        <h1 className="ml-5 my-2 text-[#0000FF] ">
                          ProvisionalDiagnosis :{item.ProvisionalDiagnosis}
                        </h1>
                        <h1 className="ml-5 mb-2 text-[#0000FF]">
                          ChiefComplaints :{item.ChiefComplaints}
                        </h1>
                        <h1 className="ml-5 mb-2 text-[#0000FF] ">
                          Investigations :{item.Investigations}
                        </h1>
                        <h1 className="ml-5 mb-2 text-[#0000FF] ">
                          Examination :{item.Examination}
                        </h1>
                        <h1 className="ml-5 mb-2 text-[#0000FF]">
                          Treatment :{item.Treatment}
                        </h1>
                        <h1 className="ml-5 mb-2 text-[#0000FF]">
                          Advice :{item.Advice}
                        </h1>
                        <h1 className="ml-5 text-[#0000FF] ">
                          Date :{item.Date}
                        </h1>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h1>loading</h1>
                )}

                <button
                  onClick={() => {
                    navigate("/dia", { state: { prop: myProp } });
                  }}
                  className=" bg-[#0000FF] text-white rounded-xl h-7 pb-7 w-20 ml-[80%]"
                >
                  Add
                </button>
              </div>
            ) : (
              <LoadingIndicator />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
