import React, { useState } from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { Q } from '@nozbe/watermelondb';
import { View } from 'react-native';
import { CustomInputFeild, CustomHeader, CustomBtn } from '../../components';
import { ContainerStyle } from '../../theme';
import { addKey } from '../../store/user';
import { useDispatch } from 'react-redux';
import { database } from '../../..';
import { Constent } from '../../theme';
const SignIn = ({ navigation, route }) => {
  const { mobile } = route.params;
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const dispatch = useDispatch();
  const goToNext = async () => {
    try {
      const user = await isUser();
      if (user) {
        logInCometChat(user);
        navigation.navigate(Constent.navigationScreens.Main);
      } else {
        alert('check email and password');
      }
    } catch (err) {
      alert('check email and password');
    }
  };
  const logInCometChat = user => {
    let UID = user;
    let authKey = Constent.commetChat.authKey;

    CometChat.getLoggedinUser().then(
      user => {
        if (!user) {
          CometChat.login(UID, authKey).then(
            user => {
              joinningGroup();
              /*  console.log('Login Successful:', { user }); */
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

  const joinningGroup = async () => {
    var GUID = Constent.commetChat.group;
    var password = '';
    var groupType = CometChat.GROUP_TYPE.PUBLIC;
    try {
      await CometChat.joinGroup(GUID, groupType, password);
    } catch (err) {}
  };
  const isUser = async () => {
    try {
      const users = await database
        .get(Constent.databaseVariable.schemaName)
        .query(
          Q.where(Constent.databaseVariable.email, userEmail),
          Q.where(Constent.databaseVariable.password, userPassword),
        );
      dispatch(addKey(users[0]._raw.mobile));
      return users[0]._raw.mobile;
      /* return users.length ? true : false; */
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={ContainerStyle.MainContainer}>
      <CustomHeader
        title={Constent.constent.signIn}
        goToBack={() => navigation.goBack()}
      />
      <View style={ContainerStyle.contentContainer}>
        <CustomInputFeild
          title={Constent.constent.email}
          required
          setValues={txt => setUserEmail(txt)}
          visibility={true}
          values={userEmail}
        />
        <CustomInputFeild
          title={Constent.constent.password}
          required
          setValues={txt => setUserPassword(txt)}
          value={userPassword}
          iconsecond={Constent.Icons.eyeOff}
          icon={Constent.Icons.eye}
          visibility={false}
        />

        <CustomBtn
          title={Constent.constent.signIn}
          onPress={() => goToNext()}
        />
      </View>
    </View>
  );
};
export default SignIn;
