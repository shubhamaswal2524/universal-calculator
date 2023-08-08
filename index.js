// 1 = both valid controllable numbers
// 2 = num1 is e and num 2 is normal
// 3 = num1 is normal and num2 is e
// 4 = both are decimal but not e
// 5 = num1 is decimal and num2 is normal
// 6 = num1 is normal and num2 is decimal
// 7 = num1 is e and num2 is decimal
// 8 = num1 is decimal and num2 is e
// 9 = both are e
// 10 = invalid number
// 50 - num1 is not a number
// 51 - num2 is not a number
// 52 - num1 and num2 are not a number

const toCustomFixed = (num, fixed) => {
  const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
};

function isNegative(num) {
  if (Math.sign(num) === -1) {
    return true;
  }
  return false;
}

import { toCustomFixed } from "./helper";

const checkNumberTypes = (newNum1, newNum2) => {
  if (isNaN(newNum1)) return 50;
  else if (isNaN(newNum2)) return 51;
  else if (isNaN(newNum1) && isNaN(newNum2)) return 52;
  else if (
    newNum1?.includes(".") &&
    !newNum1?.includes("e") &&
    newNum2?.includes(".") &&
    !newNum2?.includes("e")
  )
    return 4;
  else if (
    newNum1?.includes(".") &&
    !newNum1?.includes("e") &&
    !newNum2?.includes(".") &&
    !newNum2?.includes("e")
  )
    return 5;
  else if (
    !newNum1?.includes(".") &&
    !newNum1?.includes("e") &&
    !newNum2?.includes("e") &&
    newNum2?.includes(".")
  )
    return 6;
  else if (
    !newNum1?.includes(".") &&
    !newNum1?.includes("e") &&
    !newNum2?.includes("e") &&
    !newNum2?.includes(".")
  )
    return 1;
  else if (
    newNum1?.includes("e") &&
    !newNum2?.includes("e") &&
    !newNum2?.includes(".")
  )
    return 2;
  else if (
    !newNum1?.includes(".") &&
    !newNum1?.includes("e") &&
    newNum2?.includes("e")
  )
    return 3;
  else if (
    newNum1?.includes("e") &&
    newNum2?.includes(".") &&
    !newNum2?.includes("e")
  )
    return 7;
  else if (
    newNum1?.includes(".") &&
    !newNum1?.includes("e") &&
    newNum2?.includes("e")
  )
    return 8;
  // ============>>>>>>>
  else if (newNum1?.includes("e") && newNum2?.includes("e")) return 9;
  else return 10;
};

const decimalAndECalculation = (newNum1, newNum2) => {
  let splittedEValue;
  let baseValueMultiplication;
  let eDecimals;
  let isENegative;
  let newDecimals1;
  let weiValue;

  if (newNum1?.includes("+")) splittedEValue = newNum1.split("e+");
  else if (newNum1?.includes("-")) {
    splittedEValue = newNum1.split("e-");
    isENegative = true;
  } else if (!newNum1?.includes("+") && !newNum1?.includes("-")) {
    splittedEValue = newNum1.split("e");
  }

  if (splittedEValue[0]?.includes(".")) {
    baseValueMultiplication = multiplicationLogic(
      splittedEValue[0]?.replace(".", ""),
      newNum2,
      0,
      0,
      0
    );

    eDecimals = splittedEValue[0]?.length - splittedEValue[0]?.indexOf(".") - 1;
    if (eDecimals <= splittedEValue[1]) {
      weiValue = isENegative
        ? "1"
        : "1".padEnd(splittedEValue[1] - eDecimals + 1, "0");
      newDecimals1 = isENegative
        ? Number(splittedEValue[1]) + Number(eDecimals)
        : 0;
    } else {
      weiValue = "1";
      newDecimals1 = isENegative
        ? Number(eDecimals) + Number(splittedEValue[1])
        : eDecimals - splittedEValue[1];
    }
    newDecimals1 = isENegative ? -newDecimals1 : newDecimals1;
  } else {
    baseValueMultiplication = multiplicationLogic(
      splittedEValue[0],
      newNum2,
      0,
      0,
      0
    );

    if (isENegative) {
      weiValue = "1";
      newDecimals1 = Number(splittedEValue[1]);
      newDecimals1 = -newDecimals1;
    } else {
      weiValue = "1".padEnd(Number(splittedEValue[1]) + 1, "0");
    }
  }

  return {
    nume1: baseValueMultiplication,
    nume2: weiValue,
    decimals1: newDecimals1,
    decimals2: 0,
  };
};

