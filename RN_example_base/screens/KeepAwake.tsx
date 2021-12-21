import React, {useState, useCallback} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  Alert,
  Linking,
} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
const DURATION = 1000;

export const RnKeepAwake = () => {
  //Default Keep Awake off
  const [keepScreenAwake, setKeepScreenAwake] = useState(false);

  const changeKeepAwake = shouldBeAwake => {
    //To keep screen awake using function Calling
    setKeepScreenAwake(shouldBeAwake);
    if (shouldBeAwake) {
      //Calling the Activate function to Active Keep awake and
      //Make the Screen On for infinite time
      KeepAwake.activate();
      Alert.alert('Warning', 'Screen will be awake for infinite time');
    } else {
      //Calling the deactivate function to Deactive Keep awake
      KeepAwake.deactivate();
      Alert.alert('Warning', 'Screen awake time will become normal now');
    }
  };

  const changeKeepAwakeComponenet = shouldBeAwake => {
    //To keep screen awake using Compoenent
    setKeepScreenAwake(shouldBeAwake);
    if (shouldBeAwake) {
      Alert.alert('Warning', 'Screen will be awake for infinite time');
    } else {
      Alert.alert('Warning', 'Screen awake time will become normal now');
    }
  };
  const startVibration = () => {
    //To start the vibration for the defined Duration
    Vibration.vibrate(DURATION);
  };

  const stopVibration = () => {
    //To Stop the vibration
    Vibration.cancel();
  };

  const _openAppSetting = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>
          Keep Screen Awake for Infinite Time in React Native
        </Text>
        {keepScreenAwake ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={() => changeKeepAwake(false)}
          >
            <Text style={styles.buttonTextStyle}>
              Make Screen Normal by Calling Function
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={() => changeKeepAwake(true)}
          >
            <Text style={styles.buttonTextStyle}>
              Keep Screen Awake by Calling Function
            </Text>
          </TouchableOpacity>
        )}

        {keepScreenAwake ? (
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonStyle}
              onPress={() => changeKeepAwakeComponenet(false)}
            >
              <Text style={styles.buttonTextStyle}>
                Make Screen Normal using Component
              </Text>
            </TouchableOpacity>
            <KeepAwake />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={() => changeKeepAwakeComponenet(true)}
          >
            <Text style={styles.buttonTextStyle}>
              Keep Screen Awake using Component
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={startVibration}
        >
          <Text style={styles.buttonTextStyle}>Start Vibration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={stopVibration}
        >
          <Text style={styles.buttonTextStyle}>Stop Vibration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={_openAppSetting}
        >
          <Text style={styles.buttonTextStyle}>Open the Settings App</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RnKeepAwake;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});
