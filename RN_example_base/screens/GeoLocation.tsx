import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  Alert,
  TouchableHighlight,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation/react-native-geolocation';
/*
 * 1. getDistance, Calculates the distance between
 *    two geo coordinates.
 * 2. getPreciseDistance, Calculates the distance between
 *    two geo coordinates. This method is more accurate then
 *    getDistance, especially for long distances but it is
 *    also slower. It is using the Vincenty inverse formula
 *    for ellipsoids.
 */
import {getDistance, getPreciseDistance} from 'geolib';

let watchID: any;

export const GeoLocation = () => {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
              buttonPositive: 'buttonPositive',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const calculateDistance = () => {
    var dis = getDistance(
      {latitude: 20.0504188, longitude: 64.4139099},
      {latitude: 51.528308, longitude: -0.3817765},
    );
    console.log('dis: ', dis);
    Alert.alert('Distance', `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
  };

  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: 20.0504188, longitude: 64.4139099},
      {latitude: 51.528308, longitude: -0.3817765},
    );
    Alert.alert(
      'Distance',
      `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`,
    );
  };

  const getOneTimeLocation = () => {
    console.log('chalcnsal');
    Geolocation.getCurrentPosition(
      info => console.log(info),
      error => {
        setLocationStatus(error.message);
      },
    );
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        // setLocationStatus('You are Here');
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change
        setLocationStatus('You are Here');
        console.log(position);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.boldText}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{marginTop: 20}}>
            <Button title="Button" onPress={getOneTimeLocation} />
          </View>
        </View>
        <Text style={styles.header}>
          Example to Calculate Distance Between Two Locations
        </Text>
        <Text style={styles.textStyle}>
          Distance between
          {'\n'}
          India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
        </Text>
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={calculateDistance}>
          <Text>Get Distance</Text>
        </TouchableHighlight>
        <Text style={styles.textStyle}>
          Precise Distance between
          {'\n'}
          India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
        </Text>
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={calculatePreciseDistance}>
          <Text>Get Precise Distance</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },

  // calculate distance between two location
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#dddddd',
    margin: 10,
  },
});
