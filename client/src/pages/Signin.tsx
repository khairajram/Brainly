import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../confib";
import { Button } from "../components/Button";
import { InputElement } from "../components/InputElement";



export function Signin(){
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/signin`, {
          email,
          password
        });
        localStorage.setItem("token",response.data.token);

        localStorage.setItem("token", response.data.token);

      } catch (error) {
        console.error("Error:", error);
      }
    };

    return <>
       <section className="h-screen flex justify-center items-center p-6 gap-2">
      <div className="text-center flex flex-col gap-5">
            <InputElement size="lg" placeholder="Email"/>
            <InputElement size="lg" placeholder="password"/>
            <Button variant="primary" size="md" text="SIGN IN" onClick={() => {}} />
        </div>
      </section>
    </>
}


