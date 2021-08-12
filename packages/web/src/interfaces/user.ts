interface User {
  email: string;
  name: string;
  userId: string;
  iat?: number;
  exp?: number;
}

export default User;
