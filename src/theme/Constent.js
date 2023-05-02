import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const constent = {
  signUp: 'Sign Up',
  signIn: 'Sign In',
  name: 'Name',
  Home: 'Home',
  group: 'Group',
  password: 'Password',
  passwordError: 'create strong password',
  email: 'Email',
  emailError: 'Invalid Email',
  mobile: 'Mobile',

  mobileError: 'Invalid Mobile Number',
};
const navigationScreens = {
  Home: 'Home',
  ChatScreen: 'Chat Screen',
  SignUp: 'SignUp',
  SignIn: 'SignIn',
  Main: 'Main',
  HomeNavigation: 'Home Navigation',
  Profile: 'Profile',
};
const Icons = {
  Back: <Icon name="arrow-back" size={30} color="#fff" />,
  /*   Profile: <Entypo name="user" color={#fff} size={size} />,
  Home: <MaterialCommunityIcons name="home" color={color} size={size} />, */
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
  Icons,
  navigationScreens,
};
