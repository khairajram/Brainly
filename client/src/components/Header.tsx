import { useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Header({logedIn,open,setOpen}){
  const [isSinging,setSignin] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100  top-0 left-0 fixed h-16 border-1 border-gray-500 w-screen flex items-center">
      <div>
        <div className="ml-6 font-extrabold text-blue-400 cursor-pointer text-2xl
        ">
          mindNest
        </div>

        {logedIn && <div className="flex justify-end gap-2 fixed top-0 right-0 p-2">
            <Button variant={"secondary"} size={"md"} text={"Share Brain"} startIcon={<ShareIcon size={"md"}/>} onClick={() => {}} />
            <Button variant={"primary"} size={"md"} text={"Add Content"} startIcon={<PlusIcon size={"md"}/>} onClick={() => {
              setOpen(true);
            }} />
        </div>}

        {!isSinging &&  !logedIn && <div className="flex justify-end gap-2 fixed top-0 right-0 p-2">
            <Button variant={"primary"} size={"md"} text={"SignUp"}  onClick={() => {
              navigate("/signup");
              setSignin(true);
            }} />
        </div>}

      </div>
        
    </div>
  )
}