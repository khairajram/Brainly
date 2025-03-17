import { Card } from "./components/Card"
import { YoutubeIcon } from "./icons/Document"

function App() {

  return (
    <>
    <div className="items-center flex justify-center bg-[#f9fbfc] h-screen">
      <Card mainIcon={<YoutubeIcon/>} title={"future Project"}/>
    </div>
    </>
  )
}

export default App
