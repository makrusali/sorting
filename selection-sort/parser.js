function isNumber(c) {
  return !isNaN(parseFloat(c));
}

function isComma(c) {
  return c === ',';
}

function isWhiteSpace(c) {
  return c === ' ';
}

function isDot(c) {
  return c == '.';
}

function isMin(c) {
  return c == '-';
}

function parse(input) {
  let token = [];
  let state = 0;
  const sizeInput = input.length;

  let numBuf = "";

  for (let i = 0; i < sizeInput; i++) {
    const c = input[i];

    switch (state) {
      case 0:
        //  5 25
        if (isNumber(c) || isDot(c) || isMin(c)) {
          numBuf += c;

          if (i == sizeInput - 1) {
            token.push(numBuf);
          }

          break;
        }
        if (isWhiteSpace(c) || isComma(c)) {
          token.push(numBuf);
          numBuf = "";
          state = 1;
          break;
        }

        console.log('invalid token ', c);
        break;
      case 1:
        if (isNumber(c) || isMin(c)) {
          numBuf += c;
          state = 0;

          if (i == sizeInput - 1) {
            token.push(numBuf);
          }

          break;
        }
        console.log('invalid token ', c);
        break;
      default:
        break;
    }
  }


  // parse to number
  token = token.map((v) => {
    return parseFloat(v);
  });

  return token;
}