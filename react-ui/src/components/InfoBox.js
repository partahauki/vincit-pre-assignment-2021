//Rounds numbers to 2 decimals and adds spaces for bigger numbers
const numberFormatting = (number) => {
    let numberParts = number.toFixed(2).toString().split(".")
    numberParts[0] = parseInt(numberParts[0]).toLocaleString("fi-FI")
    numberParts = numberParts.join(".")
    
    return numberParts
}

const InfoBox = ({data, type}) => {
    const formatBox = (header, body, classExtend = "") => {
        return (
            <div className={"infoBox" + classExtend}>
                <h3>{header}</h3>
                <div>{body}</div>
            </div>
        )
    }

    const returnBox = () => {
        if (data["warning"]) { type = "warning" }
        
        switch (type) {
            case "downtrend": {
                const streak = <span className="number">{data["maxStreak"]}</span>

                const header = <>Longest downtrend</>
                const body = <>Longest downtrend was {streak} days</>
                return formatBox(header, body)
            }
            case "volume": {
                let volume = numberFormatting(data["maxVolume"])
                const volumeSpan = <span className="number">{volume} €</span>
                const dateSpan = <span className="date">{data["date"]}</span>

                const header = <>Highest trading volume</>
                const body = <>Highest volume was {volumeSpan} on {dateSpan}</>
                return formatBox(header, body)
            }
            case "time-machine": {
                const differenceFormatted = numberFormatting(data["maxDifference"])
                const differenceSpan = <span className="number">{differenceFormatted} €</span>
                const buyDateSpan = <span className="date">{data["buyDate"]}</span>
                const sellDateSpan = <span className="date">{data["sellDate"]}</span>

                const header = <>Time machine</>
                const body = <>Biggest difference in prices was {differenceSpan}<br />
                    Buy on {buyDateSpan} and sell on {sellDateSpan}</>
                return formatBox(header, body)
            }
            case "error": {
                const header = <>Error</>
                const body = <>Error while fetching data: <br /> {data["error"]}</>
                const classExtend = "Error"
                return formatBox(header, body, classExtend)
            }
            case "warning": {
                const header = <>Warning</>
                const body = <>Warning while fetching data: <br /> {data["warning"]}</>
                const classExtend = "Warning"
                return formatBox(header, body, classExtend)
            }
            default: {
                const header = <>Error</>
                const body = <>Something went wrong</>
                const classExtend = "Error"
                return formatBox(header, body, classExtend)
            }
        }
    }
    
    return (
        <>{returnBox()}</>
    )

}

export default InfoBox
