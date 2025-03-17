import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { YoutubeIcon } from "./icons/Document"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {

  return (
    <>
    <div className="p-4">
      <div className="flex justify-end gap-2">
        <Button variant={"secondary"} size={"md"} text={"Share Brain"} startIcon={<ShareIcon size={"md"}/>} onClick={() => {}} />
        <Button variant={"primary"} size={"md"} text={"Add Content"} startIcon={<PlusIcon size={"md"}/>} onClick={() => {}} />
      </div>
      <div className="items-center flex  justify-center bg-[#f9fbfc] h-screen gap-2">
        
        <Card mainIcon={<YoutubeIcon/>} title={"future Project"} contentTypes={"twitt"} link={"https://x.com/mnyschdv/status/1901176612378603729"} />

        <Card mainIcon={<YoutubeIcon/>} title={"future Project"} contentTypes={"youtube-video"} link={"https://www.youtube.com/watch?v=c6yE_cVHN6U"} />
      </div>
    </div>
    </>
  )
}

export default App
