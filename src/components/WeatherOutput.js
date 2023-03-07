import PropTypes from "prop-types";
import '../App.css';
import Button from './Button';

const WeatherOutput = ({roundedTemp, dateTime, onButtonClick, sendRequest}) => {
    if (dateTime === '')
        return <div>Waiting for data...</div>
    
    return(
        <div>
            <div className="temp-container">
                <div className="temp-label">Temperature</div>
                <div className="temp-value">{roundedTemp}</div>
                <div className="temp-unit">&deg;C</div>
            </div>
            <div className="datetime-container">
                <div className="datetime-label">Last measured at</div>
                <div className="datetime-value">{dateTime}</div>
                <div>
                    <Button onButtonClick={onButtonClick} sendRequest={sendRequest}/>
                </div>
            </div>
        </div>
    )
}

// shows warning in console if prop types are incorrect
WeatherOutput.propTypes = {
    roundedTemp: PropTypes.number,
    dateTime: PropTypes.string
}

export default WeatherOutput;
