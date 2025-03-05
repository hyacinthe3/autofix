import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './Components/Layout';
import Inde from './Components/inde'
import Footer from './Components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
