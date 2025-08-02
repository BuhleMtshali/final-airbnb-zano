// This is a mock authentication service for the Airbnb clone
// In a real application, these functions would interact with Firebase, Auth0, or another auth provider
// Mock delay to simulate network request
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Mock user storage
let currentUser = null;
// Sign up with email and password
export const signUp = async (email, password, name) => {
  await delay(1000);
  // Validate inputs
  if (!email || !password || !name) {
    throw new Error('Email, password, and name are required');
  }
  if (password.length < 6) {
    throw new Error('Password should be at least 6 characters');
  }
  // In a real app, this would create a user in your auth system
  const newUser = {
    uid: 'user-' + Math.random().toString(36).substr(2, 9),
    email,
    displayName: name,
    photoURL: null,
    emailVerified: false
  };
  // Store the user in our mock storage
  currentUser = newUser;
  // Store in localStorage to persist the session
  localStorage.setItem('airbnb_user', JSON.stringify(newUser));
  return newUser;
};
// Sign in with email and password
export const signIn = async (email, password) => {
  await delay(1000);
  // Validate inputs
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  // In a real app, this would validate credentials against your auth system
  // For this mock, we'll just create a user object if the email contains "@"
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
  // Create a mock user
  const user = {
    uid: 'user-' + Math.random().toString(36).substr(2, 9),
    email,
    displayName: email.split('@')[0],
    photoURL: null,
    emailVerified: true
  };
  // Store the user in our mock storage
  currentUser = user;
  // Store in localStorage to persist the session
  localStorage.setItem('airbnb_user', JSON.stringify(user));
  return user;
};
// Sign out
export const signOut = async () => {
  await delay(500);
  // Clear the current user
  currentUser = null;
  // Remove from localStorage
  localStorage.removeItem('airbnb_user');
  return true;
};
// Get the current user
export const getCurrentUser = () => {
  // If we have a current user in memory, return it
  if (currentUser) {
    return currentUser;
  }
  // Otherwise, check localStorage
  const storedUser = localStorage.getItem('airbnb_user');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  // No user found
  return null;
};
// Update user profile
export const updateProfile = async (userData) => {
  await delay(800);
  if (!currentUser) {
    throw new Error('No user is signed in');
  }
  // Update the user object
  currentUser = {
    ...currentUser,
    ...userData
  };
  // Update in localStorage
  localStorage.setItem('airbnb_user', JSON.stringify(currentUser));
  return currentUser;
};
// Send password reset email
export const sendPasswordResetEmail = async (email) => {
  await delay(800);
  if (!email || !email.includes('@')) {
    throw new Error('Valid email is required');
  }
  // In a real app, this would trigger a password reset email
  console.log(`Password reset email sent to ${email}`);
  return true;
};
// Confirm password reset
export const confirmPasswordReset = async (code, newPassword) => {
  await delay(1000);
  if (!code || !newPassword) {
    throw new Error('Reset code and new password are required');
  }
  if (newPassword.length < 6) {
    throw new Error('Password should be at least 6 characters');
  }
  // In a real app, this would verify the code and update the password
  console.log('Password reset confirmed');
  return true;
};