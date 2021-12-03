import PropTypes from "prop-types"

const Description = ({text}) => {
    return (
        <div className="description">
            {text}
        </div>
    )
}

Description.propTypes = {
    text: PropTypes.string,
}

Description.defaultProps = {
    text: "Pass description as a prop!",
}

export default Description
