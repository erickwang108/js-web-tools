function isNumber(input) {
  return !isNaN(parseInt(input, 10)) && !isNaN(Number(input));
}

export function indexOfMinOrMax(arr = [], type = 'min') {
  if (arr.length === 0) {
    return -1;
  }

  let tmpVal = arr[0];
  let targetIndex = 0;

  arr.forEach((num, index) => {
    if (type === 'min') {
      if (num < tmpVal) {
        targetIndex = index;
        tmpVal = num;
      }
    } else {
      if (num > tmpVal) {
        targetIndex = index;
        tmpVal = num;
      }
    }
  });

  return targetIndex;
}

function sumTotal(list) {
  return list.reduce((val, num) => {
    val += Number(num);

    return val;
  }, 0);
}

function convertToFactors(list) {
  const total = sumTotal(list);

  return list.map(l => l / total);
}

function round(number, places) {
  const multiplier = Math.pow(10, places);

  return Math.round(number * multiplier) / multiplier;
}

function roundEach(list, places) {
  return list.map(num => round(num, places));
}

export default function balancer(data = [], goal = 100, places = 10) {
  if (data.length === 0) {
    return [];
  }

  const list = data.filter(num => isNumber(num));
  const outList = roundEach(list, places);
  const factors = convertToFactors(list);

  goal = round(goal, places);

  let sum = round(sumTotal(outList), places);
  let oldDiff = null;

  while (goal !== sum) {
    const diff = goal - sum;

    if (oldDiff == diff) {
      const idx = (diff > 0) ? indexOfMinOrMax(factors, 'max') : indexOfMinOrMax(factors);
      outList[idx] += round(diff, places);
    } else {
      for (let i = 0; i < factors.length; i += 1) {
        outList[i] += round(diff * factors[i], places);
      }
    }

    sum = round(sumTotal(outList), places);
    oldDiff = diff;
  }

  return roundEach(outList, places);
}
