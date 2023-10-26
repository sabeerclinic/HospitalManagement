import React, {  useState } from "react";
import { db, logout } from "../../firebase";
import backgroundImage from "../../assets/background.jpg";
import { FaSignOutAlt } from "react-icons/fa";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { PiUserList } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";



export default function Diagnosis() {
  const navigate = useNavigate();
  const location = useLocation();
  const myProp = location.state?.prop;
  const[date,setDate]=useState("")
  const[com,setCom]=useState("")
  const[inv,setInv]=useState("")
  const[tre,setTre]=useState("")
  const[pd,setPd]=useState("")
  const[exam,setExam]=useState("")
  const[advice,setAdvice]=useState("")

  async function Logout() {
    try {
      const confirmed = window.confirm('Are you sure you want to log out?');
      if (confirmed) {
        await logout();
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  
  const data={
    Date:date ,
    ChiefComplaints:com,
    Investigations:inv,
    Treatment:tre,
    ProvisionalDiagnosis:pd,
    Examination:exam,
    Advice:advice
    }
    const addOrUpdatePatient = async (patientId, data) => {
      try {
        const patientRef = doc(db, 'Diagnosis', patientId);
        const subcollectionRef = collection(patientRef, 'data');
        
        // Generate a new document ID for the subcollection
        const newDocRef = doc(subcollectionRef);
        
        // Add patient data using the generated document ID
        await setDoc(newDocRef, data);
        alert("Data updated")
        console.log('Patient data added/updated successfully');
        navigate('/')
      } catch (error) {
        console.error('Error adding/updating patient data:', error);
      }
    };
    
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="w-full h-screen bg-cover absolute"
    >
      <div className="block w-full h-screen lg:w-[75%]   bg-white border border-gray-200 rounded-2xl shadow  m-auto mt-0 lg:mt-20">
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

              <h1 className="text-sm font-semibold sm:scale-0 md:scale-100">
                PATIENT LIST
              </h1>
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
                DIAGNOSOS PAGE
              </h1>
            </div>
            {/* code here */}
            <div className="max-w-[85%] h-[75%] rounded-2xl bg-[#BCD5F3] ml-14 mt-6 pr-5 pb-5 overflow-auto">
              <div className="flex flex-row gap-14">
                <div className="min-w-[35%]">
                  <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Date</h1>
                    <input
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    

                      name="date"
                      className="rounded-lg border-b bg-white min-w-[30%] h-8 ml-5"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Chief Complaints</h1>
                    <input
                      onChange={(e) => {
                        setCom(e.target.value);
                      }}
                      

                      name="ch"
                      className="rounded-lg border-b bg-white min-w-[30%] h-14 ml-5"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Investigations</h1>
                    <input
                      onChange={(e) => {
                         setInv(e.target.value);
                      }}
                   

                      name="place"
                      className="rounded-lg border-b bg-white min-w-[30%] h-14 ml-5 "
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Treatment</h1>
                    <input
                      onChange={(e) => {
                        setTre(e.target.value);
                      }}
                   

                      name="gender"
                      className="rounded-lg border-b bg-white min-w-[30%] h-14 ml-5"
                    />
                  </div>
                </div>
                <div className="flex flex-col min-w-[35%]">
                <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Provisional Diagnosis</h1>
                    <input
                      onChange={(e) => {
                         setPd(e.target.value);
                      }}
                    

                      name="date"
                      className="rounded-lg border-b bg-white min-w-[30%] h-8 ml-5"
                    />
                  </div>
                <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Examination</h1>
                    <input
                      onChange={(e) => {
                        setExam(e.target.value);
                      }}
                     

                      name="date"
                      className="rounded-lg border-b bg-white min-w-[30%] h-24 ml-5"
                    />
                  </div>
                  
                  <div className="flex flex-col  mt-4 ">
                    <h1 className="ml-7 text-sm">Advice</h1>
                    <input
                      onChange={(e) => {
                        setAdvice(e.target.value);
                      }}
                     

                      name="Mobile"
                      className="rounded-lg border-b bg-white min-w-[30%] h-20 ml-5"
                    />
                  </div>
                </div>
              </div>
              <button onClick={() => {
                 addOrUpdatePatient(myProp,data)
                }} className=" bg-[#0000FF] text-white rounded-xl h-7 pb-7 w-20 ml-[70%]">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
