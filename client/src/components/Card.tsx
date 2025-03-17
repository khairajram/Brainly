import { ReactElement } from "react";
import { Button } from "./Button";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/deleteIcon";

export interface CardProps {
  mainIcon? : ReactElement;
  title : string;
  shareIcon? : ReactElement;
  deleteIcon? : ReactElement;
  date? : Date
}


export function Card(props : CardProps){
  return <div className="bg-white rounded-md 
  border-[#e6ebe9] border h-80 max-w-72">
      <div>
        <div className="flex justify-between  gap-4 m-2">
          <div className="flex items-center text-sm ">
            {props.mainIcon &&  <div className="text-gray-500 pr-1 items-center">{props.mainIcon}</div>}
            <div>
              {props.title}
            </div>
          </div>
          <div className="flex items-center  gap-1">
              <Button variant={"secondary"} size={"sm"} onClick={() => {}} startIcon={<ShareIcon/>}/>
              
              <Button variant={"secondary"} size={"sm"} onClick={() => {}} startIcon={<DeleteIcon/>}/>
              
          </div>
        </div>
      </div>
      
      <div className="items-center flex justify-center">hii there</div>
  </div>
}