import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form/Form'

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

const [city, setCity] = useState('');
const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
const [conditions, setConditions] = useState<Conditions | null>(null);

// function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//   setCity(e.target.value);
// }

// async function handleSubmit(e: React.FormEvent<HTMLElement>) {
//   e.preventDefault();
//   // take city and send it in a GET request to Openweather API
//   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7838f680b4e26dfad4a613789bdff46b&units=metric`)
//   // store the section of the response we want in state
//   const Jsonresponse = await response.json();
//   setWeatherData(Jsonresponse.main);
//   setConditions(Jsonresponse.weather[0]);
//   console.log(conditions);
//   console.log(weatherData)
// }

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
      <Form city={city} setCity={setCity} setWeatherData={setWeatherData} />
      <section>
        {weatherData ? (
        <div>
          <p>Current Temperature is: {weatherData.temp}degrees celcius</p>
          <p>The Humidty is: {weatherData.humidity}%</p>
          <p>It's blowing this hard:  knots</p>
          <p>The sky is full of: {conditions?.description}</p>
        </div>
        ) : (<p>No data available</p>)
        }
      </section>
    </>
  )
}

export default App
