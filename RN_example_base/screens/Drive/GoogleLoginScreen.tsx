import React, {useState, useEffect} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

// For Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleLoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      // scopes: [
      //   'https://www.googleapis.com/auth/drive',
      //   'https://www.googleapis.com/auth/drive.file',
      //   'https://www.googleapis.com/auth/drive.appdata',
      //   'https://www.googleapis.com/auth/drive.metadata',
      //   'https://www.googleapis.com/auth/drive.readonly',
      //   'https://www.googleapis.com/auth/drive.metadata.readonly',
      //   'https://www.googleapis.com/auth/drive.apps.readonly',
      //   'https://www.googleapis.com/auth/drive.photos.readonly',
      // ],
      // Repleace with your webClientId
      // Generated from Firebase console
      iosClientId:
        '484309648056-nsgjvru8j0ci8citnlmt69n7a7cok5bs.apps.googleusercontent.com',
      // '288544714178-k0945ejbic6ok1p32pfhg8camljpimlg.apps.googleusercontent.com',
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '484309648056-tk1005t6fp1rvnjn4ifg9o0ghn3rpsth.apps.googleusercontent.com',
      // '288544714178-dpjkjc1s38ldgsisl3fei81l3ar2r3o4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  // To prompt google Signin Widget
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      navigation.replace('Drive', {userInfo: userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Title', 'User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Title', 'Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Title', 'Play Services Not Available or Outdated');
      } else {
        console.log('error.message', JSON.stringify(error));
        Alert.alert('Title', error.message);
      }
    }
  };

  // Check if User is signned in or not?
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      console.log('User is already signed in');
      // Get User Info if user is already signed in
      try {
        let info = await GoogleSignin.signInSilently();
        console.log('User Info --> ', info);
        navigation.replace('Drive', {userInfo: info});
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          Alert.alert('Title', 'User has not signed in yet');
          console.log('User has not signed in yet');
        } else {
          Alert.alert('Title', "Unable to get user's info");
          console.log("Unable to get user's info", error);
        }
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Store / Retrieve Files from Google Drive using React Native App
          </Text>
          <View style={styles.container}>
            <GoogleSigninButton
              style={{width: 312, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={_signIn}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default GoogleLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
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
