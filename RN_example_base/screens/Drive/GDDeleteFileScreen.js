import React, {useState, useEffect} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';

// For Google Signin
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// For Google Drive
// import GDrive from '@robinbobin/react-native-google-drive-api-wrapper';
import GDrive from 'react-native-google-drive-api-wrapper';

const APP_DIRECTORY = 'AboutReactAppExample';

const GDDeleteFileScreen = () => {
  // State Defination
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _getAllMyAppFilesList();
  }, []);

  const _initGoogleDrive = async () => {
    // Getting Access Token from Google
    let token = await GoogleSignin.getTokens();
    if (!token) return alert('Failed to get token');
    console.log('res.accessToken 2=>', token?.setAccessToken);
    // Setting Access Token
    GDrive.setAccessToken(token?.setAccessToken);
    // Initializing Google Drive and confirming permissions
    GDrive.init();
    // Check if Initialized
    return GDrive.isInitialized();
  };

  const _getAllMyAppFilesList = async () => {
    setLoading(true);
    try {
      if (!(await _initGoogleDrive())) {
        return alert('Failed to Initialize Google Drive');
      }
      // Create/Get Directory on Google Device
      let directoryId = await GDrive.files.safeCreateFolder({
        name: APP_DIRECTORY,
        parents: ['root'],
      });
      console.log('directoryId -> ', directoryId);
      let data = await GDrive.files.list({
        q:
          GDrive._stringifyQueryParams({trashed: false}, '', ' and ', true) +
          ` and '${directoryId}' in parents`,
      });
      let result = await data.json();
      setListData(result.files);
    } catch (error) {
      console.log('Error->', error);
      alert(`Error-> ${error}`);
    }
    setLoading(false);
  };

  const _deleteDriveData = async item => {
    try {
      setLoading(true);
      if (!(await _initGoogleDrive())) {
        return alert('Failed to Initialize Google Drive');
      }
      // Create/Get Directory on Google Device
      let directoryId = await GDrive.files.safeCreateFolder({
        name: APP_DIRECTORY,
        parents: ['root'],
      });
      console.log('directoryId -> ', directoryId);
      let result = await GDrive.files.delete(item.id);
      if (!result.ok) {
        alert('File Deletion Failed');
      }
      _getAllMyAppFilesList();
    } catch (error) {
      alert(error);
      console.log(error);
    }
    setLoading(false);
  };

  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <View style={{padding: 10}}>
        <Text style={styles.item} onPress={() => getItem(item)}>
          File Id: {item.id}
          {'\n'}
          File Name: {item.name}
          {'\n'}
          Mine Type: {item.mimeType}
        </Text>
        <Text style={{color: 'red'}}>Click to Delete</Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    Alert.alert(
      'Warning',
      'Are you sure you want to delete the file from Google Drive?',
      [
        {
          text: 'Yes',
          onPress: () => _deleteDriveData(item),
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Delete any File from Google Drive</Text>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={listData}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default GDDeleteFileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});
