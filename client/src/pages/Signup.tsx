// import { useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../confib";
// import { useNavigate } from "react-router-dom";

// export function Signup(){
//   const navigate = useNavigate()
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userId, setUserId] = useState("");

//   const handleSignUp = async () => {
//     try {
//       await axios.post(`${BACKEND_URL}/signup`, {
//         email,
//         password,
//         userId
//       });
//       alert("signed up complete");
//       navigate("/signin");
//     } catch (error) {
//       alert("Error in signing up");
//       console.error("Error :", error);
//     }
//   };

//   return <>
//     <div style={{
//       display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
//       gap:"20px"
//     }}>
//       <div>
//         <input onChange={(e) => setEmail(e.target.value)} id='signUpEmail' type="text" placeholder="Email" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} />
//       </div>
//       <div>
//         <input onChange={(e) => setPassword(e.target.value)} id='signUpPassword' type="text" placeholder="Password" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} />
//       </div>
//       <div>
//         <input onChange={(e) => setUserId(e.target.value)} id='userId' type="text" placeholder="User Id" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} />
//       </div>
//       <div>
//         <button onClick={handleSignUp} style={{height:"48px",width:"330px",borderRadius:"7px",border:"0px",paddingLeft:"10px",fontSize:"15px",backgroundColor:"#0866ff",color:"rgb(255, 255, 255)",font:"20px",cursor:"pointer"}}>Sign Up</button>
//       </div>
//     </div>
//     </>
// }



import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../confib";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/signup`, {
        email,
        password,
        userId,
      });
      alert("Signup successful! Redirecting to Sign In...");
      navigate("/signin");
    } catch (error) {
      alert(`Error signing up: ${error.response?.data?.message || error.message}`);
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div>
        <input
          value={email} // ✅ Controlled component
          onChange={(e) => setEmail(e.target.value)}
          id="signUpEmail"
          type="text"
          placeholder="Email"
          style={{
            height: "48px",
            width: "330px",
            borderRadius: "7px",
            paddingLeft: "10px",
            fontSize: "15px",
          }}
        />
      </div>
      <div>
        <input
          value={password} // ✅ Controlled component
          onChange={(e) => setPassword(e.target.value)}
          id="signUpPassword"
          type="password" // ✅ Secure input
          placeholder="Password"
          style={{
            height: "48px",
            width: "330px",
            borderRadius: "7px",
            paddingLeft: "10px",
            fontSize: "15px",
          }}
        />
      </div>
      <div>
        <input
          value={userId} // ✅ Controlled component
          onChange={(e) => setUserId(e.target.value)}
          id="userId"
          type="text"
          placeholder="User ID"
          style={{
            height: "48px",
            width: "330px",
            borderRadius: "7px",
            paddingLeft: "10px",
            fontSize: "15px",
          }}
        />
      </div>
      <div>
        <Button variant={"primary"} 
          size={"md"}
          text={"Sign Up"}
          text2={"Signing Up..."}
          loading={loading}
          onClick={() => {
            handleSignUp();
          }}/>
      </div>
    </div>
  );
}







{/* <div class="flex gap-2">
  <!-- HTML -->
  <button class="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50" disabled>
    Disabled Button
  </button>

  <!-- HTML -->
  <button class="bg-green-500 hover:bg-green-700 active:bg-green-800 px-4 py-2 rounded-md text-white">
    Active Button
  </button>

</div> */}