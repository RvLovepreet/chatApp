import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from '.';
export const ContainerStyle = StyleSheet.create({
  MainContainer: { height: hp('100%') },
  contentContainer: {
    height: hp('80%'),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: hp('2%'),
  },
});