const scientificCheck = (newNum1, newNum2, type) => {
  let calculatedOutput = {};
  let firstEValueCalculated;
  let secondValuecalculated;
  let decimalLength;
  if (type == 2) {
    calculatedOutput = decimalAndECalculation(newNum1, newNum2);
  } else if (type == 3) {
    calculatedOutput = decimalAndECalculation(newNum2, newNum1);
  } else if (type == 9) {
    firstEValueCalculated = decimalAndECalculation(newNum1, "1");
    secondValuecalculated = decimalAndECalculation(newNum2, "1");

    calculatedOutput.nume1 = multiplicationLogic(
      firstEValueCalculated?.nume1,
      secondValuecalculated?.nume1,
      0,
      0,
      0
    );
    calculatedOutput.nume2 = multiplicationLogic(
      firstEValueCalculated?.nume2,
      secondValuecalculated?.nume2,
      0,
      0,
      0
    );
    let deci1 = Number(firstEValueCalculated?.decimals1)
      ? Number(firstEValueCalculated?.decimals1)
      : 0;

    let deci2 = Number(secondValuecalculated?.decimals1)
      ? Number(secondValuecalculated?.decimals1)
      : 0;
    calculatedOutput.decimals1 = deci1 + deci2;
  } else if (type == 7) {
    let removedDecimalValue = newNum2?.replace(".", "");
    calculatedOutput = decimalAndECalculation(newNum1, removedDecimalValue);
    decimalLength = newNum2?.length - newNum2?.indexOf(".") - 1;
    calculatedOutput.decimals1 =
      Number(calculatedOutput.decimals1) + Number(decimalLength);
  } else if (type == 8) {
    let removedDecimalValue = newNum1?.replace(".", "");
    calculatedOutput = decimalAndECalculation(newNum2, removedDecimalValue);
    decimalLength = newNum1?.length - newNum1?.indexOf(".") - 1;
    calculatedOutput.decimals1 =
      Number(calculatedOutput.decimals1) + Number(decimalLength);
  }

  return {
    nume1: calculatedOutput?.nume1,
    nume2: calculatedOutput?.nume2,
    decimals1: calculatedOutput?.decimals1,
    decimals2: calculatedOutput?.decimals2,
  };
};

const validateNumbers = (val1, val2) => {
  let newNum1 = val1?.toString();
  let newNum2 = val2?.toString();
  let length1 = newNum1?.length;
  let length2 = newNum2?.length;

  const validType = checkNumberTypes(newNum1, newNum2);

  switch (validType) {
    case 1:
      return {
        num1: newNum1,
        num2: newNum2,
        decimals1: 0,
        decimals2: 0,
      };
    case 10:
    case 50:
    case 51:
    case 52:
      return {
        num1: 0,
        num2: 0,
        decimals1: 0,
        decimals2: 0,
      };

    case 2:
      let case2 = scientificCheck(newNum1, newNum2, 2);
      return {
        num1: case2?.nume1,
        num2: case2?.nume2,
        decimals1: case2?.decimals1,
        decimals2: 0,
      };
    case 3:
      let case3 = scientificCheck(newNum1, newNum2, 3);
      return {
        num1: case3?.nume1,
        num2: case3?.nume2,
        decimals1: case3?.decimals1,
        decimals2: 0,
      };

    case 4:
      return {
        num1: newNum1.replace(".", ""),
        num2: newNum2.replace(".", ""),
        decimals1: newNum1?.length - newNum1?.indexOf(".") - 1,
        decimals2: newNum2?.length - newNum2?.indexOf(".") - 1,
      };
    case 5:
      return {
        num1: newNum1.replace(".", ""),
        num2: newNum2,
        decimals1: newNum1?.length - newNum1?.indexOf(".") - 1,
        decimals2: 0,
      };
    case 6:
      return {
        num1: newNum1,
        num2: newNum2.replace(".", ""),
        decimals1: 0,
        decimals2: newNum2?.length - newNum2?.indexOf(".") - 1,
      };
    case 7:
      let case7 = scientificCheck(newNum1, newNum2, 7);
      return {
        num1: case7?.nume1,
        num2: case7?.nume2,
        decimals1: case7?.decimals1,
        decimals2: 0,
      };
    case 8:
      let case8 = scientificCheck(newNum1, newNum2, 8);
      return {
        num1: case8?.nume1,
        num2: case8?.nume2,
        decimals1: case8?.decimals1,
        decimals2: 0,
      };
    case 9:
      let case9 = scientificCheck(newNum1, newNum2, 9);
      return {
        num1: case9?.nume1,
        num2: case9?.nume2,
        decimals1: case9?.decimals1,
        decimals2: 0,
      };
  }
};

