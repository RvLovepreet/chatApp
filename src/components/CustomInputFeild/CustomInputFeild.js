import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme';
import { Colors, FontSize } from '../../theme/Variables';
const { height, width } = Dimensions.get('window');
const CustomInputFeild = ({
  title,
  required,
  setValues,
  error,
  value,
  icon,
  visibility,
  iconsecond,
  customStyle,
  // focus1,
  // setFocus1,
  multiline,
}) => {
  const [focus, setFocus] = useState(false);
  const [err, setErr] = useState(false);
  const [visible, setVisible] = useState(visibility === true ? false : true);
  const check = () => {
    if (value === undefined) {
      console.log('okk');
    } else {
      value.length ? setErr(false) : setErr(true);
    }
  };
  const visiblePassword = () => {
    setVisible(!visible);
  };
  return (
    <View style={[styles.customInputFeildContainer]}>
      {title ? (
        <Text style={styles.customInputFeildLable}>
          {title}
          {required ? <Text style={styles.requiredSign}>*</Text> : null}
        </Text>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          multiline={multiline}
          onFocus={() => {
            // setFocus(true);
            // {
            //   setFocus1 ? setFocus1(true) : null;
            // }
          }}
          onBlur={() => {
            // setFocus(false);
            // {
            //   setFocus1 ? setFocus1(false) : null;
            // }
            // check();
          }}
          secureTextEntry={visible}
          style={
            [styles.inputFieldStyle, customStyle]
            //   [
            //   // focus
            //   //   ? styles.customInputFeildFocus
            //   //   : styles.customInputFeildOnBlur,
            //   // styles.customInputFeild(focus),
            // ]
          }
          value={value}
          onChangeText={txt => {
            setValues(txt);
            setErr(false);
          }}
        />
        {icon ? (
          <TouchableOpacity onPress={visiblePassword} style={styles.iconStyle}>
            <Text>{visible ? iconsecond : icon}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <Text style={{ height: 15 }}>
          {error && err ? <Text style={styles.checkText}>Required</Text> : null}
          <Text style={styles.checkText}>{error}</Text>
        </Text>
      ) : null}
    </View>
  );
};
export default CustomInputFeild;
const styles = StyleSheet.create({
  customInputFeildContainer: {
    flex: 1,

    /*       width: '96%',
    height: hp('12%'),
    marginTop: hp('.5%'),
    marginLeft: wp('3%'),
    marginBottom: hp('.5%'),
    justifyContent: 'space-between', */
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customInputFeildLable: {
    color: '#111',
    fontSize: FontSize.regular,
  },
  iconStyle: {
    position: 'absolute',
    alignSelf: 'center',
    right: 4,
  },
  requiredSign: {
    color: 'red',
    fontSize: FontSize.regular,
  },
  // customInputFeild: (value)=>{
  //  return {borderWidth: 1,
  //   borderColor: value ?  Colors.primary : "black",}
  // },
  inputFieldStyle: {
    height: height * 0.1,
    width: width * 0.9,
    borderWidth: 1,
    borderRadius: 4,
  },
  customInputFeild: value => {
    return {
      borderWidth: 1,
      width: '100%',
      height: '10%',
      alignItems: 'center',
      borderColor: value ? Colors.primary : 'black',
      backgroundColor: Colors.inputBackground,
      fontSize: FontSize.regular,

      // paddingLeft: wp('3%'),
      color: '#111',
      /*    flex: 1, */
      borderRadius: 4,
    };
  },
  validationText: {
    color: 'red',
    fontSize: hp('2%'),
  },
  checkText: {
    color: 'red',
    fontSize: 14,
  },
});
