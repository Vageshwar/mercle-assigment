import { useState } from 'react'
import Header from './components/Header';
import './App.css'
import { profile } from './utils/validations.constants';
import SplineChart from './components/SplineChart';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Header author={profile.name} link={profile.link} />
      <SplineChart />
    </div>
  )
}

export default App
