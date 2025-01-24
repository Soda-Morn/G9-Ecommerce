const defaultProfileImage = './Picture/profile.jpg'; // Path to default image

// Function to register a new user
function registerUser() {
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;
  const email = document.getElementById('rEmail').value.toLowerCase();
  const password = document.getElementById('registerPassword').value;

  if (firstName && lastName && email && password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    if (users.some(user => user.email === email)) {
      alert('This email is already registered. Please use a different email.');
      return;
    }

    // Save new user
    users.push({ firstName, lastName, email, password, profileImage: defaultProfileImage });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    document.getElementById('id02').style.display = 'none'; // Hide registration form
    document.getElementById('id01').style.display = 'block'; // Show login form
  } else {
    alert('Please fill out all fields.');
  }
}

// Function to handle user login
function loginUser() {
  const email = document.getElementById('email').value.toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    alert(`Welcome back, ${user.firstName}!`);
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateProfileImage(user.profileImage);
    document.getElementById('id01').style.display = 'none'; // Hide login form
  } else {
    alert('Incorrect email or password.');
  }
}

// Function to update profile image in the DOM
function updateProfileImage(imageUrl) {
  const accountLink = document.getElementById('accountLink');
  if (imageUrl) {
    accountLink.innerHTML = `
      <img src="${imageUrl}" 
           alt="Profile Image" 
           style="width: 50px; height: 50px; border-radius: 50%; cursor: pointer;" 
           onclick="toggleProfileCard()">
    `;
  } else {
    accountLink.innerHTML = `
      <span id="accountIcon" class="material-symbols-outlined"
            style="font-size: 24px;">account_circle</span>
    `;
  }
}

// Function to logout the user
function logoutUser() {
  localStorage.removeItem('currentUser');
  alert('You have logged out.');

  // Reset profile icon to default (i.e., account_circle)
  updateProfileImage(null);

  window.location.reload(); // Reload the page to reflect changes
}

// Initialize the app on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    updateProfileImage(currentUser.profileImage);
    document.getElementById('id01').style.display = 'none';
  } else {
    document.getElementById('id01').style.display = 'block';
  }
});

// Event listeners for form buttons
document.getElementById('submitSignUp').addEventListener('click', function (event) {
  event.preventDefault();
  registerUser();
});

document.getElementById('submitSignIn').addEventListener('click', function (event) {
  event.preventDefault();
  loginUser();
});

// Event listener for logout button
document.getElementById('submitlogout').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent any default action (form submission)
  logoutUser();
});

// Function to toggle password visibility
function togglePasswordVisibility(inputId, iconId) {
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = document.getElementById(iconId);

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // Show the password
    eyeIcon.textContent = 'visibility'; // Change icon to open eye
  } else {
    passwordInput.type = 'password'; // Hide the password
    eyeIcon.textContent = 'visibility_off'; // Change icon to closed eye
  }
}
