import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  NativeModules,
  PermissionsAndroid,
  Alert,
} from 'react-native';

var DirectSms = NativeModules.DirectSms;

export const SendSMS = () => {
  // Setting up States
  const [mobileNumber, setMobileNumber] = useState('0963606382');
  const [bodySMS, setBodySMS] = useState('Example send message');

  // async function to call the Java native method
  const sendDirectSms = async () => {
    if (mobileNumber) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: 'Send SMS SendSMS Sms Permission',
            message:
              'Send SMS SendSMS needs access to your inbox ' +
              'so you can send messages in background.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          DirectSms.sendDirectSms(mobileNumber, bodySMS);
          Alert.alert('Warning', 'SMS sent');
        } else {
          Alert.alert('Warning', 'SMS permission denied');
        }
      } catch (error) {
        console.warn(error);
        Alert.alert('Warning', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          React Native Bridge Example for Android to Send Direct SMS
        </Text>
        <Text style={styles.titleTextsmall}>Enter Recipients Number</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
          placeholder={'Enter Conatct Number to Call'}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <Text style={styles.titleTextsmall}>Enter SMS Body</Text>
        <TextInput
          value={bodySMS}
          onChangeText={bodySMS => setBodySMS(bodySMS)}
          placeholder={'Enter SMS body'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={sendDirectSms}>
          <Text style={styles.buttonTextStyle}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});
