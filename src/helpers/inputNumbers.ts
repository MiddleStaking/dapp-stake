const inputNumbers = (input: string, decimal: number): string => {
  let strInput = String(input);

  if (
    strInput === '0.' ||
    strInput === '0,' ||
    strInput === '-' ||
    strInput === '-0.'
  ) {
    if (strInput === '-') {
      strInput = '-0';
    }
    return strInput;
  }
  const isValidNumber = /^(?:(?:\d+[\.,]?\d*)|(?:[\.,]\d+))$/.test(strInput);

  if (isValidNumber) {
    if (
      strInput.length > 1 &&
      strInput[1] !== '.' &&
      strInput[1] !== ',' &&
      (strInput[0] === '0' || (strInput[0] === '-' && strInput[1] === '0'))
    ) {
      strInput =
        strInput.startsWith('-0') && strInput.length > 2
          ? strInput.replace('-0', '-')
          : strInput.replace('0', '');
    }
    return strInput.replace(',', '.');
  }
  return strInput;
};

export default inputNumbers;
