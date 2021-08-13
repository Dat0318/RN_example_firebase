import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const List = () => {
  const navigation = useNavigation();

  const _navigate = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonTtl}>
        <Text style={styles.buttonText}>Firebase Example</Text>
      </View>
      <TouchableOpacity
        onPress={() => _navigate('Analytics')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Auth')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Auth</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Login')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>FirebaseAuth</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('CacheImage')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>CacheImage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('FileStore')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>FileStore</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('InAppMessage')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>InAppMessage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Storage')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Firebase Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Crashlytics')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Crashlytics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Analytics')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('AdMod')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>AdMod</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('DynamicLinks')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>DynamicLinks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Performance')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Performance</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('RealTime')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>RealTime</Text>
      </TouchableOpacity>

      <View style={styles.buttonTtl}>
        <Text style={styles.buttonText}>About React</Text>
      </View>
      <TouchableOpacity
        onPress={() => _navigate('PDF')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Map')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('You')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>You</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Ama')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Ama</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Print')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Print</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => _navigate('Drive')}
        onPress={() => _navigate('GoogleLoginScreen')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Drive</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Lang')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Lang</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('GeoLocation')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>GeoLocation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('ImageMapper')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>ImageMapper</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('SwipeCard')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>SwipeCard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('AlphabetContacts')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>AlphabetContacts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Accordion')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Accordion</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('AlphabetContacts')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>AlphabetContacts</Text>
      </TouchableOpacity>

      <View style={styles.buttonTtl}>
        <Text style={styles.buttonText}>Useful Component</Text>
      </View>
      <TouchableOpacity
        onPress={() => _navigate('PieChart')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>PieChart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('ChartKit')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>ChartKit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('GenQR')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>GenQR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('ShareQR')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>ShareQR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Md5')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Md5</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('RnSound')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>RnSound</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('RnVideo')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>RnVideo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('TextToSpeed')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>TextToSpeed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('SpeedToText')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>SpeedToText</Text>
      </TouchableOpacity>

      <View style={styles.buttonTtl}>
        <Text style={styles.buttonText}>Some Function</Text>
      </View>
      <TouchableOpacity
        onPress={() => _navigate('Brightness')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Brightness</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('RnKeepAwake')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>RnKeepAwake</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Signature')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Signature</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('RnSendSMS')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>RnSendSMS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('CallDetective')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>CallDetective</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('RnCommunity')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>RnCommunity</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('CallLogAndroid')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>CallLogAndroid</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('RnRealm')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>RnRealm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'lightblue',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonTtl: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ca89f3',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
