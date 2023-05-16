import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Q } from '@nozbe/watermelondb';
import {
  CustomInputFeild,
  CustomHeader,
  CustomBtn,
  ProfileImage,
} from '../../components';
import { Constent, ContainerStyle } from '../../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { CometChat } from '@cometchat-pro/react-native-chat';
import AlreadyUser from './utils/AlreadyUser';
import { database } from '../../..';
import { TextInput } from 'react-native-gesture-handler';
const SignUp = ({ navigation }) => {
  const [focus, setFocus] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('');
  const [error, setError] = useState({
    emailErr: '',
    passwordErr: '',
    mobileErr: '',
  });
  const goToNext = async () => {
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
        const flag = await signUp();
        if (flag) {
          navigation.navigate(Constent.navigationScreens.SignIn, {
            mobile: userMobile,
          });
        } else {
          alert('User Already Exist valid user');
        }
      } else {
        alert('Check your password and email');
      }
    } catch (err) {
      alert('something is wrong');
    }
  };
  const userExist = async () => {
    try {
      const users = await database
        .get(Constent.databaseVariable.schemaName)
        .query(Q.where(Constent.databaseVariable.email, userEmail));
      return users.length ? true : false;
    } catch (err) {
      return false;
    }
  };
  const signUp = async () => {
    const users = database.collections.get(
      Constent.databaseVariable.schemaName,
    );
    try {
      const flag = await userExist();
      if (!flag) {
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
        return true;
      } else {
        console.log('user alredayexist ');
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createUserCometChat = () => {
    const authKey = Constent.commetChat.authKey;
    const uid = userMobile;
    const name = userName;

    var user = new CometChat.User(uid);

    user.setName(name);

    CometChat.createUser(user, authKey).then(
      user => {
        console.log(user);
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
    <KeyboardAwareScrollView>
      <View style={ContainerStyle.MainContainer}>
        <CustomHeader title={Constent.constent.signUp} />
        <View
          style={[
            ContainerStyle.contentContainer /* , focus ? styles.content : null */,
          ]}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
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
                /*  setFocus1={setFocus} */
              />

              <CustomBtn
                title={Constent.constent.signUp}
                onPress={() => goToNext()}
              />
              <AlreadyUser
                onPress={() =>
                  navigation.navigate(Constent.navigationScreens.SignIn)
                }
              />
            </>
          </TouchableWithoutFeedback>
          {/*     </ScrollView> */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  Fields: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
  },
  content: {
    marginBottom: wp('10%'),
  },
});
export default SignUp;
