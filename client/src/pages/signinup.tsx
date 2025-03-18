// import { useState } from 'react'
// import { Signin } from './Signin';
// import { Signup } from './Signup';


// export function SignPage({ initialPage = "signin" }){
//   const [buttonNav,setButtonNav] = useState(initialPage);

//   return (
//     <div 
//     style={{
//       backgroundColor: "rgb(255, 255, 255)",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       padding : "10px",
//       borderRadius:"10px",
//       height: buttonNav === "signin" ? "300px" : "380px",
//       width:"360px"
//     }}>
//       <div style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
//         <div style={{width:"50%"}}>
//           <button onClick={() => setButtonNav("signin")}
//            style={{
//             height: "40px",
//             width: "100%",
//             fontSize: "20px",
//             backgroundColor: buttonNav === "signin" ? "rgb(255, 255, 255)" : "rgb(218, 202, 202)",
//             border: "none", 
//             borderTop: buttonNav === "signin" ? "2px solid rgb(15, 157, 88)" : "2px solid transparent",
//             cursor: "pointer", 
//             transition: "0.3s ease-in-out"
//         }} 
//           >Sign In</button>
//       </div >
//       <div style={{width:"50%"}}>
//           <button style={{
//             height: "40px",
//             width: "100%",
//             fontSize: "20px",
//             backgroundColor: buttonNav === "signup" ? "rgb(255, 255, 255)" : "rgb(218, 202, 202)",
//             border: "none", 
//             borderTop: buttonNav === "signup" ? "2px solid rgb(15, 157, 88)" : "2px solid transparent",
//             cursor: "pointer", 
//             transition: "0.3s ease-in-out"
//         }} onClick={() => setButtonNav("signup")}
//         >Sign Up</button>
//         </div>
//       </div>
//       <div>
//         {(buttonNav === "signin") ? <Signin/> : <Signup/>}
      
//       </div>
      
//     </div>
//   );
// }

import { useState } from "react";
import { Signin } from "./Signin";
import { Signup } from "./Signup";

export function SignPage({ initialPage = "signin" }) {
  const [buttonNav, setButtonNav] = useState(initialPage);

  return (
    <div
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        borderRadius: "10px",
        height: buttonNav === "signin" ? "300px" : "380px",
        width: "360px",
      }}
    >
      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ width: "50%" }}>
          <button
            onClick={() => setButtonNav("signin")}
            style={{
              height: "40px",
              width: "100%",
              fontSize: "20px",
              backgroundColor: buttonNav === "signin" ? "rgb(255, 255, 255)" : "rgb(218, 202, 202)",
              border: "none",
              borderTop: buttonNav === "signin" ? "2px solid rgb(15, 157, 88)" : "2px solid transparent",
              cursor: "pointer",
              transition: "0.3s ease-in-out",
            }}
          >
            Sign In
          </button>
        </div>
        <div style={{ width: "50%" }}>
          <button
            onClick={() => setButtonNav("signup")}
            style={{
              height: "40px",
              width: "100%",
              fontSize: "20px",
              backgroundColor: buttonNav === "signup" ? "rgb(255, 255, 255)" : "rgb(218, 202, 202)",
              border: "none",
              borderTop: buttonNav === "signup" ? "2px solid rgb(15, 157, 88)" : "2px solid transparent",
              cursor: "pointer",
              transition: "0.3s ease-in-out",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Sign In / Sign Up Forms */}
      <div>{buttonNav === "signin" ? <Signin /> : <Signup />}</div>
    </div>
  );
}
