const constent = {
  signUp: 'Sign Up',
  signIn: 'Sign In',
  name: 'Name',
  password: 'Password',
  passwordError: 'create strong password',
  email: 'Email',
  emailError: 'Invalid Email',
  mobile: 'Mobile',
  mobileError: 'Invalid Mobile Number',
};

const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const mobregex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
const passwordregex =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const regex = {
  emailregex,
  mobregex,
  passwordregex,
};
export default {
  regex,
  constent,
};
