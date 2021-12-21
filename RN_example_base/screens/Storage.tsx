import React from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export const Storage = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>
          Uploading Files and Images to Firebase Cloud Storage in React Native
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => props.navigation.navigate('UploadFileScreen')}
        >
          <Text style={styles.buttonTextStyle}>Upload File</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => props.navigation.navigate('FilesListingScreen')}
        >
          <Text style={styles.buttonTextStyle}>Uploaded File Listing</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Storage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 35,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
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
