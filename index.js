const pwdSlider = document.querySelector('.gen-pwd-length input'),
  pwdOptions = document.querySelectorAll('.settings-option input'),
  copyIcon = document.querySelector('.gen-pwd-input span'),
  pwdInput = document.querySelector('.gen-pwd-input input'),
  pwdIndicator = document.querySelector('.gen-pwd-indicator'),
  pwdGenBtn = document.querySelector('.gen-btn');

const characterList = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '^!$%&|[](){}:;.,*+-#@<>~',
};

const pwdGen = () => {
  let staticPwd = '',
    randomPwd = '',
    dupeExclude = false,
    pwdLenght = pwdSlider.value;

  pwdOptions.forEach((option) => {
    if (option.checked) {
      if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
        staticPwd += characterList[option.id];
      } else if (option.id === 'spaces') {
        staticPwd += `  ${staticPwd}  `;
      } else {
        dupeExclude = true;
      }
    }
  });

  for (let i = 0; i < pwdLenght; i++) {
    let randomChar = staticPwd[Math.floor(Math.random() * staticPwd.length)];
    if (dupeExclude) {
      !randomPwd.includes(randomChar) || randomChar == ' '
        ? (randomPwd += randomChar)
        : i--;
    } else {
      randomPwd += randomChar;
    }
  }
  pwdInput.value = randomPwd;
};

const upadatepwdIndicator = () => {
  pwdIndicator.id =
    pwdSlider.value <= 8 ? 'weak' : pwdSlider.value <= 16 ? 'medium' : 'strong';
};

const updateSlider = () => {
  document.querySelector('.gen-pwd-length span').innerText = pwdSlider.value;
  pwdGen();
  upadatepwdIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(pwdInput.value);
  copyIcon.innerText = 'check';
  copyIcon.style.color = '#299b41';
  setTimeout(() => {
    copyIcon.innerText = 'copy_all';
    copyIcon.style.color = '#707070';
  }, 1500);
};

copyIcon.addEventListener('click', copyPassword);
pwdSlider.addEventListener('input', updateSlider);
pwdGenBtn.addEventListener('click', pwdGen);
