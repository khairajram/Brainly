import { ReactElement } from "react";

export interface ButtonProps {
  variant : "primary" | "secondary";
  size : "sm" | "md" | "lg";
  text : string;
  startIcon? : ReactElement;
  endIcon? : ReactElement;
  onClick : () => void
}

const variantStyle = {
  "primary" : "bg-black text-white",
  "secondary" : "bg-purple-300 text-purple-400",
}

const sizeStyle = {
  "sm" : "py-1 px-2 text-sm",
  "md" : "py-2 px-4 text-md",
  "lg" : "py-3 px-6 text-lg",
}


export const Button = (props : ButtonProps) => {
  return (
    <button className={`${variantStyle[props.variant]} ${sizeStyle[props.size]}`} onClick={props.onClick} >
      {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
    </button>
  )
}



