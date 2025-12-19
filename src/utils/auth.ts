import usersData from '../data/users.json';

export const verifyUser = (googleUser: any): boolean => {
  if (!googleUser?.email) return false;
  
  const userEmail = googleUser.email.toLowerCase();
  
  return usersData.some((user: any) => 
    user.email.toLowerCase() === userEmail
  );
};