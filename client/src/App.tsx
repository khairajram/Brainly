import { useState } from "react"
import { Dashboard } from "./pages/dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignPage } from "./pages/signinup"
import { Header } from "./components/Header"


function App() {
  
  const [open,setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [logedIn,setLogin] = useState(!!token);

  
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
    <Header logedIn={logedIn} open={open} setOpen={setOpen}/>
    <Routes>
      <Route path="/signup" element={<SignPage/>}/>
      <Route path="/signin" element={<SignPage/>}/>
      <Route path="/dashboard" element={<Dashboard open={open} setOpen={setOpen}/>}/>
    </Routes>
  </BrowserRouter>
   
  
      
}

export default App
