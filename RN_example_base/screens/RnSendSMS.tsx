import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import SendSMS from 'react-native-sms';

export const RnSendSMS = () => {
  const [mobileNumber, setMobileNumber] = useState('0963606382');
  const [bodySMS, setBodySMS] = useState(
    'Please follow https://aboutreact.com',
  );
  const [whatsAppMsg, setWhatsAppMsg] = useState(
    'Please follow https://aboutreact.com',
  );

  const initiateWhatsApp = () => {
    // Check for perfect 10 digit length
    if (mobileNumber.length != 10) {
      Alert.alert('Warning', 'Please insert correct WhatsApp number');
      return;
    }
    // Using 91 for India
    // You can change 91 with your country code
    let url =
      'whatsapp://send?text=' + whatsAppMsg + '&phone=91' + mobileNumber;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Alert.alert('Warning', 'Make sure Whatsapp installed on your device');
      });
  };

  const initiateSMS = () => {
    // Check for perfect 10 digit length
    if (mobileNumber.length != 10) {
      Alert.alert('Warning', 'Please insert correct contact number');
      return;
    }

    SendSMS.send(
      {
        // Message body
        body: bodySMS,
        // Recipients Number
        recipients: [mobileNumber],
        // An array of types
        // "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Example to Send Text SMS on Button Click in React Native
        </Text>
        <Text style={styles.titleTextsmall}>Enter Mobile Number</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
          placeholder={'Enter Conatct Number to Call'}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <Text style={styles.titleTextsmall}>Enter SMS body</Text>
        <TextInput
          value={bodySMS}
          onChangeText={bodySMS => setBodySMS(bodySMS)}
          placeholder={'Enter SMS body'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={initiateSMS}
        >
          <Text style={styles.buttonTextStyle}>Send Message</Text>
        </TouchableOpacity>

        {/* WhatsApp Example */}
        <Text style={styles.titleTextsmall}>WhatsApp Message</Text>
        <TextInput
          value={whatsAppMsg}
          onChangeText={whatsAppMsg => setWhatsAppMsg(whatsAppMsg)}
          placeholder={'WhatsApp Message'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={initiateWhatsApp}
        >
          <Text style={styles.buttonTextStyle}>Send WhatsApp Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RnSendSMS;

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
