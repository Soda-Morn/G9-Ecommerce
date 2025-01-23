// Path to the default profile image in your "Picture" folder
const defaultProfileImage = './Picture/logo.png';

// Function to store registration details in localStorage and update UI
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
      profileImage: defaultProfileImage, // Default profile image from the Picture folder
    };

    // Save user details in localStorage under a common key
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');

    // Update UI to show the user's profile image
    updateProfileImage(user.profileImage);

    // Automatically switch to login form
    document.getElementById('id02').style.display = 'none'; // Hide the register form
    document.getElementById('id01').style.display = 'block'; // Show the login form

    document.getElementById('email').value = email; // Pre-fill email
    document.getElementById('password').value = password; // Pre-fill password
  } else {
    alert('Please fill out all fields.');
  }
}

// Function to handle user login and update UI
function loginUser() {
  const input = document.getElementById('email').value.toLowerCase();
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Find a user that matches the provided input
  const user = users.find(
    (user) =>
      (user.email.toLowerCase() === input ||
        user.firstName.toLowerCase() === input ||
        user.lastName.toLowerCase() === input) &&
      user.password === password
  );

  if (user) {
    alert(`Welcome back, ${user.firstName}!`);
    
    // Update UI to show the user's profile image
    updateProfileImage(user.profileImage);

    window.location.href = './index.html'; // Redirect to index.html
  } else {
    alert('No matching account found or incorrect password.');
  }
}

// Function to update profile image in the DOM
function updateProfileImage(imageUrl) {
  const accountLink = document.getElementById('accountLink');
  accountLink.innerHTML = `<img src="${imageUrl}" alt="Profile Image" style="width: 50px; height: 50px; border-radius: 50%;">`;
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

// Check if a user is already logged in
document.addEventListener('DOMContentLoaded', () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const lastLoggedInUser = users[users.length - 1]; // Assuming last registered or logged-in user is active

  if (lastLoggedInUser) {
    updateProfileImage(lastLoggedInUser.profileImage);
  }
});
