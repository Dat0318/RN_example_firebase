import React, {useState} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

// For Google Signin
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// For Google Drive
// import GDrive from '@robinbobin/react-native-google-drive-api-wrapper';
import GDrive from 'react-native-google-drive-api-wrapper';
// To manage local files
import RNFS from 'react-native-fs';
// To pick the file from local file system
import DocumentPicker from 'react-native-document-picker';

const APP_DIRECTORY = 'AboutReactAppExample';

const GDUploadFileScreen = () => {
  // State Defination
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [inputTextValue, setInputTextValue] = useState('');

  const _chooseFile = async () => {
    // Opening Document Picker to select one file
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      console.log('fileDetails : ' + JSON.stringify(fileDetails));
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

  const _initGoogleDrive = async () => {
    // Getting Access Token from Google
    let token = await GoogleSignin.getTokens();
    console.log('token: ', token);
    if (!token) return Alert.alert('Warning', 'Failed to get token');
    console.log('res.accessToken 1=>', token?.accessToken);
    // Setting Access Token
    GDrive.setAccessToken(token?.accessToken);
    // Initializing Google Drive and confirming permissions
    GDrive.init();
    // Check if Initialized
    return GDrive.isInitialized();
  };

  const _uploadDriveDataImage = async () => {
    try {
      // Check if file selected
      if (Object.keys(filePath).length == 0)
        return Alert.alert('Warning', 'Please Select any File');
      setLoading(true);
      if (!(await _initGoogleDrive())) {
        return Alert.alert('Warning', 'Failed to Initialize Google Drive');
      }
      // Convert Selected File into base64
      let fileContent = await RNFS.readFile(filePath.uri, 'base64');
      // console.log('fileContent -> ', JSON.stringify(fileContent));
      // Create Directory on Google Device
      let directoryId = await GDrive.files.safeCreateFolder({
        name: APP_DIRECTORY,
        parents: ['root'],
      });
      console.log('directoryId -> ', directoryId);
      // Create Multipart and Upload
      let result = await GDrive.files.createFileMultipart(
        fileContent,
        filePath.type,
        {
          parents: [directoryId],
          name: filePath.name,
        },
        true,
      );
      // Check upload file response for success
      if (!result.ok) return Alert.alert('Warning', 'Uploading Failed');
      // Getting the uploaded File Id
      let fileId = await GDrive.files.getId(
        filePath.name,
        [directoryId],
        filePath.type,
        false,
      );
      Alert.alert('Warning', `Uploaded Successfull. File Id: ${fileId}`);
      setFilePath({});
    } catch (error) {
      console.log('Error->', error);
      Alert.alert('Warning', `Error-> ${error}`);
    }
    setLoading(false);
  };

  const _uploadDriveData = async () => {
    try {
      // Check if file selected
      if (!inputTextValue)
        return Alert.alert('Warning', 'Please Enter Some Input');
      setLoading(true);
      if (!(await _initGoogleDrive())) {
        return Alert.alert('Warning', 'Failed to Initialize Google Drive');
      }
      // Create Directory on Google Device
      let directoryId = await GDrive.files.safeCreateFolder({
        name: APP_DIRECTORY,
        parents: ['root'],
      });
      console.log('directoryId -> ', directoryId);
      let fileName = new Date().getTime() + '.txt';
      // Check upload file response for success
      let result = await GDrive.files.createFileMultipart(
        inputTextValue,
        'application/text',
        {
          parents: [directoryId],
          name: fileName,
        },
        false,
      );
      // Check upload file response for success
      if (!result.ok) return Alert.alert('Warning', 'Uploading Failed');
      // Getting the uploaded File Id
      let fileId = await GDrive.files.getId(
        fileName,
        [directoryId],
        'application/text',
        false,
      );
      setInputTextValue('');
      Alert.alert('Warning', `Uploaded Successfull. File Id: ${fileId}`);
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
              Upload Input Text as File on Google Drive
            </Text>
            <View style={styles.container}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Please Enter Text to Upload as a File"
                onChangeText={input => setInputTextValue(input)}
                value={inputTextValue}
              />
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={_uploadDriveData}>
                <Text>uploadDriveFile</Text>
              </TouchableOpacity>
              <View style={styles.deviderContainer}>
                <View style={styles.devider} />
                <Text>OR</Text>
                <View style={styles.devider} />
              </View>
              <Text style={styles.titleText}>
                Choose File and Upload to Google Drive
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={_chooseFile}>
                <Text style={styles.textStyleWhite}>
                  Choose Image (Current Selected: {filePath.uri ? 1 : 0})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={_uploadDriveDataImage}>
                <Text>uploadDriveDataImage</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default GDUploadFileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 20,
    height: 30,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
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
  deviderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  devider: {
    width: 150,
    height: 1,
    marginHorizontal: 16,
    backgroundColor: 'grey',
  },
  inputStyle: {
    height: 40,
    width: 300,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
  },
});
