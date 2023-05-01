import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { Colors, FontSize } from '../../theme/Variables';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
const CustomBtn = ({ title, onPress, style }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.CustomBtnContainer, style]}>
          <Text style={[styles.btnTitile, style]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default CustomBtn;
const styles = StyleSheet.create({
  CustomBtnContainer: {
    padding: hp('2%'),
    backgroundColor: Colors.primary,
    width: wp('95%'),
    marginLeft: wp('2.5%'),
    display: 'flex',
    borderWidth: 0,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitile: {
    color: Colors.white,
    fontSize: FontSize.regular,
    fontWeight: '600',
  },
});
