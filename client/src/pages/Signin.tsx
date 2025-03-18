import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../confib";



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
      <div style={{
        display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
        gap:"20px"
      }}>
        <div>
          <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} id='email' />
        </div>
        <div>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} id='password' />
        </div>
        <div>
          <button onClick={handleSignIn} style={{height:"48px",width:"330px",borderRadius:"7px",border:"0px",paddingLeft:"10px",fontSize:"15px",backgroundColor:"#0866ff",color:"rgb(255, 255, 255)", font:"20px",cursor:"pointer"}}>Log in</button>
        </div>
      </div>
    </>
}