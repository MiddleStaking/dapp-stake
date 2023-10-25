const inputNumbers = (number: number) => {
  console.log(number);
  const TabNumber = number.toString().split('');
  if (TabNumber[0] == '0' && !TabNumber.indexOf(',')) {
    return Number(TabNumber.shift()?.toString());
  } else if (number == 0) {
    return number;
  } else {
    return number;
  }
};
export default inputNumbers;
