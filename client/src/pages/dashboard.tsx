import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModel } from "../components/CreateContentModel"
import { YoutubeIcon } from "../icons/youtube"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { TwitterIcon } from "../icons/twitter"


export function Dashboard(){
  const [open,setOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 p-4 sm:ml-64 bg-[#f9fbfc]  min-h-screen ease-in-out transition-all duration-75">
        <CreateContentModel open={open} onClose={() => {
          setOpen(false)
        }}/>
        <div className="flex justify-end gap-2 fixed top-0 right-0 p-2">
          <Button variant={"secondary"} size={"md"} text={"Share Brain"} startIcon={<ShareIcon size={"md"}/>} onClick={() => {}} />
          <Button variant={"primary"} size={"md"} text={"Add Content"} startIcon={<PlusIcon size={"md"}/>} onClick={() => {
            setOpen(true);
          }} />
        </div>
        <div className="items-center flex justify-center  h-screen gap-2">
          <Card mainIcon={<TwitterIcon/>} title={"future Project"} contentTypes={"twitt"} link={"https://x.com/Khairaj_07/status/1837845387920789903"} />
          <Card mainIcon={<YoutubeIcon/>} title={"future Project"} contentTypes={"youtube-video"} link={"https://www.youtube.com/watch?v=c6yE_cVHN6U"} />
        </div>
      </div>
    </div>
  )
}