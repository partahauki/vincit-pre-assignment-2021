const InfoBoxC = ({data}) => {
    return (
        <div>
            <h3>Time machine</h3>
            
            <span>Biggest differences in prices was {data["maxDifference"].toFixed(2)} €</span><br />
            <span>Buy on {data["buyDate"]} and sell on {data["sellDate"]}</span>
        </div>
    )
}

export default InfoBoxC
