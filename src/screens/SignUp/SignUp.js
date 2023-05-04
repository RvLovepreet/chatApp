import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  CustomInputFeild,
  CustomHeader,
  CustomBtn,
  ProfileImage,
} from '../../components';
import { Constent, ContainerStyle } from '../../theme';
import { CometChat } from '@cometchat-pro/react-native-chat';
import AlreadyUser from './utils/AlreadyUser';
import { database } from '../../..';
const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('');
  /*  const [url, setUrl] = useState(''); */
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
        if (signUp()) {
          navigation.navigate('SignIn', { mobile: userMobile });
        } else {
          console.log('you are not valid user');
        }
      } else {
        console.log('i am in else');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const signUp = async () => {
    const users = database.collections.get('user');
    try {
      await database.write(async () => {
        await users.create(user => {
          user.name = userName;
          user.email = userEmail;
          user.password = userPassword;
          user.mobile = userMobile;
          user.image = userImage;
        });
      });
      createUserCometChat();
      console.log('data saved');
      return true;
    } catch (err) {
      console.log(err);
    }
  };
  const createUserCometChat = () => {
    const authKey = '398b85520beaa34f2b62fe425376b42bd709b02f';
    const uid = userMobile;
    const name = userName;

    var user = new CometChat.User(uid);

    user.setName(name);

    CometChat.createUser(user, authKey).then(
      user => {
        console.log('user created', user);
      },
      error => {
        console.log('error', error);
      },
    );
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
        <ProfileImage setUrl={setUserImage} url={userImage} />
        <CustomInputFeild
          title={Constent.constent.name}
          required
          values={userName}
          setValues={txt => setUserName(txt)}
          visibility={true}
        />
        <CustomInputFeild
          title={Constent.constent.email}
          required
          setValues={txt => setUserEmail(txt)}
          visibility={true}
          values={userEmail}
          error={error.emailErr}
        />
        <CustomInputFeild
          title={Constent.constent.password}
          required
          setValues={txt => setUserPassword(txt)}
          values={userPassword}
          error={error.passwordErr}
          iconsecond={Constent.Icons.eyeOff}
          icon={Constent.Icons.eye}
          visibility={false}
        />
        <CustomInputFeild
          title={Constent.constent.mobile}
          required
          setValues={txt => setUserMobile(txt)}
          values={userMobile}
          visibility={true}
          error={error.mobileErr}
        />
        <CustomBtn
          title={Constent.constent.signUp}
          onPress={() => goToNext()}
        />
        <AlreadyUser
          onPress={() => navigation.navigate('SignIn', { mobile: userMobile })}
        />
      </View>
    </View>
  );
};
export default SignUp;
