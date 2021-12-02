const Header = ({ text }) => {
    return (
        <div className="header">
            <h1>{text}</h1>
        </div>
    )
}

Header.defaultProps = { text: "PASS HEADER AS A PROP!" }

export default Header
