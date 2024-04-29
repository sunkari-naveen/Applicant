import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Profiles from './components/Profiles';

function App() {

  return (
    <>
     <Header/>
     <div className='main'>
      <Profiles/>
     </div>
    </>
  )
}

export default App
