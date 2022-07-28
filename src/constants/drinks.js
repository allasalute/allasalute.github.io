import pint_a from "assets/images/drinks/beer2.svg";
import wine_175ml from "assets/images/drinks/wine-250ml.svg";
import spirit_double from "assets/images/drinks/spirit-double.svg";
import pimms from "assets/images/drinks/single-aperitifs.svg";

export const drinksList = [
  {
    id: "lowStrengthPint",
    image: pint_a,
    container: "Pint",
    ml: 330,
    abv: 4.5,
    units: 1,
    kcal: 74
  },
  {
    id: "regularWine",
    image: wine_175ml,
    container: "Standard glass",
    ml: 125,
    abv: 12,
    units: 1,
    kcal: 83
  },
  {
    id: "pimms",
    image: pimms,
    container: "Glass",
    ml: 80,
    abv: 18,
    units: 1,
    kcal: 80
  },
  {
    id: "doubleSprit",
    image: spirit_double,
    container: "Glass",
    ml: 40,
    abv: 40,
    units: 1,
    kcal: 88
  }
];
