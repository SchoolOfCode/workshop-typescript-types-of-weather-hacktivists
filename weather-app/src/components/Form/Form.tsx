import { useState } from "react";

interface FormProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}


export default function Form: React.FC<FormProps> ({city, setCity, setWeatherData }) {

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
    console.log(conditions);
    console.log(weatherData)
  }
  
  return (
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
  )
}

