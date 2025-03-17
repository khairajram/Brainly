import { ReactElement } from "react";
import { Button } from "./Button";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/deleteIcon";

export interface CardProps {
  mainIcon? : ReactElement;
  title : string;
  contentTypes? : "image" | "youtube-video" | "article" | "audio" | "twitt";
  link : string;
  date? : Date
}


export function Card(props : CardProps){
  return <div className="bg-white rounded-md 
  border-[#e6ebe9] border  max-w-72 p-2 gap-2">
      <div>
        <div className="flex justify-between  gap-4 m-2">
          <div className="flex items-center text-sm">
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
        
        <div className="m-3">
          {/* for youtube-video */}
          {props.contentTypes === "youtube-video" && <iframe className="w-full h-40 shadow-sm ring-1 ring-gray-300 shadow-gray-200 " src={`http://www.youtube.com/embed/${props.link.split("?v=")[1]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

          {/* for twitt */}
          {props.contentTypes === "twitt" && <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com","twitter.com")}></a> 
          </blockquote> }

        </div>
      </div>
  </div>
}