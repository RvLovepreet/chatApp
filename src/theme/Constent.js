import Icon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
/* import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; */
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from './Variables';
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

const commetChat = {
  group: 'group1',
  authKey: '398b85520beaa34f2b62fe425376b42bd709b02f',
};

const databaseVariable = {
  schemaName: 'user',
  schemaChat: 'chat',
  name: 'name',
  email: 'email',
  password: 'password',
  mobile: 'mobile',
  image: 'image',
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
  send: <FontIcon name="send" size={30} color="#fff" />,
  email: <Icon name="mail" size={30} color="#111" color={Colors.white} />,
  Phone: <FontIcon name="phone" size={30} color={Colors.white} />,
  user: <Entypo name="user" size={30} color={Colors.white} />,
  eye: <Icon name="eye" size={30} color={Colors.text} />,
  eyeOff: <Icon name="eye-off" size={30} color={Colors.text} />,
  /*Home: <MaterialCommunityIcons name="home" color={color} size={size} />, */
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
  commetChat,
  databaseVariable,
};
