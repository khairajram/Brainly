import { AboutIcon } from "../icons/AboutIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { GithubIcon } from "../icons/gitHub";
import { HomeIcon } from "../icons/HomeIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { TwitterIcon } from "../icons/twitter";
import { YoutubeIcon } from "../icons/youtube";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
  return <div className="bg-white h-screen w-64 border-r-gray-500 border-r-2 fixed top-0 left-0 sm:visible invisible ease-in-out transition-all duration-75">
    <div className="ml-2.5 mt-16">
      <SidebarItem icon={<HomeIcon/>} title="home"/>
      <SidebarItem icon={<YoutubeIcon/>} title="YouTube"/>
      <SidebarItem icon={<TwitterIcon/>} title="Twitter"/>
      <SidebarItem icon={<DocumentIcon/>} title="Documents"/>
      <SidebarItem icon={<AboutIcon/>} title="About"/>
    </div>
    <div className="left-20 bottom-10 fixed flex justify-center">
      <div className="flex justify-center  items-center gap-2" >
        <div>
          <GithubIcon/>
        </div>
        <div>
          <TwitterIcon/>
        </div>
        <div>
          <InstagramIcon/>
        </div>
      </div>
    </div>
      
  </div>
}