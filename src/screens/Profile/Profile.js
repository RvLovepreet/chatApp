import React, { useEffect, useState } from 'react';
import { database } from '../../..';
import { Q } from '@nozbe/watermelondb';
import { View, Image, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { CustomHeader, CustomLabel } from '../../components';
import { removeKey } from '../../store/user';
import { useDispatch } from 'react-redux';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { ContainerStyle } from '../../theme';
import { Constent } from '../../theme';
import { Colors } from '../../theme/Variables';
import { useSelector } from 'react-redux';
const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, getUser] = useState({});
  const mobile = useSelector(data => data.user);
  console.log(mobile, 'chkec for mobile');
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    try {
      const users = await database.get('user').query(Q.where('mobile', mobile));
      getUser(users[0]._raw);
      console.log(users[0]._raw);
      /* return users.length ? true : false; */
    } catch (err) {
      console.log(err);
    }
  };
  const logOut = async () => {
    dispatch(removeKey(''));
    await CometChat.logout();
    navigation.navigate(Constent.navigationScreens.SignUp);
  };
  return (
    <View style={ContainerStyle.MainContainer}>
      <CustomHeader title="Profile" onbtnClick={() => logOut()} />
      <View style={ContainerStyle.contentContainer}>
        <Image
          style={styles.ImageContainer}
          source={
            user.image
              ? { uri: user.image }
              : require('../../theme/assets/images/profileImageDefault.png')
          }
        />
        <View style={styles.profileContent}>
          <CustomLabel
            title={user.name}
            label="Name"
            icon={Constent.Icons.user}
          />
          <CustomLabel
            title={user.mobile}
            label="Phone"
            icon={Constent.Icons.Phone}
          />
          <CustomLabel
            title={user.email}
            label="Email"
            icon={Constent.Icons.email}
          />
        </View>
      </View>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  ImageContainer: {
    width: wp('40%'),
    height: wp('40%'),
    borderWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 100,
  },
  profileContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: hp('2%'),
  },
});
