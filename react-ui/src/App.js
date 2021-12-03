import Header from "./components/Header"
import Description from "./components/Description"
import ContentContainer from "./components/ContentContainer"

const description = "View historical data of Bitcoin! Select date range you wish to inspect."

const App = () => {
    return (
        <div className="mainContainer">
            <Header text="Vincit Pre-Assignment" />
            <Description text={description} />
            <ContentContainer />
        </div>
    )
}

export default App
