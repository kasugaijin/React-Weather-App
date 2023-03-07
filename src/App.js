import './App.css';
import { useState, useEffect } from 'react';
import WeatherOutput from './components/WeatherOutput'

function App() {

  const [sendRequest, setSendRequest] = useState(true)
  const [roundedTemp, setRoundedTemp] = useState(0)
  const [responseTime, setResponseTime] = useState('')

  // GET request to open weather API
  async function fetchWeatherData() {
    fetch(`${process.env.REACT_APP_API_URL}/weather?q=coquitlam&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(res => res.json())
      .then(result => {
        formatAndUpdateTime(result.dt)
        formatTemperature(result.main.temp)
      }).catch(err => {
        console.log(err);
      });
  }

  // format temp to one decimal
  const formatTemperature = (temp) => {
    const roundedTemp = Math.round(temp * 10) / 10
    setRoundedTemp(roundedTemp)
  }

  // Parse UTX time into yyyy/mm/dd hh:mm:ss
  const formatAndUpdateTime = (utxTime) => {
    const time = new Date(utxTime * 1000)

    const formattedTime =
      time.getFullYear() + "/" +
      ("00" + (time.getMonth() + 1)).slice(-2) + "/" +
      ("00" + time.getDate()).slice(-2) + " " +
      ("00" + time.getHours()).slice(-2) + ":" +
      ("00" + time.getMinutes()).slice(-2)    
    
    setResponseTime(formattedTime)
  }

  // Change boolean flag
  const changeSendRequest = () => {
    setSendRequest(!sendRequest)
  }

  // Checks flag and executes GET request if true
  const executeFetchWeatherData = () => {
    if(sendRequest) {
      fetchWeatherData()
    }
  }

  // executes desired functions on mount and sets interval for GET request
  // call api on mount before setInterval so data available right away
  useEffect(() => {
    executeFetchWeatherData()

    const interval = setInterval(() => {
      executeFetchWeatherData()
      }, 5000);
    return () => clearInterval(interval);
  }, [sendRequest]);


  return (
    <div className="App">
        <WeatherOutput 
          roundedTemp={roundedTemp} 
          dateTime={responseTime} 
          onButtonClick={() => changeSendRequest()} 
          sendRequest={sendRequest}
        />
    </div>
  );
}

export default App;
