/**
 * This intake value was used to calculate the weelky unit intake but
 * according to ABOH the calculation is now the simpler version
 * that calculates ewacUk in the form submit function, this function
 * is translated from prototype to get the correct percentile only
 **/

const englandPercentileHashMap = new Map([
  [19, 0.07994],
  [20, 0.177704],
  [21, 0.285837],
  [22, 0.401743],
  [23, 0.524133],
  [24, 0.652243],
  [25, 0.785576],
  [26, 0.923792],
  [27, 1.066651],
  [28, 1.213985],
  [29, 1.365673],
  [30, 1.521635],
  [31, 1.681816],
  [32, 1.84619],
  [33, 2.014746],
  [34, 2.187493],
  [35, 2.364455],
  [36, 2.545667],
  [37, 2.731177],
  [38, 2.921045],
  [39, 3.115342],
  [40, 3.314147],
  [41, 3.517551],
  [42, 3.725655],
  [43, 3.938569],
  [44, 4.156414],
  [45, 4.379322],
  [46, 4.607434],
  [47, 4.840903],
  [48, 5.079895],
  [49, 5.324586],
  [50, 5.575168],
  [51, 5.831845],
  [52, 6.094835],
  [53, 6.364374],
  [54, 6.640714],
  [55, 6.924125],
  [56, 7.214899],
  [57, 7.513348],
  [58, 7.819807],
  [59, 8.134638],
  [60, 8.458231],
  [61, 8.791007],
  [62, 9.133422],
  [63, 9.485968],
  [64, 9.849179],
  [65, 10.223636],
  [66, 10.609973],
  [67, 11.00888],
  [68, 11.421112],
  [69, 11.847497],
  [70, 12.288948],
  [71, 12.74647],
  [72, 13.221175],
  [73, 13.714297],
  [74, 14.227213],
  [75, 14.761463],
  [76, 15.318775],
  [77, 15.901102],
  [78, 16.510656],
  [79, 17.149962],
  [80, 17.821917],
  [81, 18.529863],
  [82, 19.27769],
  [83, 20.069957],
  [84, 20.912055],
  [85, 21.810426],
  [86, 22.772846],
  [87, 23.808834],
  [88, 24.9302],
  [89, 26.151852],
  [90, 27.49298],
  [91, 28.978871],
  [92, 30.643795],
  [93, 32.535832],
  [94, 34.725456],
  [95, 37.322016],
  [96, 40.508877],
  [97, 44.630167],
  [98, 50.459496],
  [99, 60.469887],
  [100, 99999]
]);
const audit1HashMap = new Map([
  [0, 0],
  [1, 15],
  [2, 54],
  [3, 156.428571428571],
  [4, 260.714285714286],
  [5, 365]
]);
const audit2HashMap = new Map([
  [0, 3.5],
  [1, 5.5],
  [2, 8],
  [3, 11],
  [4, 12],
  [5, 15],
  [6, 18]
]);
const audit3HashMap = new Map([
  [0, 0.0],
  [1, 6.0],
  [2, 12.0],
  [3, 52.14286],
  [4, 338.9286]
]);

export const getIntakeValue = (audit1: number, audit2: number, audit3: number) => {
  let intake = 0;

  const audit1Value = audit1HashMap.get(audit1);
  const audit2Value = audit2HashMap.get(audit2);
  const audit3Value = audit3HashMap.get(audit3);

  if (typeof audit1Value !== "number" || typeof audit2Value !== "number" || typeof audit3Value !== "number") {
    return intake;
  }

  if (audit1Value > 0) {
    if (audit2 >= 2) {
      if (audit1Value >= audit3Value) {
        intake = (audit1Value * audit2Value) / 52.14;
      } else {
        intake = (audit3Value * audit2Value) / 52.14;
      }
    } else {
      if (audit1Value === audit3Value) {
        intake = (audit1Value * 8) / 52.14;
      } else {
        intake = (audit1Value * audit2Value + audit3Value * 8) / 52.14;
      }
    }
  }

  return intake;
};

/**
 * Get the percent of women who drink less alcohol
 **/
export const getEngPercentile = (audit1: number, audit2: number, audit3: number) => {
  const intake = getIntakeValue(audit1, audit2, audit3);
  let percentile = 0;

  englandPercentileHashMap.forEach((value, key) => {
    if (value > intake && percentile === 0) {
      percentile = key - 1;
    }
  });

  return percentile.toString();
};
