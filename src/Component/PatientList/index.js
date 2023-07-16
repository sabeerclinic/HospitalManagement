import React, { useState, useContext, useEffect } from "react";
import { db, logout } from "../../firebase";
import { UserContext } from "../../context";
import backgroundImage from "../../assets/background.jpg";
import { FaSignOutAlt } from "react-icons/fa";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { PiUserList } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import LoadingIndicator from "../Loading";

export default function List() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getAllPatients();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, data]);

  const getAllPatients = async () => {
    try {
      const patientsRef = collection(db, "Patients");
      const snapshot = await getDocs(patientsRef);

      const patients = [];
      snapshot.forEach((doc) => {
        patients.push({ id: doc.id, ...doc.data() });
      });
      setData(patients);
      console.log("All patients:", patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const filterData = () => {
    const filtered = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.toLowerCase().includes(searchQuery.toLowerCase())||
        item.place.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

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
  

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="w-full h-screen bg-cover absolute"
    >
      <div className="block md:max-w-[80%] h-[75%] sm:w-[90%] lg:w-[70%]  bg-white border border-gray-200 rounded-2xl shadow  m-auto mt-20">
        <div className="flex flex-row h-full">
          <div className="min-w-[20%] h-full rounded-l-2xl bg-[#BCD5F3] flex flex-col">
            <div className="w-full h-[20%] rounded-tl-2xl bg-[#0000FF]">
              <div className="flex gap-1 mb-5 flex-col">
                <LiaHospitalAltSolid className="w-10 h-10 items-center ml-16" />
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
            <div className="flex flex-row items-center justify-center gap-3 my-5 border-[3px] border-[#0000FF]">
              <PiUserList className="w-7 h-7" />
              <h1 className="text-sm font-semibold">PATIENT LIST</h1>
            </div>

            <button
              className="flex flex-row items-center justify-center gap-3 m-auto mt-5 cursor-pointer"
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
            <div className="w-[100%] h-[15%] rounded-tr-2xl bg-[#BCD5F3] flex flex-row justify-between ">
              <h1 className="md:text-2xl  sm:text-xl mx-16 my-6">
                PATIENT LIST
              </h1>
              <input
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                name="search"
                className="rounded-lg border-b bg-white min-w-[30%] h-8 mx-16 my-6"
                placeholder="Search"
              />
            </div>
            <div className="w-[85%] h-[75%] rounded-2xl bg-[#BCD5F3] m-auto flex flex-row flex-wrap overflow-y-auto">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div
                    className="min-w-[30%] h-[25%] rounded-2xl bg-white mx-3 my-3 flex flex-col pr-1 cursor-pointer "
                    key={item.id}
                    onClick={() => {
                      navigate("/det", { state: { prop: item.docId } });
                    }}
                  >
                    <div className="flex">
                      <h1 className="font-semibold ml-2 my-3">Name :</h1>
                      <h1 className="ml-1 my-3 text-[#0000FF] font-semibold">
                        {item.name}
                      </h1>
                    </div>
                    <div className="flex">
                      <h1 className="font-semibold ml-2 ">Mobile :</h1>
                      <h1 className="ml-1 text-[#0000FF] font-semibold">
                        {item.mobile}
                      </h1>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-full mt-8">
                  {/* <p className="text-gray-500">No match found.</p> */}
                  <LoadingIndicator/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
