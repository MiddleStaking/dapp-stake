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
    strInput = strInput.replace(',', '.');

    if (
      strInput.length > 1 &&
      strInput[1] !== '.' &&
      (strInput[0] === '0' || (strInput[0] === '-' && strInput[1] === '0'))
    ) {
      strInput =
        strInput.startsWith('-0') && strInput.length > 2
          ? '-' + strInput.slice(2)
          : strInput.slice(1);
    }

    const parts = strInput.split('.');
    if (parts.length === 2 && parts[1].length > decimal) {
      strInput = parts[0] + '.' + parts[1].substring(0, decimal);
    }
    if (decimal === 0 && strInput.includes('.')) {
      strInput = strInput.slice(0, -1);
    }
    return strInput;
  }

  return strInput;
};

export default inputNumbers;
