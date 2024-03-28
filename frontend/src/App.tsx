
import './App.css'
import CreateRide from './components/CreateRide'
import Home from './components/Home'
import styles from "./index.css"
function App() {


  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <CreateRide />
        {/* <Home /> */}
      </div>
    </>
  )
}

export default App
