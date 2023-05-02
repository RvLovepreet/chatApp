import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { FontSize, Colors } from '../../theme/Variables';
import { TouchableOpacity } from 'react-native-gesture-handler';
const CustomGroupComponent = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <Text style={styles.content}>Group Component</Text>
      </View>
    </TouchableOpacity>
  );
};
export default CustomGroupComponent;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('8%'),
    padding: wp('2%'),
    borderWidth: 1,
    borderColor: Colors.primary,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  content: {
    fontSize: FontSize.regular,
  },
});
