import React, { useContext, useRef } from 'react';
import Webcam from 'react-webcam';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { UserContext } from '../context';

const CameraComponent = () => {
    const webcamRef = useRef(null);
    const{setCam}=useContext(UserContext)


  
    const captureImage = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const storageRef = getStorage();
      const storage = ref(storageRef, `images/${Date.now()}.png`);
      await uploadString(storage, imageSrc, 'data_url');
      const imageUrl = await getDownloadURL(storage);
      setCam(false)
      console.log('Image uploaded to Firebase Storage:', imageUrl);
      alert("image added")
    };
  
    return (
      <div>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" />
        <button className='bg-[#0000FF] text-white rounded-xl h-7 w-20 ml-[70%]' onClick={captureImage}>Capture</button>
      </div>
    );
  };
  
  export default CameraComponent;
