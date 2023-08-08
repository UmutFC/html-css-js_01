const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input success message
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Event Listeners
form.addEventListener("submit", function (e) {
  // because of form is type of submit, it will only flash the console log so we are preventing it with "e.prevenDefault()" but form will not submit it
  e.preventDefault();

  // console.log(username); //<input type="text" id="username" placeholder="Enter username">

  // so we want to submit value
  console.log(username.value);

  // if (username.value === "") {
  //   showError(username, "Username is required");
  // } else {
  //   showSuccess(username);
  // }

  // if (email.value === "") {
  //   showError(email, "E-mail is required");
  // } else if (!isValidMail(email)) {
  //   showError(email, "E-mail is not valid");
  // } else {
  //   showSuccess(email);
  // }
  // if (password.value === "") {
  //   showError(password, "Password is required");
  // } else {
  //   showSuccess(password);
  // }
  // if (password2.value === "") {
  //   showError(password2, "Password 2 is required");
  // } else {
  //   showSuccess(password2);
  // }

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

// Check Passwords Match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords does not match");
  }
}

// Check Input Length
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

// Check Required Fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      if (input.id === "password2") {
        showError(input, "Please confirm your password");
      }
    } else {
      showSuccess(input);
    }
  });
}

// Get Field Name
function getFieldName(input) {
  const val = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  return val;
}
