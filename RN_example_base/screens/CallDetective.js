import React, {useState} from 'react';

//Import required component
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';

//Import Call Detector
// import CallDetectorManager from 'react-native-call-detection';

export const CallDetective = () => {
  //to keep callDetector reference
  let callDetector = undefined;

  let [callStates, setCallStates] = useState([]);
  let [isStart, setIsStart] = useState(false);
  let [flatListItems, setFlatListItems] = useState([]);

  const callFriendTapped = () => {
    Linking.openURL('tel:5555555555').catch(err => {
      console.log(err);
    });
  };

  const startStopListener = () => {
    if (isStart) {
      console.log('Stop');
      callDetector && callDetector.dispose();
    } else {
      console.log('Start');
      // callDetector = new CallDetectorManager(
      //   (event, number) => {
      //     console.log('event -> ', event + (number ? ' - ' + number : ''));
      //     var updatedCallStates = callStates;
      //     updatedCallStates.push(event + (number ? ' - ' + number : ''));
      //     setFlatListItems(updatedCallStates);
      //     setCallStates(updatedCallStates);

      //     // For iOS event will be either "Connected",
      //     // "Disconnected","Dialing" and "Incoming"

      //     // For Android event will be either "Offhook",
      //     // "Disconnected", "Incoming" or "Missed"
      //     // phoneNumber should store caller/called number

      //     if (event === 'Disconnected') {
      //       // Do something call got disconnected
      //     } else if (event === 'Connected') {
      //       // Do something call got connected
      //       // This clause will only be executed for iOS
      //     } else if (event === 'Incoming') {
      //       // Do something call got incoming
      //     } else if (event === 'Dialing') {
      //       // Do something call got dialing
      //       // This clause will only be executed for iOS
      //     } else if (event === 'Offhook') {
      //       //Device call state: Off-hook.
      //       // At least one call exists that is dialing,
      //       // active, or on hold,
      //       // and no calls are ringing or waiting.
      //       // This clause will only be executed for Android
      //     } else if (event === 'Missed') {
      //       // Do something call got missed
      //       // This clause will only be executed for Android
      //     }
      //   },
      //   true, // To detect incoming calls [ANDROID]
      //   () => {
      //     // If your permission got denied [ANDROID]
      //     // Only if you want to read incoming number
      //     // Default: console.error
      //     console.log('Permission Denied by User');
      //   },
      //   {
      //     title: 'Phone State Permission',
      //     message:
      //       'This CallDetective needs access to your phone state, in order to react and/or to adapt to incoming calls.',
      //   },
      // );
    }
    setIsStart(!isStart);
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#ebebeb',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTextLarge}>
            Example to detect call states
          </Text>
          <Text style={styles.headerText}>www.aboutreact.com</Text>
        </View>
        <FlatList
          style={{flex: 1}}
          data={flatListItems}
          ItemSeparatorComponent={listSeparator}
          renderItem={({item}) => (
            <View style={{flex: 1}}>
              <Text style={styles.callLogs}>{JSON.stringify(item)}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.button} onPress={startStopListener}>
          <Text style={styles.buttonText}>
            {isStart ? 'Stop Listner' : 'Start Listener'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={callFriendTapped}
          style={styles.fabStyle}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_phone.png',
            }}
            style={styles.fabImageStyle}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CallDetective;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#ff8c21',
    padding: 10,
  },
  headerTextLarge: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  headerText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff8c21',
    padding: 10,
    justifyContent: 'center',
    height: 60,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  callLogs: {
    padding: 16,
    fontSize: 16,
    color: '#333333',
  },
  fabStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: 'yellow',
  },
  fabImageStyle: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});
