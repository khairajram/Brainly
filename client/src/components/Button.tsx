import { ReactElement } from "react";

export interface ButtonProps {
  variant : "primary" | "secondary";
  size : "sm" | "md" | "lg";
  text? : string;
  text2? : string;
  startIcon? : ReactElement;
  endIcon? : ReactElement;
  loading? : boolean
  onClick? : () => void
}

const variantStyle = {
  "primary" : "bg-[#5046e4] text-white",
  "secondary" : "bg-[#e0e7ff] text-[#473eba]",
}

const sizeStyle = {
  "sm" : "py-1 px-2 text-sm",
  "md" : "py-2 px-4 text-md",
  "lg" : "py-4 px-6 text-lg",
}

const defaultStyles = "rounded-lg flex items-center cursor-pointer justify-center"


export const Button = (props : ButtonProps) => {
  return (
    <button className={`${variantStyle[props.variant]} ${sizeStyle[props.size]} ${defaultStyles} ${props.loading ? "disabled cursor-not-allowed opacity-50" : ""}`} onClick={props.onClick} >
     
      {props.startIcon && <span className={`${props.text ? "mr-2" : "" }`}>{props.startIcon}</span>} 
      {props.loading ? props.text2 : props.text}
      {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
      
      
    </button>
  )
}



