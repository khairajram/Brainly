import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/twitter";
import { Youtube } from "../icons/youtube";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
  return <div className="bg-white h-screen w-64 border-r-gray-500 border-r-2 fixed top-0 left-0">
    <div className="ml-2.5 mt-16">
      <SidebarItem icon={<ShareIcon size="md" />} title="home"/>
      <SidebarItem icon={<Youtube/>} title="youTube"/>
      <SidebarItem icon={<TwitterIcon/>} title="twitter"/>
    </div>
  </div>
}