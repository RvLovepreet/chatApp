import React from 'react';
import { View } from 'react-native';
import { CustomHeader, CustomGroupComponent } from '../../components';
import { Constent } from '../../theme';
const Home = ({ navigation }) => {
  return (
    <View>
      <CustomHeader
        title={Constent.constent.Home}
        /*     goToBack={() => navigation.goBack()} */
      />
      <View>
        <CustomGroupComponent
          title="Group 1"
          onPress={() =>
            navigation.navigate(Constent.navigationScreens.ChatScreen)
          }
        />
      </View>
    </View>
  );
};
export default Home;
