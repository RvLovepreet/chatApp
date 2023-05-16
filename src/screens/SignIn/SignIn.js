import React, { useState } from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Q } from '@nozbe/watermelondb';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { CustomInputFeild, CustomHeader, CustomBtn } from '../../components';
import { ContainerStyle } from '../../theme';
import { addKey } from '../../store/user';
import { useDispatch } from 'react-redux';
import { database } from '../../..';
import { Constent } from '../../theme';
const SignIn = ({ navigation }) => {
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const goToNext = async () => {
    try {
      const user = await isUser();
      console.log(user, 'helllo dsaf');
      if (user) {
        logInCometChat(user);
        navigation.navigate(Constent.navigationScreens.Main);
      } else {
        alert(' 1 check email and password');
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
      const key = users[0]._raw.mobile;
      console.log(key, 'key for redux');
      dispatch(addKey(key));
      console.log(key, 'key for redux 1');
      return users[0]._raw.mobile;
      /* return users.length ? true : false; */
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={ContainerStyle.MainContainer}>
        <CustomHeader
          title={Constent.constent.signIn}
          goToBack={() => {
            /*       console.log('ehldsfas'); */
            navigation.goBack();
          }}
        />
        <View style={[ContainerStyle.contentContainer]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <CustomInputFeild
                title={Constent.constent.email}
                required
                setValues={txt => setUserEmail(txt)}
                values={userEmail}
                visibility={true}
              />
              <CustomInputFeild
                title={Constent.constent.password}
                required
                setValues={txt => setUserPassword(txt)}
                values={userPassword}
                iconsecond={Constent.Icons.eyeOff}
                icon={Constent.Icons.eye}
              />

              <CustomBtn
                title={Constent.constent.signIn}
                onPress={() => goToNext()}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default SignIn;
