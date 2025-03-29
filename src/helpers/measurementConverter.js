export const convertMeasurement = (type: string, value: number) => {
  const convertValueToNumber = Number(value);
  const convertCmToFeet = convertValueToNumber / 30.48; // Formula: divide the cm height value by 30.48
  const footRemainder = "0." + convertCmToFeet.toString().split(".")[1]; // take the remaining foot value
  const inchesTimesTwelve = parseFloat(footRemainder) * 12; // times by 12 because there are 12 inches in a foot
  const formattedValueInInches = Math.round(inchesTimesTwelve) < 12 ? Math.round(inchesTimesTwelve) : 0; // if there's less than 12 inches, round the remainder, else display 0.
  const formattedValueInFeet =
    Math.round(inchesTimesTwelve) < 12 ? Math.floor(convertCmToFeet) : Math.round(convertCmToFeet); // decide if to round up or round down the foot value

  const convertKgToLbs = convertValueToNumber * 2.205;
  const stone = convertKgToLbs / 14;
  const stoneRemainder = "0." + stone.toString().split(".")[1]; // take the remaining stone value
  const lbsTimesFourteen = parseFloat(stoneRemainder) * 14; // times by 14 because there are 14 pounds in a stone

  const formattedValueInLbs = Math.round(lbsTimesFourteen) < 14 ? lbsTimesFourteen.toFixed(1) : 0; // if there's less than 14 lbs, display the remainder, else display 0.
  const formattedValueInStone = Math.round(lbsTimesFourteen) < 14 ? Math.floor(stone) : Math.round(stone); // decide if to round up or round down the foot value

  switch (type) {
    case "ft":
      return formattedValueInFeet;
    case "cm":
      return Math.round(convertValueToNumber);
    case "inch":
      return formattedValueInInches;
    case "st":
      return formattedValueInStone;
    case "lbs":
      return formattedValueInLbs;
    case "kg":
      return Math.round(convertValueToNumber * 10) / 10;
    default:
      return 0;
  }
};
