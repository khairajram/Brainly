// import { useState } from 'react'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Button startIcon={<PlusIcon size={"md"}/>} variant={'primary'} size={'md'} text={"create"} onClick={() => {console.log("hello is pressed")}}/>


      <Button startIcon={<ShareIcon size={"lg"}/>} variant={'secondary'} size={'lg'} text={"share"} onClick={() => {console.log("hello is pressed")}}/>


      <Button startIcon={<PlusIcon size={"sm"}/>} variant={'primary'} size={'sm'} text={"hello"} onClick={() => {console.log("hello is pressed")}}/>
    </>
  )
}

export default App
