function generateOtp(length) {
  let otp = '';
  length = length ? parseInt(length) : 4;
  for (let i = 0; i < length; i++) {
    const rnum = Math.floor(Math.random() * 10);
    otp += rnum;
  }
  return otp;
}

function generatePassword(length) {
  const otp1 = generateOtp(3);
  const otp2 = generateOtp(3);
  const password =
    parseFloat(otp1 + '' + new Date().getTime() + '' + Math.random()).toString(
      36
    ) +
    '' +
    otp2.toString(36);

  if (length) return password.slice(-parseInt(length));
  else return password;
}

module.exports = { generateOtp, generatePassword };
