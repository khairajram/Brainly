import './App.css'
import { Button } from './components/ui/Button'

function App() {

  return (
    <>
      <Button variant="primary" size="md" text="dfs" onClick={() => {
        console.log("hell------")
      }} />
    </>
  )
}

export default App
