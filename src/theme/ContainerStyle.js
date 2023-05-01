import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from '.';
export const ContainerStyle = StyleSheet.create({
  MainContainer: { height: hp('100%') },
  contentContainer: {
    height: hp('90%'),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
