import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../theme';
import { Colors, FontSize } from '../../theme/Variables';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
const { height, width } = Dimensions.get('window');
const CustomBtn = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.CustomBtnContainer, style]}
      onPress={onPress}
    >
      <Text style={[styles.btnTitile]}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomBtn;
const styles = StyleSheet.create({
  CustomBtnContainer: {
    height: height * 0.1,
    width: width * 0.9,
    marginTop: 4,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    zIndex: 1111,
  },
  btnTitile: {
    zIndex: 1,
    color: Colors.white,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    fontSize: FontSize.regular,
    fontWeight: '600',
  },
});
