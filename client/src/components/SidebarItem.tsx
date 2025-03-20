import { ReactElement } from "react"

export interface SidebarItemProps {
  icon : ReactElement;
  title : string
  onClick? : () => void
}

const defaultStyle : string = "flex gap-5  m-2 items-center text-2xl hover:bg-red-200 cursor-pointer rounded-2xl p-2 ease-in-out transition-all duration-150 items-center";

const iconStyle: Record<string, string> = {
  home : "text-gray-500 group-hover:text-blue-600 ease-in-out transition-all duration-150",
  YouTube: "text-gray-500 group-hover:text-red-700 ease-in-out transition-all duration-150",
  Twitter: "text-gray-500 group-hover:text-blue-600 ease-in-out transition-all ",
  Documents: "text-gray-500 group-hover:text-blue-600 ease-in-out transition-all ",
  About: "text-gray-500 group-hover:text-blue-600 ease-in-out transition-all ",
  Bookmark: "text-gray-500 group-hover:text-blue-600 ease-in-out transition-all ",
  Dashboard: " text-gray-500 group-hover:text-blue-600 ease-in-out transition-all ",
};

export function SidebarItem(props : SidebarItemProps){
  return <div className={`${defaultStyle} group`} >
    <div className={`${iconStyle[props.title]}`}>
      {props.icon}
    </div>
    <div>
      {props.title}
    </div>
  </div>
}