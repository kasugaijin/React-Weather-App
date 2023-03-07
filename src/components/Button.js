import PropTypes from "prop-types";
import '../App.css';

// play and pause icons from freeicon.com

const Button = ({sendRequest, onButtonClick}) => {
    return (
        <button
         className={sendRequest? "pause-button button" : "play-button button" }
         onClick={onButtonClick}>
        </button>
    )
}

// shows warning in console if prop types are incorrect
Button.propTypes = {
    sendRequest: PropTypes.bool,
    onButtonClick: PropTypes.func
}

export default Button;