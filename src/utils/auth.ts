import usersData from '../data/users.json';

// Define the structure of a Google OAuth user object
interface GoogleUser {
  email: string;
  name?: string;
  picture?: string;
  sub?: string;
}

// Define the structure of a user from our users.json file
interface AuthorizedUser {
  email: string;
  name?: string;
  // Add other fields if your users.json has more data
}

// Check if a Google-authenticated user is authorized to use the app
// Compares the Google user's email against our list of authorized users
export const verifyUser = (googleUser: GoogleUser): boolean => {
  // Return false immediately if there's no email (shouldn't happen with Google OAuth)
  if (!googleUser?.email) return false;
  
  // Convert email to lowercase for case-insensitive comparison
  const userEmail = googleUser.email.toLowerCase();
  
  // Check if this email exists in our authorized users list
  return usersData.some((user: AuthorizedUser) => 
    user.email.toLowerCase() === userEmail
  );
};