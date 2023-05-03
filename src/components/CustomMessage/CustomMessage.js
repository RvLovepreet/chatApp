import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '../../theme/Variables';

const CustomMessage = ({ message, sender, myId }) => {
  return (
    <View
      style={[
        sender === myId ? styles.sender : styles.receiver,
        styles.messageContainer,
      ]}
    >
      <Text style={styles.senderStyle}>{sender}</Text>
      <Text style={styles.messageSyle}>{message}</Text>
    </View>
  );
};
export default CustomMessage;
const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 20,
    maxWidth: '70%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.13,
    shadowRadius: 9.51,
    elevation: 15,
  },
  sender: {
    alignSelf: 'flex-end',
  },
  receiver: {
    alignSelf: 'flex-start',
  },
  senderStyle: {
    fontWeight: 700,
    color: Colors.primary,
    fontSize: FontSize.regular,
  },
  messageStyle: { fontSize: FontSize.small },
});
