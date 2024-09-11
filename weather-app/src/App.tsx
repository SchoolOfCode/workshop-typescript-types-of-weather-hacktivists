import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  interface WeatherData {
    feels_like: number;
    grnd_level: number;
    humidity:   number;
    pressure:   number;
    sea_level:  number;
    temp:       number;
    temp_max:   number;
    temp_min:   number;
  }

const [city, setCity] = useState('');
const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setCity(e.target.value);
}

async function handleSubmit(e: React.FormEvent<HTMLElement>) {
  e.preventDefault();
  // take city and send it in a GET request to Openweather API
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7838f680b4e26dfad4a613789bdff46b&units=metric`)
  // store the section of the response we want in state
  const Jsonresponse = await response.json();
  setWeatherData(Jsonresponse.main);
  console.log(weatherData);
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
        <form className="fields" onSubmit={handleSubmit}>
          <label>
            <input type="text" value={city} onChange={handleChange}/>
          </label>
          <button type="submit">
            Fetch the Weather
          </button>
        </form>
      </section>
      <section>
        {weatherData ? (
        <div>
          <p>{weatherData.temp}</p>
          <p>{weatherData.humidity}</p>
        </div>
        ) : (<p>No data available</p>)
        }
      </section>
    </>
  )
}

export default App
