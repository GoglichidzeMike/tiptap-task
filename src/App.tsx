import './App.css'
import { Editor } from './components/Editor'
import { NavBar } from './components/NavBar'

function App() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <Editor />
    </div>
  )
}

export default App
