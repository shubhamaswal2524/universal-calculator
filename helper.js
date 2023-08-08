export const toCustomFixed = (num, fixed) => {
  const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
};

export function isNegative(num) {
  if (Math.sign(num) === -1) {
    return true;
  }
  return false;
}
