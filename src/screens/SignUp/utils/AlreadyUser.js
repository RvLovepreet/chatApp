import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Constent } from '../../../theme';
import { Colors, FontSize } from '../../../theme/Variables';

const AlreadyUser = ({ onPress }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: FontSize.small }}>
        Already User?
        <Text onPress={() => onPress()} style={{ color: Colors.primary }}>
          {Constent.constent.signIn}
        </Text>
      </Text>
    </View>
  );
};
export default AlreadyUser;
