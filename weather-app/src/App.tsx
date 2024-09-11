import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

const [city, setCity] = useState('');

// e: React.ChangeEvent<HTMLInputElement>

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setCity(e.target.value);
  console.log(city)
}

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Weather</h1>
      <section>
        <form className="fields">
          <label>
            <input type="text" value={city} onChange={handleChange}/>
          </label>
          <button type="submit">
            Fetch the Weather
          </button>
        </form>
      </section>
      <section>
        <p>clouds card</p>
      </section>
    </>
  )
}

export default App
