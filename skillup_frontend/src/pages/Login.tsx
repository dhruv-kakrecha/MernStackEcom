import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {FcGoogle} from "react-icons/fc";
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userApi';
import { useDispatch } from 'react-redux';




const Login = () => {
    const dispatch = useDispatch();
   const [gender,setGender]=useState<string>('');
   const [date,setDate]=useState<any>('');

   const [login,{ isLoading, isSuccess, isError }] = useLoginMutation();
    
    if(isLoading){
            return <>Loading...</>
    };

    if(isError){
        let er =  new Error('Something went wrong while adding the post.');
          return er;
  };

   const loginHandler = async()=>{
            try {
                const  provider = new GoogleAuthProvider();
              const {user} =  await signInWithPopup(auth,provider);

                    if(user){

                        const userData:any = {
                            _id:user?.uid,
                            name:user?.displayName,
                            email: user?.email,
                            gender:gender,
                            dob: date,
                            photo: user?.photoURL,
                            role: "user"
                        }
                      const {data} =   await login(userData);

                            if(data?.status===true){
                               toast.success(data?.message || "Login success !");
                            }else{
                                toast.error(data?.message || "Failed to add post.");
                            }

                    }
              console.log("user",user);
            } catch (error:any) {
                toast.error(error?.message || "Sign in Failed");
            }
   };


   return (
    <div className='login'>
        <main>
            <h1 className='heading'>Login</h1>
            <div>
                <label>Gender</label>
                <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                    <option>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div>
              <label>Date of Birth</label>
               <input type='date' name='date' value={date} onChange={(e)=>setDate(e.target.value)}/>    
            </div>

            <div>
                <p>Already Signed  In Once</p>
                <button onClick={loginHandler}>
                    <FcGoogle/> <span>Sign in With Google</span>
                </button>
            </div>

        </main>
      
    </div>
  )
}

export default Login
    