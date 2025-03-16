// import { useState } from 'react'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Button startIcon={<PlusIcon size={"lg"}/>} variant={'primary'} size={'md'} text={"hello"} onClick={() => {console.log("hello is pressed")}}/>
      <Button variant={'secondary'} size={'lg'} text={"hello"} onClick={() => {console.log("hello is pressed")}}/>
      <Button variant={'primary'} size={'sm'} text={"hello"} onClick={() => {console.log("hello is pressed")}}/>
    </>
  )
}

export default App
