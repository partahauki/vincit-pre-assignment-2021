const InfoBoxB = ({data}) => {
    return (
        <div>
            <h3>Highest trading volume</h3>

            <span>Highest volume was {data["maxVolume"].toFixed(2)} € on {data["date"]}</span>
        </div>
    )
}

export default InfoBoxB
