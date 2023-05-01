import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  CustomInputFeild,
  CustomHeader,
  CustomBtn,
  ProfileImage,
} from '../../components';
import { Constent, ContainerStyle } from '../../theme';
import AlreadyUser from './utils/AlreadyUser';
const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState({
    emailErr: '',
    passwordErr: '',
    mobileErr: '',
  });
  const goToNext = () => {
    try {
      if (
        userName?.length &&
        userEmail?.length &&
        userMobile?.length &&
        userPassword?.length &&
        validation(Constent.constent.email) &&
        validation(Constent.constent.password) &&
        validation(Constent.constent.mobile)
      ) {
        navigation.navigate('SignIn');
      } else {
        console.log('i am in else');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const validation = checktype => {
    switch (checktype) {
      case Constent.constent.password:
        if (Constent.regex.passwordregex.test(userPassword) === false) {
          setError(prestate => ({
            ...prestate,
            passwordErr: Constent.constent.passwordError,
          }));
          return false;
        } else {
          setError(prestate => ({
            ...prestate,
            passwordErr: '',
          }));
          return true;
        }
      case Constent.constent.email:
        if (Constent.regex.emailregex.test(userEmail) === false) {
          setError(prestate => ({
            ...prestate,
            emailErr: Constent.constent.emailError,
          }));
          return false;
        } else {
          setError(prestate => ({
            ...prestate,
            emailErr: '',
          }));
          return true;
        }
      case Constent.constent.mobile:
        if (Constent.regex.mobregex.test(userMobile) === false) {
          setError(prestate => ({
            ...prestate,
            mobileErr: Constent.constent.mobileError,
          }));
          return false;
        } else {
          setError(prestate => ({
            ...prestate,
            mobileErr: '',
          }));
          return true;
        }
      default:
        break;
    }
  };

  return (
    <View style={ContainerStyle.MainContainer}>
      <CustomHeader title={Constent.constent.signUp} />
      <View style={ContainerStyle.contentContainer}>
        <ProfileImage />
        <CustomInputFeild
          title={Constent.constent.name}
          required
          value={userName}
          setValues={txt => setUserName(txt)}
          visibility={true}
        />
        <CustomInputFeild
          title={Constent.constent.email}
          required
          setValues={txt => setUserEmail(txt)}
          visibility={true}
          value={userEmail}
          error={error.emailErr}
        />
        <CustomInputFeild
          title={Constent.constent.password}
          required
          setValues={txt => setUserPassword(txt)}
          visibility={true}
          value={userPassword}
          error={error.passwordErr}
        />
        <CustomInputFeild
          title={Constent.constent.mobile}
          required
          setValues={txt => setUserMobile(txt)}
          value={userMobile}
          visibility={true}
          error={error.mobileErr}
        />
        <CustomBtn
          title={Constent.constent.signUp}
          onPress={() => goToNext()}
        />
        <AlreadyUser onPress={() => navigation.navigate('SignIn')} />
      </View>
    </View>
  );
};
export default SignUp;
