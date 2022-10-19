const lengthSlider = document.querySelector('.gen-pwd-length input'),
  options = document.querySelectorAll('.settings-option input'),
  copyIcon = document.querySelector('.gen-pwd-input span'),
  passwordInput = document.querySelector('.gen-pwd-input input'),
  passIndicator = document.querySelector('.gen-pwd-indicator'),
  generateBtn = document.querySelector('.gen-btn');

const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '^!$%&|[](){}:;.,*+-#@<>~',
};

const generatePassword = () => {
  let staticPassword = '',
    randomPassword = '',
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    // looping through each option's checkbox
    if (option.checked) {
      // if checkbox is checked
      // if checkbox id isn't exc-duplicate && spaces
      if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
        // adding particular key value from character object to staticPassword
        staticPassword += characters[option.id];
      } else if (option.id === 'spaces') {
        // if checkbox id is spaces
        staticPassword += `  ${staticPassword}  `; // adding space at the beginning & end of staticPassword
      } else {
        // else pass true value to excludeDuplicate
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    // getting random character from the static password
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      // if excludeDuplicate is true
      // if randomPassword doesn't contains the current random character or randomChar is equal
      // to space " " then add random character to randomPassword else decrement i by -1
      !randomPassword.includes(randomChar) || randomChar == ' '
        ? (randomPassword += randomChar)
        : i--;
    } else {
      // else add random character to randomPassword
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword; // passing randomPassword to passwordInput value
};

const upadatePassIndicator = () => {
  // if lengthSlider value is less than 8 then pass "weak" as passIndicator id else if lengthSlider
  // value is less than 16 then pass "medium" as id else pass "strong" as id
  passIndicator.id =
    lengthSlider.value <= 8
      ? 'weak'
      : lengthSlider.value <= 16
      ? 'medium'
      : 'strong';
};

const updateSlider = () => {
  // passing slider value as counter text
  document.querySelector('.gen-pwd-length span').innerText = lengthSlider.value;
  generatePassword();
  upadatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value); // copying random password
  copyIcon.innerText = 'check'; // changing copy icon to tick
  copyIcon.style.color = '#299b41';
  setTimeout(() => {
    // after 1500 ms, changing tick icon back to copy
    copyIcon.innerText = 'copy_all';
    copyIcon.style.color = '#707070';
  }, 1500);
};

copyIcon.addEventListener('click', copyPassword);
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);
