import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  Gutters,
} from '../../theme';
import { Colors, FontSize } from '../../theme/Variables';
const CustomInputFeild = ({
  title,
  required,
  setValues,
  error,
  values,
  icon,
  changeIcon,
  visibility,
  iconsecond,
  stylesCustom,
}) => {
  const [focus, setFocus] = useState(false);
  const [err, setErr] = useState(false);
  const [visible, setVisible] = useState(visibility == true ? false : true);
  const check = () => {
    if (values === undefined) {
      console.log('okk');
    } else {
      values.length ? setErr(false) : setErr(true);
    }
  };
  const visiblePassword = () => {
    setVisible(!visible);
  };
  return (
    <View style={[styles.customInputFeildContainer, stylesCustom, Gutters]}>
      <Text style={styles.customInputFeildLable}>
        {title}
        {required ? <Text style={styles.requiredSign}>*</Text> : null}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          multiline={true}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
            check();
          }}
          secureTextEntry={visible}
          style={[
            focus
              ? styles.customInputFeildFocus
              : styles.customInputFeildOnBlur,
            styles.customInputFeild,
          ]}
          value={values}
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

      <Text style={{ height: 15 }}>
        {err ? <Text style={styles.checkText}>required</Text> : null}
        <Text style={styles.checkText}>{error}</Text>
      </Text>
    </View>
  );
};
export default CustomInputFeild;
const styles = StyleSheet.create({
  customInputFeildContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '96%',
    height: hp('12%'),
    display: 'flex',
    marginTop: hp('.5%'),
    marginLeft: wp('3%'),
    marginBottom: hp('.5%'),
    justifyContent: 'space-between',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '98%',
    height: hp('6%'),
  },
  customInputFeildLable: {
    color: '#111',
    fontSize: FontSize.regular,
  },
  iconStyle: {
    position: 'absolute',
    alignSelf: 'center',
    right: wp('4%'),
  },
  requiredSign: {
    color: 'red',
    fontSize: FontSize.regular,
  },
  customInputFeildOnBlur: {
    borderWidth: 1,
  },
  customInputFeildFocus: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  customInputFeild: {
    backgroundColor: Colors.inputBackground,
    height: '100%',
    fontSize: FontSize.regular,
    paddingLeft: wp('3%'),
    color: '#111',
    flex: 1,
    alignItems: 'center',
    borderRadius: 4,
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
