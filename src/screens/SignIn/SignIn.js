import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomInputFeild, CustomHeader, CustomBtn } from '../../components';
import { Layout, ContainerStyle } from '../../theme';
import { heightPercentageToDP as hp } from '../../theme';

const SignIn = () => {
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const goToNext = () => {
    console.log('fdsfasgfagdsf');
  };
  return (
    <View style={ContainerStyle.MainContainer}>
      <CustomHeader title="Sign In" />
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
