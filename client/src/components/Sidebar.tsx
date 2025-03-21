import { AboutIcon } from "../icons/AboutIcon";
import { BookmarkIcon } from "../icons/bookmarkIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { GithubIcon } from "../icons/gitHub";
import { HomeIcon } from "../icons/HomeIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { TwitterIcon } from "../icons/twitter";
import { YoutubeIcon } from "../icons/youtube";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
  return <div className="bg-white h-screen   w-56 border-r-gray-500 border-r-2 fixed top-16 -left-64
 sm:left-0  ease-in-out transition-all duration-700">
    <div>
      <div className="ml-2.5 mt-4 gap-0.5">
        <SidebarItem icon={<HomeIcon/>} title="home"/>
        <SidebarItem icon={<DocumentIcon/>} title="Dashboard"/>
        <SidebarItem icon={<YoutubeIcon/>} title="YouTube"/>
        <SidebarItem icon={<TwitterIcon/>} title="Twitter"/>
        <SidebarItem icon={<DocumentIcon/>} title="Documents"/>
        <SidebarItem icon={<BookmarkIcon/>} title="Bookmark"/>
        <SidebarItem icon={<AboutIcon/>} title="About"/>
      </div>
      <div className="left-20 top-100 static flex justify-center">
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
  </div>
}