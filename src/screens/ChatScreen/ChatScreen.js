import React, { useState, useEffect, useRef } from 'react';
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
  const flatlistRef = useRef();

  const [message, setMessage] = useState('');
  const [focus, setFocus] = useState(false);
  const [Allmessage, setAllMessage] = useState([]);
  const myId = useSelector(data => data.user);
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    getChat();
    /* setTimeout(() => {
      flatlistRef.current.scrollToEnd({ animated: false });
    }, 1000); */
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
  }, []);

  const getChat = () => {
    let GUID = Constent.commetChat.group;
    let limit = 15;
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(limit)
      .build();
    messagesRequest.fetchPrevious().then(
      messages => {
        console.log(messages, 'chat messages');
        let mes = messages.map(msg => {
          let obj = {
            message: msg.text,
            sender: msg.rawMessage.sender,
            date: new Date(msg.rawMessage.sentAt * 1000).toDateString(),
            hours: [
              new Date(msg.rawMessage.sentAt * 1000).getHours(),
              new Date(msg.rawMessage.sentAt * 1000).getMinutes(),
            ],
          };
          return obj;
        });
        /* createNewList(mes); */
        console.log(mes, 'messages');
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
      let receiverID = Constent.commetChat.group;
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
  const getDay = date => {
    const date1 = new Date(date).getDate();
    const today = new Date().getDate();
    const yesterday = new Date().getDate() - 1;
    if (date1 === today) {
      return 'Today';
    } else if (date1 === yesterday) {
      return 'Yesterday';
    } else {
      return new Date(date).toLocaleDateString();
    }
    /* console.log(date1, 'dsafdsfa');
    return null; */
  };
  const checkDate = (index, date1, arr, message) => {
    /*  console.log(index, 'index'); */
    /*  if (index === 0) {
      console.log(index, 'in 0 ', message);
      return getDay(arr[index].date);
    } */
    if (index === arr.length - 1) {
      console.log(index, 'in if', message);
      return getDay(arr[index].date);
    } else if (index > 0) {
      console.log(index, 'in else', message);
      const indx =
        new Date(arr[index].date).getDate() -
        new Date(arr[index - 1].date).getDate();
      const date = indx == 0 ? null : getDay(arr[index - 1].date);
      return date;
    }
  };
  return (
    <View style={ContainerStyle.MainContainer}>
      <CustomHeader
        title={Constent.constent.group}
        goToBack={() => navigation.goBack()}
      />
      <View
        style={[
          ContainerStyle.contentContainer,
          styles.contentContainer,
          focus ? styles.content : null,
        ]}
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
                time={item.hours}
                arr={[...Allmessage].reverse()}
                date1={checkDate(index, item.date, Allmessage, item.message)}
              />
            </>
          )}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}
        >
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.sendMessageContainer}>
              <View style={styles.sendMessageInput}>
                <CustomInputFeild
                  visibility={true}
                  value={message}
                  setValues={txt => setMessage(txt)}
                  focus1={focus}
                  setFocus1={setFocus}
                  multiline={true}
                  style1={styles.messageInput}
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
  contentContainer: {
    paddingTop: 0,
  },
  content: {
    marginBottom: wp('10%'),
  },
  messageInput: {
    height: 100,
    background: 'red',
  },
});
export default ChatScreen;
