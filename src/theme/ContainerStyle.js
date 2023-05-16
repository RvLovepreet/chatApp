import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../theme';
export const ContainerStyle = StyleSheet.create({
  MainContainer: { flex: 1 },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: hp('0'),
    paddingBottom: hp('0'),
  },
});
