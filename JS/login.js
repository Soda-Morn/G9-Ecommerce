const defaultProfileImage = './Picture/logo.png'; // Path to default image

// Function to handle user registration
function registerUser() {
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;
  const email = document.getElementById('rEmail').value.toLowerCase(); // Store email in lowercase
  const password = document.getElementById('rPassword').value;

  if (firstName && lastName && email && password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    if (users.some(user => user.email === email)) {
      alert('This email is already registered. Please use a different email.');
      return;
    }

    const user = {
      firstName,
      lastName,
      email, // Store email in lowercase
      password, // Storing passwords in localStorage is insecure for production
      profileImage: defaultProfileImage, // Default profile image
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    document.getElementById('id02').style.display = 'none'; // Hide the register form
    document.getElementById('id01').style.display = 'block'; // Show the login form
  } else {
    alert('Please fill out all fields.');
  }
}

// Function to handle user login
function loginUser() {
  const emailInput = document.getElementById('email').value.toLowerCase(); // Ensure email input is lowercase
  const passwordInput = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u => u.email === emailInput && u.password === passwordInput);

  if (user) {
    alert(`Welcome back, ${user.firstName}!`);

    // Save logged-in user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Update UI to show the user's profile image
    updateProfileImage(user.profileImage);

    // Hide login form
    document.getElementById('id01').style.display = 'none';
  } else {
    alert('Incorrect email or password.');
  }
}

// Function to update profile image in the DOM
function updateProfileImage(imageUrl) {
  const accountLink = document.getElementById('accountLink');
  accountLink.innerHTML = `<img src="${imageUrl}" alt="Profile Image" style="width: 50px; height: 50px; border-radius: 50%; cursor: pointer;" onclick="toggleProfileCard()">`;
}

// Function to display the logged-in user's profile
function showUserProfile() {
  const profileCard = document.getElementById('profileCard');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    profileCard.innerHTML = `
      <span onclick="document.getElementById('profileCard').style.display='none'" class="close" title="Close Modal">&times;</span>
      <div>
        <img src="${currentUser.profileImage}" alt="Profile Image" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px;">
        <h3>${currentUser.firstName} ${currentUser.lastName}</h3>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <button onclick="logoutUser()" style="padding: 10px 20px; background-color: #007bff; color: white;">Logout</button>
      </div>
    `;

    profileCard.style.display = 'block';
  } else {
    alert('No user is logged in.');
  }
}

// Function to toggle the profile card visibility
function toggleProfileCard() {
  const profileCard = document.getElementById('profileCard');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    if (profileCard.style.display === 'block') {
      profileCard.style.display = 'none'; // Hide the profile card if visible
    } else {
      showUserProfile(); // Show profile card
    }
  } else {
    alert('No user is logged in.');
  }
}

// Function to logout the user
function logoutUser() {
  localStorage.removeItem('currentUser');
  alert('You have logged out.');
  window.location.reload(); // Reload page after logout
}

// Check if a user is already logged in on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    updateProfileImage(currentUser.profileImage); // Update profile image
    document.getElementById('id01').style.display = 'none'; // Hide login form if user is logged in
  } else {
    document.getElementById('id01').style.display = 'block'; // Show login form if no user is logged in
  }
});

// Attach event listeners to form buttons
document.getElementById('submitSignUp').addEventListener('click', function (event) {
  event.preventDefault();
  registerUser();
});

document.getElementById('submitSignIn').addEventListener('click', function (event) {
  event.preventDefault();
  loginUser();
});