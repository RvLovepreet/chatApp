import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
  const [focus, setFocus] = useState(false);
  const [Allmessage, setAllMessage] = useState([]);
  const myId = useSelector(data => data.user);
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
        console.log(messages, 'check for messages');
        let mes = messages.map(msg => {
          let obj = {
            message: msg.text,
            sender: msg.rawMessage.sender,
            time: new Date(msg.rawMessage.sentAt * 1000).toLocaleTimeString(),
          };
          return obj;
        });
        setAllMessage(mes);
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
      <View
        style={[ContainerStyle.contentContainer, focus ? styles.content : null]}
      >
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
                time={item.time}
              />
            </>
          )}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}
          /*   style={{
            flex: 1,
            backgroundColor: '#ECECEC',
            borderRadius: 10,
            flex: 0.95,
            paddingVertical: 5,
            marginLeft: 10,
          }} */
        >
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.sendMessageContainer}>
              <View style={styles.sendMessageInput}>
                <CustomInputFeild
                  visibility={true}
                  values={message}
                  setValues={txt => setMessage(txt)}
                  focus1={focus}
                  setFocus1={setFocus}
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
  content: {
    marginBottom: wp('10%'),
  },
});
export default ChatScreen;
