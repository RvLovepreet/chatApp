import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '../../theme/Variables';
const CustomLabel = ({ label, title, icon }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.IconStyle}>
        <Text>{icon}</Text>
      </View>
      <View style={styles.contentStyle}>
        <Text style={styles.labelStyle}>{label}</Text>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
    </View>
  );
};
export default CustomLabel;
const styles = StyleSheet.create({
  mainContainer: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    width: '90%',
    height: hp('10%'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp('5%'),
    paddingBottom: wp('2%'),
    paddingTop: wp('3%'),
  },
  IconStyle: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 100,
  },
  contentStyle: { marginLeft: wp('4%') },
  labelStyle: { fontSize: FontSize.small },
  titleStyle: { fontSize: FontSize.regular },
});
