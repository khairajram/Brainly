import { ShareIcon } from "../icons/ShareIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
  return <div className="bg-white h-screen w-64 border-r-gray-500 border-r-2 fixed top-0 left-0">
    <div className="ml-2.5 mt-16">
      <SidebarItem icon={<ShareIcon size="md" />} title="home"/>
      <SidebarItem icon={<ShareIcon size="md" />} title="home"/>
      <SidebarItem icon={<ShareIcon size="md" />} title="home"/>
    </div>
  </div>
}