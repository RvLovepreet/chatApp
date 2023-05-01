import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { FontSize, Colors, NavigationColors } from '../../theme/Variables';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const CustomHeader = ({ title, goToBack, onbtnClick }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {/*    {goToBack ? (
          <TouchableOpacity onPress={goToBack}>{Icons.Back}</TouchableOpacity>
        ) : null} */}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {/*    {onbtnClick ? (
        <CustomBtn
          style={styles.logOutBtn}
          title={constent.LogOut}
          onPress={onbtnClick}
        />
      ) : null} */}
    </View>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: wp('100%'),
    height: hp('10%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: wp('2%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    backgroundColor: NavigationColors.primary,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.large,
    color: Colors.white,
    fontWeight: '900',
  },
  logOutBtn: {
    color: '#fff',
    padding: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});