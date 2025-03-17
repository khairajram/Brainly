import { useState } from "react"
import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { CreateContentModel } from "./components/CreateContentModel"
import { YoutubeIcon } from "./icons/YoutubeIcon"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  const [open,setOpen] = useState(false)

  return (
    <>
    <div className="p-4">
      <CreateContentModel open={open} onClose={() => {
        setOpen(false)
      }}/>
      <div className="flex justify-end gap-2">
        <Button variant={"secondary"} size={"md"} text={"Share Brain"} startIcon={<ShareIcon size={"md"}/>} onClick={() => {}} />
        <Button variant={"primary"} size={"md"} text={"Add Content"} startIcon={<PlusIcon size={"md"}/>} onClick={() => {
          setOpen(true);
        }} />
      </div>
      <div className="items-center flex  justify-center bg-[#f9fbfc] h-screen gap-2">
        
        <Card mainIcon={<YoutubeIcon/>} title={"future Project"} contentTypes={"twitt"} link={"https://x.com/Khairaj_07/status/1837845387920789903"} />

        <Card mainIcon={<YoutubeIcon/>} title={"future Project"} contentTypes={"youtube-video"} link={"https://www.youtube.com/watch?v=c6yE_cVHN6U"} />
      </div>
      <YoutubeIcon/>
    </div>
    </>
  )
}

export default App
