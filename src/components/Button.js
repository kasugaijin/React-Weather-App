import PropTypes from "prop-types";
import '../App.css';

const Button = ({sendRequest, onButtonClick}) => {
    return(
        <button className="button" onClick={onButtonClick}>
            {sendRequest? "Stop Requests" : "Start Requests"}
        </button>
    )
}

Button.propTypes = {
    sendRequest: PropTypes.bool,
    onButtonClick: PropTypes.func
}

export default Button;