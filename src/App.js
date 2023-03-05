import logo from './weathericon.png';
import './App.css';
import { useState, useEffect } from 'react';
import WeatherOutput from './components/WeatherOutput'
import Button from './components/Button'

function App() {

  const [sendRequest, setSendRequest] = useState(true)
  const [responseData, setResponseData] = useState({})
  const [responseTime, setResponseTime] = useState('')

  async function fetchWeatherData() {
    fetch(`${process.env.REACT_APP_API_URL}/weather?q=coquitlam&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(res => res.json())
      .then(result => {
        setResponseData(result)
        console.log(result)
        formatAndUpdateTime(result.dt)
      }).catch(err => {
        console.log(err);
      });
  }

  const formatAndUpdateTime = (utxTime) => {
    const time = new Date(utxTime).toString().substring(0,25)
    setResponseTime(time)
  }

  const changeSendRequest = () => {
    setSendRequest(!sendRequest)
  }

  const executeFetchWeatherData = () => {
    if(sendRequest === true) {
      fetchWeatherData()
    }
  }

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <Button onButtonClick={() => changeSendRequest()} sendRequest={sendRequest}/>
        <WeatherOutput weatherData={responseData} time={responseTime}/>
      </header>
    </div>
  );
}

export default App;
