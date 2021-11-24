const InfoBoxA = ({data}) => {
    return (
        <div>
            <h3>Longest downtrend</h3>

            <span>Longest downtrend was {data["maxStreak"]} days</span>
        </div>
    )
}

export default InfoBoxA
