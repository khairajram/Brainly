import { useState } from "react";
import React from "react";
import { Button } from "../components/Button";
import { Signin } from "./Signin";
import { Signup } from "./Signup";

export function SignPage() {
  const [isSignUp,setisSignUp] = useState(true);


  return (
    <div className="mt-16 bg-gray-200 h-screen w-screen fixed flex ">
      <div className={`absolute w-1/2 h-full transition-transform duration-500 ease-in-out ${
          isSignUp  ? "translate-x-0" : "translate-x-full"
        } flex justify-center items-center`}>
        {!isSignUp && <Signin/>}
        {isSignUp && <Signup/>}
      </div>
      <div className={`absolute w-1/2 h-full transition-transform duration-500 ease-in-out ${
          isSignUp ? "translate-x-full" : "translate-x-0" 
        }`}>
        {!isSignUp && <Welcome  button={"SIGN UP"} setisSignUp={setisSignUp} mainheading={"Hello, Friend!"} message={"Register with your personal details to use all of the site features"} />}
        {isSignUp && <Welcome button={"SIGN IN"} setisSignUp={setisSignUp} mainheading={"Welcome Back!"} message={"Enter your personal details to use all site features"} />}
      </div>
    </div>
  );
}


type WelcomeProps = {
  setisSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  mainheading: string;
  message: string;
  button : string
};

function Welcome(props : WelcomeProps ){
  return (
    <section className={`bg-blue-800  h-screen flex justify-center items-center p-6 ${props.button === "SIGN UP" ? "rounded-r-[120px]" : "rounded-l-[120px]"}`}>
      <div className="text-center flex flex-col">
        <h1 className="text-3xl text-white font-medium mb-2">{props.mainheading}</h1>
        <p className="text-white">{props.message}</p>
        <div className=" flex justify-center pt-4">
          <Button variant="primary" size="md" text={props.button} onClick={() =>  props.setisSignUp((prev) => !prev)
          } />
        </div>
      </div>
    </section>
  );
}
