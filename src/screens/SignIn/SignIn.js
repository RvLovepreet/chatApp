import React, { useState } from 'react';
import { Q } from '@nozbe/watermelondb';
import { View } from 'react-native';
import { CustomInputFeild, CustomHeader, CustomBtn } from '../../components';
import { ContainerStyle } from '../../theme';
import { heightPercentageToDP as hp } from '../../theme';
import { database } from '../../..';
const SignIn = ({ navigation }) => {
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const goToNext = async () => {
    if (await isUser()) {
      navigation.navigate('Main');
    } else {
      console.log('check email and password');
    }
  };
  const isUser = async () => {
    try {
      const users = await database
        .get('user')
        .query(Q.where('email', userEmail), Q.where('password', userPassword));
      return users.length ? true : false;
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
          value={userEmail}
        />
        <CustomInputFeild
          title="Password"
          required
          setValues={txt => setUserPassword(txt)}
          visibility={true}
          value={userPassword}
        />

        <CustomBtn title="sign in" onPress={() => goToNext()} />
      </View>
    </View>
  );
};
export default SignIn;
