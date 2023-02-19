import React, { useState } from 'react'
import {LoginBg} from "../assets"
import {Logo} from "../assets"
import LoginInput from '../components/LoginInput'
import {FaEnvelope, FaLock, FcGoogle} from "../assets/icons"
import {motion} from "framer-motion"
import {buttonClick} from "../animations"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {app} from "../config/firebase.config"

function Login() {

  const [userEmail, setUserEmail] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()


  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      firebaseAuth.onAuthStateChanged(cred => {
        if(cred){
          cred.getIdToken().then(token => console.log(token))
        }
      })
    })
  }
  

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">

      <img src={LoginBg} className="w-full h-full object-cover absolute top-0 left-0" alt="Login Background" />

      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-20 backdrop-blur-md p-4 px-4 py-12 gap-6">

        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="City Logo" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>

        <p className='text-3xl font-semibold text-headingColor'>Welcome Back</p>
        <p className='text-xl text-textColor -mt-6'>{isSignUp ? "Sign up" : "Sign in"} with following</p>

        <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>

          <LoginInput 
            placeholder="Email Here" 
            icon={<FaEnvelope className='text-xl text-textColor'/>} 
            inputState={userEmail} inputStateFunc={setUserEmail} 
            type="email" 
            isSignUp={isSignUp}
          />

          <LoginInput 
            placeholder="Password Here" 
            icon={<FaLock className='text-xl text-textColor'/>} 
            inputState={password} 
            inputStateFunc={setPassword} 
            type="password" 
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput 
              placeholder="Confirm Password Here" 
              icon={<FaLock className='text-xl text-textColor'/>} 
              inputState={confirmPassword} 
              inputStateFunc={setConfirmPassword} 
              type="password" 
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? 
            <p>
              Doesn't have an account:{" "}
              <motion.button 
                {...buttonClick} 
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Create One
              </motion.button>
            </p> 
            : 
            <p>
               Already have an account:{" "}
               <motion.button 
                {...buttonClick} 
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          }

         {isSignUp ? 
           <motion.button {...buttonClick} className="w-full px-4 py-2 bg-red-400 text-white cursor-pointer text-xl capitalize hover:bg-red-500 transition-all duration-150 rounded-md">
            Sign Up
          </motion.button>
          :
          <motion.button {...buttonClick} className="w-full px-4 py-2 bg-red-400 text-white cursor-pointer text-xl capitalize hover:bg-red-500 transition-all duration-150 rounded-md">
            Sign In
          </motion.button>
        }

        </div>

        <div className='flex items-center justify-between gap-16'>
          <div className='w-24 h-[1px] rounded-md bg-white'></div>
          <p className='text-white'>or</p>
          <div className='w-24 h-[1px] rounded-md bg-white'></div>
        </div>

        <motion.div onClick={loginWithGoogle} {...buttonClick} className="flex items-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4">
          <FcGoogle className='text-3xl' />
          <p className='capatalize text-base text-textColor'>Sign in with Google</p>
        </motion.div>

      </div>

    </div>
  )
}

export default Login