import React, {useState,useRef } from "react";
import { db, logout } from "../../firebase";
import backgroundImage from "../../assets/background.jpg";
import pro from "../../assets/prof.png";
import { FaSignOutAlt} from "react-icons/fa";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { PiUserList } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { setDoc,collection, addDoc } from "firebase/firestore";
import Webcam from 'react-webcam';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import LoadingIndicator from "../Loading";

export default function AddPatient() {

  const navigate = useNavigate();
  const [name, setNamme] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [cam,setCam]=useState(false)
  const [load,setLoad]=useState(false)
  const [imageUrl, setImageUrl] = useState(null);

  const CameraComponent = () => {
    const webcamRef = useRef(null);
   
  
    const captureImage = async () => {
      setLoad(true)
      const imageSrc = webcamRef.current.getScreenshot();
      const storageRef = getStorage();
      const storage = ref(storageRef, `images/${Date.now()}.png`);
      await uploadString(storage, imageSrc, 'data_url');
      const downloadUrl = await getDownloadURL(storage);
      setImageUrl(downloadUrl);
      setCam(false)
      setLoad(false)
      alert('Image uploaded to Firebase Storage:', downloadUrl);
    };
  
    return (
      <div>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" />
        <button className='bg-[#0000FF] text-white rounded-xl h-7 w-20 ml-[70%]'  onClick={captureImage}>Capture</button>
      </div>
    );
  };

  async function createPatient() {
    await addDoc(collection(db, "Patients"), {
      name: name,
      age: age,
      place: place,
      gender: gender,
      mobile: mobile,
      docId: null,
      img:imageUrl
    })
      .then((docRef) => {
        alert("patient added to database");
        const docId = docRef.id;
        console.log("Document written with ID: ", docId);
        setDoc(docRef, { docId: docId }, { merge: true });
        navigate("/dia", { state: { prop: docId } });

        // You can perform additional operations using the docId if needed
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

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
     <div className="block max-w-[70%] h-[80%] min-w-[70%]  bg-white border border-gray-200 rounded-2xl shadow  m-auto mt-20  ">
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

            <div className="flex flex-row items-center justify-center gap-3 mb-5 mt-10 border-[3px]  border-[#0000FF]">
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

              <h1 className="text-sm font-semibold ">
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
            {load?<LoadingIndicator/>:
            <div className="w-[100%] h-[15%] rounded-tr-2xl bg-[#BCD5F3] ">
              <h1 className="md:text-2xl md:mx-[25%] sm:text-xl mx-[15%] mt-7">
                {" "}
                ADD PATIENT PAGE
              </h1>
            </div>
}
            {/* code here */}
            {!cam?
            <div className="max-w-[85%] h-[75%] rounded-2xl bg-[#BCD5F3] m-auto">
              <div className="flex flex-row">
                <div className="w-[35%]">
                  <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Name</h1>
                    <input
                      onChange={(e) => {
                        setNamme(e.target.value);
                      }}
                      name="name"
                      className="rounded-lg border-b bg-white w-[80%] h-8 ml-5"
                      value={name}
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Age</h1>
                    <input
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                      name="age"
                      className="rounded-lg border-b bg-white w-[80%] h-8 ml-5"
                      value={age}
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Place</h1>
                    <input
                      onChange={(e) => {
                        setPlace(e.target.value);
                      }}
                      name="place"
                      className="rounded-lg border-b bg-white w-[80%] h-8 ml-5 "
                      value={place}
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <h1 className="ml-7 text-sm">Gender</h1>
                    <input
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      name="gender"
                      className="rounded-lg border-b bg-white w-[80%] h-8 ml-5"
                      value={gender}
                    />
                  </div>
                </div>
                <div className="flex flex-col min-w-[25%]">
                  <h1 className="ml-32 mt-4">Photo</h1>
                  <div
                    style={{ backgroundImage: imageUrl? `url(${imageUrl})` : `url(${pro})` }}
                    className="w-20 h-20 bg-cover ml-20  sm:ml-20 md:ml-36 mt-6 rounded-xl"
                  >
                    
                    <BiSolidMessageSquareAdd
                      onClick={() => {
                        setCam(true)
                      }}
                      className="w-9 h-7 mt-16 ml-20"
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:ml-16 md:ml-28 mt-4 mr-3 ">
                    <h1 className="ml-7 text-sm">Mobile</h1>
                    <input
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      name="Mobile"
                      className="rounded-lg border-b bg-white  h-8 ml-5"
                      value={mobile}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  createPatient();
                }}
                className=" bg-[#0000FF] text-white rounded-xl h-7 w-20 ml-[70%]"
              >
                Next
              </button>
            </div>:<CameraComponent/>
}
          </div>
        </div>
      </div>
    </div>
  );
}
