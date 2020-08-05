const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// show input success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// check Email
function validateEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}
//check required
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
//check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
//check passwords match
function checkPassword(input1, input2) {
  if (input1 !== input2) {
    showError(password2, 'Passwords are not match');
  }
}

// get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//add event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, password, password2, email]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  validateEmail(email);
  checkPassword(password, password2);
});
