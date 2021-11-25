const priceFormatting = (price) => {
    let priceParts = price.toFixed(2).toString().split("\.")
    priceParts[0] = parseInt(priceParts[0]).toLocaleString("fi-FI")
    priceParts = priceParts.join(".")
    
    return priceParts
}

const InfoBoxA = ({data}) => {  
    const print = () => {
        let return_ = []
        const streak = <span className="number">{data["maxStreak"]}</span>

        return_.push(<div>Longest downtrend was {streak} days</div>)

        return <>{return_}</>
    }

    return (
        <div className="infoBox">
            <h3>Longest downtrend</h3>
            {print()}
        </div>
    )
}

const InfoBoxB = ({data}) => {
    const print = () => {
        let return_ = []
        let volume = priceFormatting(data["maxVolume"])

        const volumeSpan = <span className="number">{volume} €</span>
        const dateSpan = <span className="date">{data["date"]}</span>

        return_.push(<div>Highest volume was {volumeSpan} on {dateSpan}</div>)

        return <>{return_}</>
    }
    
    return (
        <div className="infoBox">
            <h3>Highest trading volume</h3>
            {print()}
        </div>
    )
}

const InfoBoxC = ({data}) => {
    const print = () => {
        let return_ = []
        const differenceFormatted = priceFormatting(data["maxDifference"])
        const differenceSpan = <span className="number">{differenceFormatted} €</span>
        const buyDateSpan = <span className="date">{data["buyDate"]}</span>
        const sellDateSpan = <span className="date">{data["sellDate"]}</span>

        return_.push(<div>Biggest difference in prices was {differenceSpan}<br />
            Buy on {buyDateSpan} and sell on {sellDateSpan}</div>)

        return <>{return_}</>
    }
    
    return (
        <div className="infoBox">
            <h3>Time machine</h3>
            {print()}
        </div>
    )
}

export {
    InfoBoxA,
    InfoBoxB,
    InfoBoxC
}