const multiplicationLogic = (num1, num2, decimals1, decimals2, isNegative) => {
  let len2;
  let len1;
  len1 = num1?.length;
  len2 = num2?.length;
  if (!len1 || !len2) return 0;
  if (len1 == 0 || len2 == 0) return "0";

  // will keep the result number in vector
  // in reverse order
  let result = new Array(len1 + len2).fill(0);

  // Below two indexes are used to
  // find positions in result.
  let i_n1 = 0;
  let i_n2 = 0;

  // Go from right to left in num1
  for (var i = len1 - 1; i > -1; i--) {
    let carry = 0;
    let n1 = num1[i].charCodeAt(0) - 48;

    // To shift position to left after every
    // multiplication of a digit in num2
    i_n2 = 0;

    // Go from right to left in num2
    for (var j = len2 - 1; j > -1; j--) {
      // Take current digit of second number
      let n2 = num2[j].charCodeAt(0) - 48;

      // Multiply with current digit of first number
      // and add result to previously stored result
      // at current position.
      let summ = n1 * n2 + result[i_n1 + i_n2] + carry;

      // Carry for next iteration
      carry = Math.floor(summ / 10);

      // Store result
      result[i_n1 + i_n2] = summ % 10;

      i_n2 += 1;
    }

    // store carry in next cell
    if (carry > 0) result[i_n1 + i_n2] += carry;

    // To shift position to left after every
    // multiplication of a digit in num1.
    i_n1 += 1;

    // print(result)
  }
  // ignore '0's from the right
  i = result.length - 1;
  while (i >= 0 && result[i] == 0) i -= 1;

  // If all were '0's - means either both or
  // one of num1 or num2 were '0'
  if (i == -1) return "0";

  // generate the result string
  let s = "";
  while (i >= 0) {
    s += String.fromCharCode(result[i] + 48);
    i -= 1;
  }
  if (decimals1 || decimals2) {
    let finalDecimal = Number(decimals1) + Number(decimals2);

    if (finalDecimal < 0) {
      finalDecimal = finalDecimal < 0 ? -finalDecimal : finalDecimal;
      if (finalDecimal < s.length) {
        s =
          s.slice(0, s.length - finalDecimal) +
          "." +
          s.slice(s.length - finalDecimal, s.length);
      } else if (finalDecimal == s.length) {
        s = "0" + "." + s;
      } else {
        s = "0" + "." + "0".padStart(finalDecimal - s.length, "0") + s;
      }
    } else {
      s =
        s.slice(0, s.length - finalDecimal) +
        "." +
        s.slice(s.length - finalDecimal, s.length);
    }
  }

  if (s?.includes(".")) {
    if (Number(s?.split(".")[1]) == 0) {
      s = s?.split(".")[0];
    }
  }
  if (s?.includes(".") && Number(s?.split(".")[1]) == 0) {
    s = toCustomFixed(s, 2);
  }

  if (isNegative == 1) {
    s = "-" + s;
  }
  return s;
};

export function multiplier(val1, val2) {
  if (typeof val1 != "string" || typeof val2 != "string") {
    return {
      input: "invalid , expected numbers as string !",
      output: 0,
    };
  }
  let newVal1 = val1;
  let newVal2 = val2;
  let isNegative;
  if (newVal1?.includes("-") && !newVal2?.includes("-")) {
    isNegative = 1;
    val1 = val1?.split("-")[1];
  }
  if (!newVal1?.includes("-") && newVal2?.includes("-")) {
    val2 = val2?.split("-")[1];
    isNegative = 1;
  }
  if (newVal1?.includes("-") && newVal2?.includes("-")) {
    isNegative = 0;
    val1 = val1?.split("-")[1];
    val2 = val2?.split("-")[1];
  }
  if (!newVal1?.includes("-") && !newVal2?.includes("-")) isNegative = 0;

  const { num1, num2, decimals1, decimals2 } = validateNumbers(val1, val2);

  return {
    input: "valid",
    output: multiplicationLogic(num1, num2, decimals1, decimals2, isNegative),
  };
}

module.exports = { multiplier };
