import React, { useState } from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { Q } from '@nozbe/watermelondb';
import { View } from 'react-native';
import { CustomInputFeild, CustomHeader, CustomBtn } from '../../components';
import { ContainerStyle } from '../../theme';
import { heightPercentageToDP as hp } from '../../theme';
import { addKey } from '../../store/user';
import { useDispatch } from 'react-redux';
import { database } from '../../..';
const SignIn = ({ navigation }) => {
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const dispatch = useDispatch();
  const goToNext = async () => {
    const user = await isUser();
    if (user) {
      console.log('check for mobile', user);
      logInCometChat(user);
      navigation.navigate('Main', { user: user });
    } else {
      console.log('check email and password');
    }
  };
  const logInCometChat = user => {
    let UID = user;
    let authKey = '398b85520beaa34f2b62fe425376b42bd709b02f';

    CometChat.getLoggedinUser().then(
      user => {
        if (!user) {
          CometChat.login(UID, authKey).then(
            user => {
              console.log('Login Successful:', { user });
            },
            error => {
              console.log('Login failed with exception:', { error });
            },
          );
        }
      },
      error => {
        console.log('Something went wrong', error);
      },
    );
  };
  const isUser = async () => {
    try {
      const users = await database
        .get('user')
        .query(Q.where('email', userEmail), Q.where('password', userPassword));
      console.log(users[0]._raw.mobile, 'chek');
      dispatch(addKey(users[0]._raw.mobile));
      return users[0]._raw.mobile;
      /* return users.length ? true : false; */
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={ContainerStyle.MainContainer}>
      <CustomHeader title="Sign In" goToBack={() => navigation.goBack()} />
      <View style={ContainerStyle.contentContainer}>
        <CustomInputFeild
          title="Email"
          required
          setValues={txt => setUserEmail(txt)}
          visibility={true}
          values={userEmail}
        />
        <CustomInputFeild
          title="Password"
          required
          setValues={txt => setUserPassword(txt)}
          visibility={true}
          values={userPassword}
        />

        <CustomBtn title="sign in" onPress={() => goToNext()} />
      </View>
    </View>
  );
};
export default SignIn;
