import { useRef,useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../confib";
import { Button } from "../components/Button";
import { InputElement } from "../components/InputElement";



export function Signin(){
  const inputRef = useRef<(HTMLInputElement | null)[]>(new Array(2).fill(null));
  const [loading, setLoading] = useState(false);

  const focusInput = (index : number) => {
    inputRef.current[index]?.focus();
  }

    const handleSignIn = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/v1/signin", {
          // email : inputRef.current[0]?.value || "",
          // password : inputRef.current[1]?.value || ""
        });
        localStorage.setItem("token",response.data.token);

      } catch (error) {
        console.error("Error:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    return <>
       <section className="flex justify-center items-center p-6 gap-2">
      <div className="text-center flex flex-col gap-5">
        <h1 className="text-3xl text-black font-medium mb-2">Sign In</h1>
            <InputElement refre={(el : HTMLInputElement | any) => (inputRef.current[0] = el)} key={0} size="lg" placeholder="Email"/>
            <InputElement refre={(el : HTMLInputElement | any) => (inputRef.current[1] = el)} key={1} size="lg" placeholder="password"/>
            <Button text2={"Signing In..."} loading={loading} variant="primary" size="md" text="SIGN IN" onClick={()=> {
              console.log("sign in pressed")
              if(!inputRef.current[0]?.value)
                focusInput(0);
              else if(!inputRef.current[1]?.value)
                focusInput(1);
              handleSignIn();
            }} />
        </div>
      </section>
    </>
}


