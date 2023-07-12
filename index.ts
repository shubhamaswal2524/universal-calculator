//done 1 = both valid contollable numbers
//done 2 = num1 is e and num 2 is normal
//done 3 = num1 is normal and num2 is e
//done 4 = both are decimal but not e
//done 5 = num1 is decimal and num2 is normal
//done 6 = num1 is normal and num2 is decimal
//done 7 = num1 is e and num2 is decimal
//done 8 = num1 is decimal and num2 is e
//done 9 = both are e
//done 10 = invalid number
//done 50 - num1 is not a number
//done 51 - num2 is not a number
//done 52 - num1 and num2 are not a number

//done negative numbers

const toCustomFixed = (num: any, fixed: number) => {
  const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
};

function isNegative(num: any) {
  if (Math.sign(num) === -1) {
    return true;
  }

  return false;
}

const checkNumberTypes = (newNum1: any, newNum2: any) => {
  // let arr1: any = [];
  // let arr2: any = [];
  // for (let i = 0; i < newNum1?.length; i++) {
  //   if (!Number(newNum1[i])) arr1.push(newNum1[i]);
  // }
  // for (let i = 0; i < newNum2?.length; i++) {
  //   if (!Number(newNum2[i])) arr2.push(newNum2[i]);
  // }
  // console.log("first", arr1, arr2);
  //  need to add reverse condition
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

const decimalAndECalculation = (newNum1: any, newNum2: any) => {
  let splittedEValue: any;
  let baseValueMultiplication: any;
  let eDecimals: any;
  let isENegative: any;
  let newDecimals1: any;
  let weiValue: any;

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

      console.log("weiValue", weiValue, newDecimals1);
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

const scientificCheck = (newNum1: any, newNum2: any, type: any) => {
  let calculatedOutput: any = {};
  let firstEValueCalculated: any;
  let secondValuecalculated: any;
  let decimalLength: any;
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
  console.log(
    "secondValuecalculated",
    Number(firstEValueCalculated?.decimals1),
    Number(secondValuecalculated?.decimals1),
    newNum1,
    newNum2,
    firstEValueCalculated,
    secondValuecalculated
  );
  return {
    nume1: calculatedOutput?.nume1,
    nume2: calculatedOutput?.nume2,
    decimals1: calculatedOutput?.decimals1,
    decimals2: calculatedOutput?.decimals2,
  };
};

const validateNumbers = (val1: any, val2: any) => {
  let newNum1 = val1?.toString();
  let newNum2 = val2?.toString();
  let length1 = newNum1?.length;
  let length2 = newNum2?.length;

  const validType = checkNumberTypes(newNum1, newNum2);
  console.log("validType", val1, val2, validType);
  // const validType = checkNumberTypes(newNum1, newNum2);

  switch (validType) {
    case 1:
      return {
        num1: newNum1,
        num2: newNum2,
        decimals1: 0,
        decimals2: 0,
      };
    case 2:
      let case2: any = scientificCheck(newNum1, newNum2, 2);
      console.log("case2", case2);
      return {
        num1: case2?.nume1,
        num2: case2?.nume2,
        decimals1: case2?.decimals1,
        decimals2: 0,
      };
    case 3:
      let case3: any = scientificCheck(newNum1, newNum2, 3);
      console.log("case3", case3);
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
      let case7: any = scientificCheck(newNum1, newNum2, 7);
      console.log("case3", case7);
      return {
        num1: case7?.nume1,
        num2: case7?.nume2,
        decimals1: case7?.decimals1,
        decimals2: 0,
      };
    case 8:
      let case8: any = scientificCheck(newNum1, newNum2, 8);
      console.log("case3", case8);
      return {
        num1: case8?.nume1,
        num2: case8?.nume2,
        decimals1: case8?.decimals1,
        decimals2: 0,
      };
    case 9:
      let case9: any = scientificCheck(newNum1, newNum2, 9);
      console.log("case3", case9);
      return {
        num1: case9?.nume1,
        num2: case9?.nume2,
        decimals1: case9?.decimals1,
        decimals2: 0,
      };
  }
};

const multiplicationLogic = (
  num1: any,
  num2: any,
  decimals1: any,
  decimals2: any,
  isNegative: any
) => {
  let len2;
  let len1;
  len1 = num1?.length;
  len2 = num2?.length;
  console.log("validateNumbers", num1, num2, decimals1, decimals2);

  // if (num1?.toString().includes(".") && !num1?.toString().includes(".")) {
  //   newLen = num1?.toString()?.length - num1?.toString().indexOf(".") - 1;
  //   len2 = Number(num2?.toString().length) - Number(newLen);
  //   num1 = toCustomFixed(Number(num1) * 10 ** newLen, 0);
  //   console.log("first", num1, num2, len1, len2, newLen);
  //   num2 = num2?.toString().slice(0, len2);
  //   num1 = num1.toString();
  // } else if (
  //   !num1?.toString().includes(".") &&
  //   num2?.toString().includes(".")
  // ) {
  //   newLen = num2?.toString()?.length - num2?.toString().indexOf(".") - 1;
  //   len2 = Number(num1?.toString().length) - Number(newLen);
  //   num1 = toCustomFixed(Number(num1) * 10 ** newLen, 0);
  //   console.log("first", num1, num2, len1, len2, newLen);
  //   num2 = num2?.toString().slice(0, len2);
  //   num1 = num1.toString();
  // } else {
  //   len2 = num2.length;
  // }
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
    // let negativeDigits = s.length + finalDecimal;
    // negativeDigits = negativeDigits < 0 ? -negativeDigits : negativeDigits;
    if (finalDecimal < 0) {
      finalDecimal = finalDecimal < 0 ? -finalDecimal : finalDecimal;
      console.log("sadasd", s.length, finalDecimal, s);
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
    console.log("uhiuhiu", Number(s?.split(".")[1]));
    if (Number(s?.split(".")[1]) == 0) {
      s = s?.split(".")[0];
    }
  }
  console.log("firadadast", Number(s?.split(".")[1]));
  if (s?.includes(".") && Number(s?.split(".")[1]) == 0) {
    s = toCustomFixed(s, 2);
  }

  if (isNegative == 1) {
    s = "-" + s;
  }

  return s;
};

function multiply(val1: any, val2: any) {
  let newVal1: any = val1;
  let newVal2: any = val2;
  let isNegative: any;
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
  console.log("isNegative", val1, val2, isNegative);

  const { num1, num2, decimals1, decimals2 }: any = validateNumbers(val1, val2);

  return multiplicationLogic(num1, num2, decimals1, decimals2, isNegative);
}

module.exports = multiply;
