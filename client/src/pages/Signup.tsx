import { useState,useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../confib";
import { Button } from "../components/Button";
import { InputElement } from "../components/InputElement";



export function Signup(){
  const inputRef = useRef<(HTMLInputElement | null)[]>(new Array(3).fill(null));

    const focusInput = (index : number) => {
      inputRef.current[index]?.focus();
    }

    const handleSignIn = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/signin`, {
          name : inputRef.current[0]?.value,
          email : inputRef.current[1]?.value,
          password : inputRef.current[2]?.value
        });
        localStorage.setItem("token",response.data.token);

        localStorage.setItem("token", response.data.token);

      } catch (error) {
        console.error("Error:", error);
      }
    };

    return <>
      <section className="flex justify-center items-center p-6 gap-2">
      <div className="text-center flex flex-col gap-5">
          <h1 className="text-3xl text-black font-medium mb-2">Create Account</h1>
          <InputElement refre={(el : HTMLInputElement | any) => (inputRef.current[0] = el)} key={0} size="lg" placeholder="Name"/>
          <InputElement refre={(el : HTMLInputElement | any) => (inputRef.current[1] = el)} key={1} size="lg" placeholder="Email"/>
          <InputElement refre={(el : HTMLInputElement | any) => (inputRef.current[2] = el)} key={2} size="lg" placeholder="password"/>
          <Button variant="primary" size="md" text="SIGN UP" onClick={() => {
            if(!inputRef.current[0]?.value)
              focusInput(0);
            else if(!inputRef.current[1]?.value)
              focusInput(1);
            else if(!inputRef.current[2]?.value)
              focusInput(2);
            handleSignIn
          }} />
          
      </div>
    </section>
    </>
}




