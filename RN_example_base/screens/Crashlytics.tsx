import React, {useEffect, useState} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import crashlytics from '@react-native-firebase/crashlytics';

export const Crashlytics = () => {
  const [userCounts, setUserCounts] = useState(null);

  useEffect(() => {
    crashlytics().log('Crashlytics mounted.');
  }, []);

  const logCrashlytics = async () => {
    crashlytics().log('Dummy Details Added');
    await Promise.all([
      crashlytics().setUserId('101'),
      crashlytics().setAttribute('credits', String(50)),
      crashlytics().setAttributes({
        email: 'datd@vmodev.com',
        username: 'datd',
      }),
    ]);
  };

  const logCrash = async user => {
    crashlytics().crash();
  };

  const logError = async user => {
    crashlytics().log('Updating user count.');
    try {
      if (users) {
        // An empty array is truthy, but not actually true.
        // Therefore the array was never initialised.
        setUserCounts(userCounts.push(users.length));
      }
    } catch (error) {
      crashlytics().recordError(error);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        How to Add Firebase Crashlytics in React Native Crashlytics
      </Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => logCrashlytics()}
        >
          <Text style={styles.buttonTextStyle}>Log User Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={logCrash}
        >
          <Text style={styles.buttonTextStyle}>Log Crash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={logError}
        >
          <Text style={styles.buttonTextStyle}>Log Error</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Crashlytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 35,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
    width: '100%',
    marginTop: 16,
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
