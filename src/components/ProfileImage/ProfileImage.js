import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const ProfileImage = ({ setUrl, url }) => {
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setUrl(image.path);
    });
  };

  return (
    <>
      <TouchableOpacity onPress={() => uploadImage()}>
        <Image
          style={styles.ImageStyle}
          source={
            url
              ? { uri: url }
              : require('../../theme/assets/images/profileImageDefault.png')
          }
        />
        {url ? null : <Text> Upload image</Text>}
      </TouchableOpacity>
    </>
  );
};

export default ProfileImage;
const styles = StyleSheet.create({
  ImageStyle: { width: 100, height: 100, borderRadius: 100 },
});
