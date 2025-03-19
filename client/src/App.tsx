// import { useEffect,useState } from "react"
import { Dashboard } from "./pages/dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignPage } from "./pages/signinup"


function App() {
  // const token = localStorage.getItem("token");
  
  // useEffect(() => {
  //   const fetchTodos = async () => {
      
  //     try {
  //       const response = await axios.get("http://localhost:3000/todos", {
  //         headers: {
  //           token: token
  //         },
  //       });
  //       setTodos(response.data.todos);
  //     } catch (error) {
  //       console.error("Error fetching todos:", error);
  //     }
  //   };
  //   if(isSignIn)
  //     fetchTodos();
  // }, []);

  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignPage initialPage={"signup"} />}/>
      <Route path="/signup" element={<SignPage  initialPage={"signin"}/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
   
  
      
}

export default App
