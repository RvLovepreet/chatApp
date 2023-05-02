import React from 'react';
import { View, Text } from 'react-native';
import { CustomHeader } from '../../components';
import { Constent } from '../../theme';
const ChatScreen = ({ navigation }) => {
  return (
    <View>
      <CustomHeader
        title={Constent.constent.group}
        goToBack={() => navigation.goBack()}
      />
      <Text>Chat Screen</Text>
    </View>
  );
};
export default ChatScreen;
