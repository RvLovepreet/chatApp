import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '../../theme/Variables';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
const CustomMessage = ({
  message,
  sender,
  time,
  myId,
  date,
  index,
  date1,
  arr,
}) => {
  const getTime = (hours, minutes) => {
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const getDay = date => {
    const date1 = new Date(date).getDate();
    const today = new Date().getDate();
    const yesterday = new Date().getDate() - 1;
    if (date1 === today) {
      console.log('todday');
      return 'Today';
    } else if (date1 === yesterday) {
      return 'Yesterday';
    } else {
      return new Date(date).toLocaleDateString();
    }
    /* console.log(date1, 'dsafdsfa');
    return null; */
  };
  const checkDate = () => {
    console.log(arr.length, 'index');
    console.log(index, message, 'hjello');
    if (index == arr.length - 1) {
      console.log('dsfaefjdsk');
      return getDay(arr[index].date);
    } else if (index > 0) {
      const indx =
        new Date(arr[index].date).getDate() -
        new Date(arr[index - 1].date).getDate();
      const date2 = indx == 0 ? null : getDay(arr[index - 1].date);
      return date2;
    }
  };
  return (
    <>
      {date1 ? (
        <View style={styles.messageDateContainer}>
          <Text style={styles.messageDate}>{date1}</Text>
          <Text style={styles.messageDate}>{checkDate()}</Text>
        </View>
      ) : null}
      <View
        style={[
          styles.messageContainer,
          sender === myId ? styles.sender : styles.receiver,
        ]}
      >
        <Text style={styles.senderStyle}>{sender}</Text>
        <Text style={styles.messageSyle}>{message}</Text>
        <Text style={styles.messageSyle}>{date}</Text>
        <Text style={styles.timeSyle}>{getTime(time[0], time[1])}</Text>
      </View>
    </>
  );
};
export default CustomMessage;
const styles = StyleSheet.create({
  messageDateContainer: {
    backgroud: 'red',
    display: 'flex',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  messageDate: {
    paddingLeft: hp('3%'),
    paddingRight: hp('3%'),
    paddingTop: hp('.5%'),
    paddingBottom: hp('.5%'),
    borderRadius: 20,
    backgroundColor: Colors.white,
    color: Colors.text,
    fontSize: FontSize.small,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.13,
    shadowRadius: 9.51,
    elevation: 15,
  },
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
  timeSyle: {
    alignSelf: 'flex-end',
    fontSize: FontSize.tiny,
    color: Colors.text,
  },
});
