import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { CustomHeader } from '../../components';
import { useSelector } from 'react-redux';
import { Constent } from '../../theme';
import { CustomInputFeild, CustomMessage } from '../../components';
import { ContainerStyle } from '../../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { Colors } from '../../theme/Variables';
const ChatScreen = ({ navigation }) => {
  navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  const [message, setMessage] = useState('');
  const [Allmessage, setAllMessage] = useState([]);
  const myId = useSelector(data => data.user);
  console.log(myId, 'dsfafa');
  /* console.log('check 1 ', user); */
  /*   const myId = '9876543210'; */
  useEffect(() => {
    getChat();
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
  }, []);
  const getChat = () => {
    let GUID = 'group1';
    let limit = 30;
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(limit)
      .build();
    messagesRequest.fetchPrevious().then(
      messages => {
        let mes = messages.map(msg => {
          let obj = {
            message: msg.text,
            sender: msg.rawMessage.sender,
          };
          return obj;
        });
        setAllMessage(mes);
        console.log('Message list fetched:', messages);
      },
      error => {
        console.log('Message fetching failed with error:', error);
      },
    );
  };
  const sendMessage = () => {
    if (message?.length) {
      console.log(message);
      let receiverID = 'group1';
      let messageText = message;
      let receiverType = CometChat.RECEIVER_TYPE.GROUP;
      let textMessage = new CometChat.TextMessage(
        receiverID,
        messageText,
        receiverType,
      );
      CometChat.sendMessage(textMessage).then(
        message => {
          setMessage('');
          getChat();
          console.log('Message sent successfully:', message);
        },
        error => {
          console.log('Message sending failed with error:', error);
        },
      );
    } else {
      console.log('empty message');
    }
  };

  return (
    <View style={ContainerStyle.MainContainer}>
      <CustomHeader
        title={Constent.constent.group}
        goToBack={() => navigation.goBack()}
      />
      <View style={ContainerStyle.contentContainer}>
        <FlatList
          inverted
          style={styles.listStyle}
          data={[...Allmessage].reverse()}
          renderItem={({ item, index }) => (
            <>
              <CustomMessage
                myId={myId}
                message={item.message}
                sender={item.sender}
              />
            </>
          )}
        />
        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.sendMessageContainer}>
              <View style={styles.sendMessageInput}>
                <CustomInputFeild
                  visibility={true}
                  values={message}
                  setValues={txt => setMessage(txt)}
                />
              </View>
              <View style={styles.sendMessageIcon}>
                <TouchableOpacity onPress={() => sendMessage()}>
                  {Constent.Icons.send}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sendMessageContainer: {
    position: 'relative',
    width: wp('98%'),
    height: hp('9%'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendMessageInput: {
    width: '85%',
  },
  listStyle: { width: '100%', padding: '2%' },
  sendMessageIcon: {
    padding: 10,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
});
export default ChatScreen;
