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

interface Conditions {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

interface Wind {
  speed: number;
  deg:   number;
}

const [city, setCity] = useState('');
const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
const [conditions, setConditions] = useState<Conditions | null>(null);
const [cityTitle, setCityTitle] = useState('');
const [windConditions, setWindConditions] = useState<Wind | null>(null)

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
  setConditions(Jsonresponse.weather[0]);
  setCityTitle(Jsonresponse.name);
  setWindConditions(Jsonresponse.wind);
  setCity('');
}

  return (
    <>
      <h1>Whatever the Weather</h1>
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
          <h2>The current weather in {cityTitle}</h2>
          <p>Current Temperature is: {weatherData.temp}degrees celcius</p>
          <p>The Humidty is: {weatherData.humidity}%</p>
          <p>It's blowing this hard: {windConditions?.speed} metric wind speed units</p>
          <p>The sky is full of: {conditions?.description}</p>
        </div>
        ) : (<p>Enter a city to grab the current weather</p>)
        }
      </section>
      <section>
        <h3>Built with:</h3>
        <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      </section>
    </>
  )
}

export default App
