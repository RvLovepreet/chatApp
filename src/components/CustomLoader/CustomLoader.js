import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { Colors } from '../../theme/Variables';
const CustomLoader = ({ show, size, style }) => {
  console.log(show, 'value=====>>>>>');

  return (
    <ActivityIndicator
      animating={show}
      color={Colors.primary}
      size={size}
      hidesWhenStopped={true}
      style={[styles.loader, style]}
    />
  );
};
export default CustomLoader;
const styles = StyleSheet.create({
  loader: {
    marginTop: 8,
    marginBottom: 30,
    flex: 1,
    alignSelf: 'center',
  },
});
