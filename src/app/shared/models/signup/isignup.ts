export interface Isignup {

  message: string;
  user: User;
  token: string;
}

interface User {
  name: string;
  email: string;
  role: string;
}
export interface SignupData {
    name:string| null| undefined;
    email:string| null| undefined;
    password:string| null| undefined;
    rePassword:string| null| undefined;
    phone:string| null| undefined;
}
