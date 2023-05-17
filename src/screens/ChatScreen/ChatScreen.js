import React, { useState, useEffect, useRef } from 'react';
import { Q } from '@nozbe/watermelondb';
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
import { CustomHeader, CustomLoader } from '../../components';
import { useSelector } from 'react-redux';
import { Constent } from '../../theme';
import { CustomInputFeild, CustomMessage } from '../../components';
import { ContainerStyle } from '../../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { Colors } from '../../theme/Variables';
import { database } from '../../..';

const ChatScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState('');
  const [focus, setFocus] = useState(false);
  const [Allmessage, setAllMessage] = useState([]);
  const [messageId, setMessageId] = useState(0);
  const [messageLoader, setMessageLoader] = useState(false);
  const [flatListRef, setFlatListRef] = useState(null);
  const myId = useSelector(data => data.user.key);

  const GUID = Constent.commetChat.group;
  let limit = 12;
  let LastMessage = 0;
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    realTimeMessage();
    alreadyMessage();
    /*     getChat(); */
    return () => {
      let listenerID = GUID;
      CometChat.removeMessageListener(listenerID);
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, []);

  const realTimeMessage = () => {
    let listenerID = GUID;
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: msg => {
          console.log('Text message received successfully', msg);
          console.log(msg.rawMessage);
          let obj = {
            message: msg.text,
            sender: msg.rawMessage.sender,
            sentAt: msg.rawMessage.sentAt,
            date: new Date(msg.rawMessage.sentAt * 1000).toDateString(),
            id: msg.id,
            hours: new Date(msg.rawMessage.sentAt * 1000).getHours(),
            minutes: new Date(msg.rawMessage.sentAt * 1000).getMinutes(),
          };
          console.log(obj, 'new message real time chat');
          /*     createChat(obj); */
          getChat();
          /*   setAllMessage([...Allmessage, obj]); */
        },
      }),
    );
  };

  const alreadyMessage = async () => {
    try {
      const chats = await database
        .get(Constent.databaseVariable.schemaChat)
        .query(Q.sortBy('sentAt', Q.asc));
      console.log(chats, 'local data ');
      const localChat = chats.map(chat => chat._raw);
      if (localChat.length) {
        LastMessage = localChat[localChat.length - 1].sentAt;
      }
      const messagesRequest = new CometChat.MessagesRequestBuilder()
        .setGUID(GUID)
        .setLimit(1)
        .build();
      try {
        const messages = await messagesRequest.fetchPrevious();
        console.log(messages[0].sentAt, 'dfasfa', LastMessage);
        if (!localChat.length || messages[0].sentAt !== LastMessage) {
          console.log('from commet Chat');
          /*       setMessageId(messageid); */
          getChat();
        } else {
          console.log('local Message 1');
          const messageid = Number(localChat[0].messageid);
          console.log(
            typeof messageid,
            'type of hello message id in else condition',
          );
          console.log(messageid, 'getchat from local db');
          setMessageId(messageid);
          console.log(localChat, 'local Chat in else condition');
          setAllMessage(localChat);
          setLoader(false);
        }
      } catch (err) {
        console.log(err, 'err');
      }
      /*   const ListMessageid = localChat[localChat.length - 1].messageid; */ // start from here
    } catch (err) {
      return false;
    }
  };

  const getChat = async () => {
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(limit)
      .build();
    try {
      const messages = await messagesRequest.fetchPrevious();
      let mes = messages.map(msg => {
        /*     console.log(msg.rawMessage.sentAt, 'message sent at', msg.text, msg.id); */
        let obj = {
          message: msg.text,
          sender: msg.rawMessage.sender,
          sentAt: msg.rawMessage.sentAt,
          date: new Date(msg.rawMessage.sentAt * 1000).toDateString(),
          id: msg.id,
          hours: new Date(msg.rawMessage.sentAt * 1000).getHours(),
          minutes: new Date(msg.rawMessage.sentAt * 1000).getMinutes(),
        };
        console.log(obj.sentAt, 'messageid', obj.id);
        createChat(obj);
        return obj;
      });
      const messageid = Number(messages[11].id - 11);
      console.log(messageid, 'dfads');
      setMessageId(messageid);
      setAllMessage(mes);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };
  const messageExist = async messageid1 => {
    try {
      const users = await database
        .get(Constent.databaseVariable.schemaChat)
        .query(Q.where('messageid', messageid1));
      console.log(users.length, 'message length');
      return users.length ? true : false;
    } catch (err) {
      return false;
    }
  };
  const saveInLocalDbMessages = async getChat => {
    try {
      const chats = database.collections.get(
        Constent.databaseVariable.schemaChat,
      );

      await database.write(async () => {
        await chats.create(chat => {
          chat.message = getChat.message;
          chat.date = getChat.date;
          chat.hours = getChat.hours;
          chat.minutes = getChat.minutes;
          chat.sender = getChat.sender;
          chat.messageid = getChat.id;
          chat.sentAt = getChat.sentAt;
        });
      });
      console.log(getChat.id, 'data saved!');
    } catch (error) {
      console.log(error);
    }
  };
  const createChat = async getChat => {
    try {
      const flag = await messageExist(getChat.id);
      console.log(flag, 'flag value');
      if (!flag) {
        await saveInLocalDbMessages(getChat);
        console.log('messages saved');
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getChat1 = async () => {
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setMessageId(messageId)
      .setLimit(limit)
      .build();
    try {
      setMessageLoader(true);
      const messages = await messagesRequest.fetchPrevious();
      let mes = messages.map(msg => {
        let obj = {
          message: msg.text,
          sender: msg.rawMessage.sender,
          sentAt: msg.rawMessage.sentAt,
          date: new Date(msg.rawMessage.sentAt * 1000).toDateString(),
          id: msg.id,
          hours: new Date(msg.rawMessage.sentAt * 1000).getHours(),
          minutes: new Date(msg.rawMessage.sentAt * 1000).getMinutes(),
        };
        console.log(obj, 'previous message in cometChat');
        saveInLocalDbMessages(obj);
        return obj;
      });
      const messageid = Number(messages[11].id - 11);
      console.log(messageid, 'message id in getChat11 pagination');
      setMessageId(messageid);
      setAllMessage([...mes, ...Allmessage]);
    } catch (err) {
      console.log(err);
    } finally {
      setMessageLoader(false);
    }
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
          setTimeout(() => flatListRef.scrollToIndex({ index: 0 }), 1000);
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
        customStyleForBtn={{
          width: wp('10%'),
          height: hp('8%'),
          borderWidth: 1,
          backgroundColor: 'red',
        }}
      />
      <View style={[ContainerStyle.contentContainer]}>
        {loader ? (
          <CustomLoader show={true} size={60} />
        ) : (
          <FlatList
            inverted
            ref={ref => setFlatListRef(ref)}
            style={styles.listStyle}
            data={[...Allmessage].reverse()}
            keyExtractor={item => item.id}
            onEndReached={getChat1}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => {
              return (
                <View style={styles.messageLoader}>
                  {messageLoader ? (
                    <CustomLoader show={true} size={20} />
                  ) : (
                    <></>
                  )}
                </View>
              );
            }}
            ListFooterComponentStyle={{ height: 50, width: 50 }}
            renderItem={({ item, index }) => (
              <CustomMessage
                myId={myId}
                message={item.message}
                sender={item.sender}
                time={item.hours}
                hours={item.hours}
                minutes={item.minutes}
                arr={[...Allmessage].reverse()}
                index={index}
                /* date1={true} */
              />
            )}
          />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}
        >
          <TouchableWithoutFeedback
            /*     style={{ flex: 1 }} */
            onPress={Keyboard.dismiss}
          >
            <View style={styles.sendMessageContainer}>
              <CustomInputFeild
                visibility={true}
                value={message}
                setValues={txt => setMessage(txt)}
                focus1={focus}
                setFocus1={setFocus}
                multiline={true}
                customStyle={{ width: wp('80%'), height: hp('8%') }}
              />

              <TouchableOpacity
                style={styles.sendMessageIcon}
                onPress={() => sendMessage()}
              >
                {Constent.Icons.send}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sendMessageContainer: {
    /*  borderWidth: 1, */
    width: wp('96%'),
    height: hp('8%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageLoader: {
    flex: 1,
    alignItems: 'center',
    width: wp('100%'),
  },
  listStyle: { width: wp('100%'), marginBottom: hp('2%') },
  sendMessageIcon: {
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginLeft: 3,
  },
  contentContainer: {
    paddingTop: 0,
  },
  content: {
    marginBottom: wp('10%'),
  },
});
export default ChatScreen;
