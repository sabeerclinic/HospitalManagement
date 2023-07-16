import React, { Component, useContext, useState } from 'react'
import backgroundImage from '../../assets/background.jpg'
import hos from '../../assets/hos.jpeg'
import pic from '../../assets/pic.jpeg'
import app, { auth, login } from '../../firebase';
import { UserContext } from '../../context';


export default function Login(){
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');

    async function  handleLogin (){
      try {
          
        const userc=await login(email,pass);
        if(userc.user.uid){
          console.log(userc.user.uid)
          console.log(auth.currentUser.uid)

        }
    } catch {
         alert("Error!");
      } 
        
    }
    return(
        <div style={{backgroundImage: `url(${backgroundImage})`}} className="w-full h-screen bg-cover absolute">
         <div  className="block md:max-w-[70%] sm:w-[90%] h-[80%] p-6 bg-white border border-gray-200 rounded-lg shadow  m-auto mt-20 ">
            <div className="flex ">
               <div  className="min-w-[44%] min-h-[90%] max-w-[40%] max-h-[90%] mr-10  mb-10 border-r-[3.5px]
                border-black">
                   <img src={pic} className=" rounded-3xl p-5 " />
                
                   <div className="flex gap-2 ml-5 mb-5 flex-col lg:flex-row ">
                     <h1 className="lg:text-2xl  md:text-xl sm:text-sm  font-serif text-[#00008B]"> DR. MOHAMED SALEEM</h1>
                     <h5 className="text-sm mt-3 font-serif text-[#00008B] ">MBBS</h5>
                   </div>
               </div>
               <div className='flex  flex-col w-full h-full mt-5'>
                <div className='flex gap-1 mb-5 flex-row self-center'>
              
                <img src={hos} className=" w-20 h-20 items-center" />
              
                <h2  className="text-xl font-serif text-[#00008B] mt-7">SABEER CLINIC</h2>
                </div>
                <h1 className="lg:text-6xl md:text-5xl sm:text-4xl font-serif text-[#00008B] mb-10 items-center justify-center m-auto ">Welcome</h1>
                  
                    <input 
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    //   value={loginPayload.email}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="youremail@gmail.com"
                      className="rounded-lg border-b bg-[#87CEEB] w-[60%] min-w-[50%] h-10 m-auto mb-10"
                    />
                    
                  <input
                    onChange={(e) => {
                        setPass(e.target.value);
                    }}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    className="rounded-lg border-b bg-[#87CEEB] w-[60%] m-auto h-10 mb-10"
                  />
                    <button
                    className="w-[40%] rounded-3xl bg-[#00008B] text-white font-weight font-semibold mt-7 m-auto h-10"
                    onClick={() => {
                       handleLogin()
                    }}
                  >
                    Login
                  </button>
                  </div>
                  
               </div>
            </div>

         </div>
        
    );

    
}
