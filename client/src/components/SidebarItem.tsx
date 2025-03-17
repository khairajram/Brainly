import { ReactElement } from "react"

export interface SidebarItemProps {
  icon : ReactElement;
  title : string
  onClick? : () => void
}



export function SidebarItem(props : SidebarItemProps){
  return <div className="flex gap-5  m-2 items-center text-2xl">
    <div>
      {props.icon}
    </div>
    <div>
      {props.title}
    </div>
  </div>
}