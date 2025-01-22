// Function to store registration details in localStorage and show the login form
function registerUser() {
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;

  if (firstName && lastName && email && password) {
      const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password, // Note: Storing passwords in localStorage is not secure for production!
      };

      localStorage.setItem(email, JSON.stringify(user));
      alert('Registration successful! Please log in.');

      // Automatically switch to login form and pre-fill email and password
      document.getElementById('id02').style.display = 'none'; // Hide the register form
      document.getElementById('id01').style.display = 'block'; // Show the login form

      document.getElementById('email').value = email; // Pre-fill email
      document.getElementById('password').value = password; // Pre-fill password
  } else {
      alert('Please fill out all fields.');
  }
}

// Function to handle user login
function loginUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const storedUser = localStorage.getItem(email);

  if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.password === password) {
          alert(`Welcome back, ${user.firstName}! Redirecting to the home page...`);
          window.location.href = './index.html'; // Redirect to index.html
      } else {
          alert('Incorrect password.');
      }
  } else {
      alert('No account found with this email.');
  }
}

// Attach event listeners to the form buttons
document.getElementById('submitSignUp').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent form submission
  registerUser();
});

document.getElementById('submitSignIn').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent form submission
  loginUser();
});
