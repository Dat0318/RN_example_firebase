import React, {useState} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
// Firebase Storage to upload file
import storage from '@react-native-firebase/storage';
// To pick the file from local file system
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const UploadFileScreen = () => {
  // State Defination
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState('');

  const _chooseFile = async () => {
    // Opening Document Picker to select one file
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      console.log('fileDetails : ', fileDetails);
      // Setting the state for selected File
      setFilePath(fileDetails);
    } catch (error) {
      setFilePath({});
      // If user canceled the document selection
      Alert.alert(
        'Warning',
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(error),
      );
    }
  };

  const getPathForFirebaseStorage = async (uri: string) => {
    if (Platform.OS === 'ios') {
      return uri;
    }
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  };

  const getPath = async (url: string) => {
    if (url.startsWith('content://')) {
      const uriComponents = url.split('/');
      const fileNameAndExtension = urlComponents[uriComponents.length - 1];
      const destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`;
      return await RNFS.copyFile(uri, destPath);
    }
  };

  const _uploadFile = async () => {
    try {
      // Check if file selected
      if (Object.keys(filePath).length == 0)
        return Alert.alert('Warning', 'Please Select any File');
      setLoading(true);

      // Create Reference
      // console.log(filePath.uri.replace('file://', ''));
      // console.log(filePath.name);
      const reference = storage().ref(`/myfiles/${filePath.name}`);

      // Put File
      // const task = reference.putFile(filePath.uri.replace('file://', ''));
      let uri = await getPathForFirebaseStorage(filePath.uri);
      const task = reference.putFile(uri);
      // You can do different operation with task
      console.log('===================================');
      console.log('task: ', task);
      console.log('===================================');
      // task.pause();
      // task.resume();
      // task.cancel();

      task.on('state_changed', taskSnapshot => {
        setProcess(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`,
        );
        console.log(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`,
        );
      });
      task.then(() => {
        Alert.alert('Warning', 'Image uploaded to the bucket!');
        setProcess('');
      });
      setFilePath({});
    } catch (error) {
      console.log('Error->', error);
      Alert.alert('Warning', `Error-> ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Upload Input Text as File on FireStorage
            </Text>
            <View style={styles.container}>
              <Text>Choose File and Upload to FireStorage</Text>
              <Text>{process}</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={_chooseFile}
              >
                <Text style={styles.buttonTextStyle}>
                  Choose Image (Current Selected:{' '}
                  {Object.keys(filePath).length == 0 ? 0 : 1})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={_uploadFile}
              >
                <Text style={styles.buttonTextStyle}>
                  Upload File on FireStorage
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default UploadFileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
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
