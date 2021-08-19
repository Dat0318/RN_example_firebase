// AIzaSyArZMO63HR3rgj3p52FeFkpc_unA8ZNQWw
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapboxGL, {Logger} from '@react-native-mapbox-gl/maps';
import MapView, {Marker, Callout, Polygon, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import isPointInPolygon from 'geolib/es/isPointInPolygon';

export const MARKER = require('./Drive/marker.png');
export const MARKER_WITH_IMAGE = require('./Drive/Marker_With_Image.png');
export const RED_DOT = require('./Drive/Marker_With_Image.png');

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZGF0dGQiLCJhIjoiY2tzM2l3eTJ4MG43bDJ4bGl0MWQyaTB3MSJ9.6j89AM1BiwLVvmtqyDFuJw',
);

Logger.setLogCallback(log => {
  const {message} = log;
  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

export const Map = () => {
  let mapView = useRef<MapboxGL.MapView>();
  let mapCamera = useRef<MapboxGL.Camera>();
  const [position, setPosition] = useState({
    lat: 37.77925,
    long: -122.4634,
  });

  let LATITUDE = position.lat,
    LONGITUDE = position.long,
    LATITUDE_DELTA = 0.0922,
    LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  let polygon = [
      {
        latitude: position.lat + LATITUDE_DELTA / 3,
        longitude: position.long + LONGITUDE_DELTA / 4,
      },
      {
        latitude: position.lat - LATITUDE_DELTA / 3,
        longitude: position.long + LONGITUDE_DELTA,
      },
      {
        latitude: position.lat - LATITUDE_DELTA / 4,
        longitude: position.long - LONGITUDE_DELTA / 2,
      },
      {
        latitude: position.lat + LATITUDE_DELTA / 8,
        longitude: position.long - LONGITUDE_DELTA / 2,
      },
    ],
    pointIn = {
      latitude: position.lat,
      longitude: position.long,
    },
    point = {
      latitude: position.lat - 0.0922 / 3,
      longitude: position.long - 0.0922 / 3,
    };

  const startingPoint = [3.33624, 6.57901];

  let current = {
      id: 'abocancl',
      // longitude: -142.4424,
      // latitude: 0.1922,
      latitude: 37.78825,
      longitude: -122.4324,
    },
    data = {
      type: 'Feature',
      id: current.id,
      geometry: {
        type: 'Point',
        coordinates: [current.latitude, current.longitude],
      },
    };

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
    getLocation();
    checkPoint();
  }, []);

  const checkPoint = () => {
    let check_point = isPointInPolygon(point, polygon);
    let check_point_in = isPointInPolygon(pointIn, polygon);
    console.log('===check_point=============check_point_in===================');
    console.log(check_point, check_point_in);
    console.log('===================================');
  };

  const onRegionChange = e => {
    // console.log('onRegionChange: ', e);
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        // console.log(pos);
        const currentLongitude = JSON.stringify(pos.coords.longitude);
        const currentLatitude = JSON.stringify(pos.coords.latitude);
        setPosition({
          lat: Number(currentLatitude),
          long: Number(currentLongitude),
        });
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <TouchableOpacity style={styles.buttonScroll} onPress={getLocation}>
          <Text>Get current location</Text>
        </TouchableOpacity>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: position.lat,
            longitude: position.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // initialRegion={{
          //   latitude: position.lat,
          //   longitude: position.long,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          onRegionChange={onRegionChange}
          customMapStyle={MapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: position.lat - 0.0922 / 3,
              longitude: position.long - 0.0922 / 3,
            }}
            image={RED_DOT}
          />
          <Marker
            draggable
            coordinate={{
              latitude: position.lat,
              longitude: position.long,
            }}
            onDragEnd={e =>
              Alert.alert('Title', JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
            // opacity={0.6}
            image={RED_DOT}>
            <Callout style={styles.plainView}>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </Callout>
          </Marker>
          <Polygon
            fillColor={'rgba(255,0,0,0.3)'}
            onPress={e => {
              console.log('========================', e);
            }}
            tappable
            coordinates={[
              {
                latitude: position.lat + LATITUDE_DELTA / 3,
                longitude: position.long + LONGITUDE_DELTA / 4,
              },
              {
                latitude: position.lat - LATITUDE_DELTA / 3,
                longitude: position.long + LONGITUDE_DELTA,
              },
              {
                latitude: position.lat - LATITUDE_DELTA / 4,
                longitude: position.long - LONGITUDE_DELTA / 2,
              },
              {
                latitude: position.lat + LATITUDE_DELTA / 8,
                longitude: position.long - LONGITUDE_DELTA / 2,
              },
            ]}
          />
          <Polyline
            strokeColor={'rgba(255,0,0,1)'}
            onPress={e => {
              console.log('========================', e);
            }}
            tappable
            coordinates={[
              {
                latitude: LATITUDE + LATITUDE_DELTA / 5,
                longitude: LONGITUDE - LONGITUDE_DELTA / 4,
              },
              {
                latitude: LATITUDE + LATITUDE_DELTA / 3,
                longitude: LONGITUDE - LONGITUDE_DELTA / 4,
              },
              {
                latitude: LATITUDE + LATITUDE_DELTA / 4,
                longitude: LONGITUDE - LONGITUDE_DELTA / 2,
              },
              {
                latitude: LATITUDE + LATITUDE_DELTA / 6,
                longitude: LONGITUDE - LONGITUDE_DELTA / 4,
              },
            ]}
          />
        </MapView>
        <View style={styles.buttonScroll}>
          <Text>Next Map</Text>
        </View>

        <MapboxGL.MapView
          style={styles.mapStyle}
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={16}
          centerCoordinate={[3.33624, 6.57901]}
          showUserLocation={true}>
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={[3.33624, 6.57901]}
          />
          <MapboxGL.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={startingPoint}>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: '#00cccc',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 3,
              }}
            />
          </MapboxGL.PointAnnotation>
        </MapboxGL.MapView>
        <View style={styles.buttonScroll}>
          <Text>Next Map</Text>
        </View>

        <MapboxGL.MapView
          //@ts-ignore
          ref={mapView}
          compassEnabled={false}
          style={styles.mapStyle}
          styleURL={MapboxGL.StyleURL.Dark}>
          <MapboxGL.Camera
            ref={mapCamera}
            // animationDuration={400}
            zoomLevel={17}
            centerCoordinate={[current.longitude, current.latitude]}
          />
          <MapboxGL.ShapeSource
            id="shapeSource"
            // clusterMaxZoomLevel={12}
            onPress={item => {
              let {coordinates} = item;
              let features: any = item.features;
              let markerData = features[0].properties;
              if (markerData.type !== 'user') {
                // setMarker({
                //   address: markerData.address,
                //   id: features[0].id,
                //   latitude: Number(coordinates.latitude),
                //   longitude: Number(coordinates.longitude),
                //   title: markerData.title,
                //   image: ""
                // })
                // setCurrent({
                //   latitude: Number(coordinates.latitude),
                //   longitude: Number(coordinates.longitude),
                // })
                // mapCamera.current?.setCamera({
                //   centerCoordinate: [
                //     Number(features[0].geometry.coordinates[0]),
                //     Number(features[0].geometry.coordinates[1]),
                //   ],
                //   zoomLevel: 18,
                //   animationDuration: 400,
                // });
                // loadLocation({
                //   address: markerData.address,
                //   id: features[0].id,
                //   latitude: Number(coordinates.latitude),
                //   longitude: Number(coordinates.longitude),
                //   title: markerData.title,
                //   image: '',
                // });
              }
            }}
            shape={data}>
            <MapboxGL.SymbolLayer
              // aboveLayerID='userMarker'
              filter={['==', 'type', 'nonImg']}
              id="markerWithoutImg"
              style={{
                iconImage: MARKER,
                iconSize: 1,
                textField: ['get', 'title'],
                textSize: 12,
                textColor: 'purple',
                iconAnchor: 'bottom',
                textAnchor: 'top',
              }}
            />
            <MapboxGL.SymbolLayer
              aboveLayerID="markerWithoutImg"
              filter={['==', 'type', 'hasImg']}
              id="markerWithImg"
              style={{
                iconImage: MARKER_WITH_IMAGE,
                iconSize: 1,
                textField: ['get', 'title'],
                textColor: 'purple',
                textSize: 12,
                iconAnchor: 'bottom',
                textAnchor: 'top',
              }}
            />
            <MapboxGL.SymbolLayer
              minZoomLevel={13.5}
              // aboveLayerID='markerWithoustImg'
              filter={['==', 'type', 'user']}
              id="userMarker"
              style={{
                iconImage: RED_DOT,
                iconSize: 1,
              }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        <View style={styles.buttonScroll}>
          <Text>Next Map</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

const styles = StyleSheet.create({
  mapStyle: {
    height: 600,
    width: '100%',
  },
  buttonScroll: {
    flexGrow: 1,
    height: 50,
    backgroundColor: 'lightblue',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plainView: {
    width: 150,
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
