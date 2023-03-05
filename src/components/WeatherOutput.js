import PropTypes from "prop-types";
import '../App.css';

const WeatherOutput = ({weatherData, time}) => {
    if (weatherData.main === undefined)
        return <div>Waiting for data...</div>
    
    return(
        <div>
            <div className="card">
                <p className="location">{weatherData.name}</p>
                <p>Temperature: {weatherData.main.temp}&deg;C</p>
                <p>Windspeed: {weatherData.wind.speed} m/s</p>
                <p>Wind direction: {weatherData.wind.deg}&deg;</p>
                <p>Cloud coverage: {weatherData.clouds.all}%</p>
            </div>
            <p>Retrieved at: {time}</p>
        </div>
    )
}

WeatherOutput.propTypes = {
    weatherData: PropTypes.object,
    time: PropTypes.string
}

export default WeatherOutput;
