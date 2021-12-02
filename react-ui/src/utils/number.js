// Rounds numbers to 2 decimals and adds spaces for bigger numbers
export const numberFormatting = (number) => {
    let numberParts = number.toFixed(2).toString().split(".")
    numberParts[0] = parseInt(numberParts[0]).toLocaleString("fi-FI")
    numberParts = numberParts.join(".")

    return numberParts
}
