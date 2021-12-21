import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const Drive = ({navigation, route}) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {}, []);

  const _signOut = async () => {
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
      navigation.replace('GoogleLoginScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          {userInfo ? (
            <Image
              source={{uri: userInfo.user.photo}}
              style={styles.imageStyle}
            />
          ) : null}
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text}>
              User Name: {userInfo ? userInfo.user.name : ''}
            </Text>
            <Text style={styles.text}>
              Use Email: {userInfo ? userInfo.user.email : ''}
            </Text>
          </View>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('GDUploadFileScreen')}
          >
            <Text>Select and Upload File on Google Drive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              navigation.navigate('GDFilesListingScreen', {type: 'all'})
            }
          >
            <Text>Listing of Files from Google Drive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              navigation.navigate('GDFilesListingScreen', {type: 'filtered'})
            }
          >
            <Text style={{textAlign: 'center'}}>
              Get Specific File Content from Google Drive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('GDSingleFileScreen')}
          >
            <Text style={{textAlign: 'center'}}>
              Get Single File Content from Google Drive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('GDDeleteFileScreen')}
          >
            <Text>Delete any File from Google Drive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('GDDownloadFileScreen')}
          >
            <Text>Download File from Google Drive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={_signOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 16,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});
