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

const GDFilesListingScreen = ({route}) => {
  // State Defination
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.params.type == 'all') _getAllFilesList();
    else _getAllMyAppFilesList();
  }, []);

  const _initGoogleDrive = async () => {
    // Getting Access Token from Google
    let token = await GoogleSignin.getTokens();
    if (!token) return Alert.alert('Warning', 'Failed to get token');
    console.log('res.accessToken 4=>', token?.setAccessToken);
    // Setting Access Token
    GDrive.setAccessToken(token?.setAccessToken);
    // Initializing Google Drive and confirming permissions
    GDrive.init();
    // Check if Initialized
    return GDrive.isInitialized();
  };

  const _getAllFilesList = async () => {
    try {
      if (!(await _initGoogleDrive())) {
        return Alert.alert('Warning', 'Failed to Initialize Google Drive');
      }
      let data = await GDrive.files.list({
        q: GDrive._stringifyQueryParams({trashed: false}, '', ' and ', true),
      });
      let result = await data.json();
      setListData(result.files);
    } catch (error) {
      console.log('Error->', error);
      Alert.alert('Warning', `Error-> ${error}`);
    }
    setLoading(false);
  };

  const _getAllMyAppFilesList = async () => {
    try {
      if (!(await _initGoogleDrive())) {
        return Alert.alert('Warning', 'Failed to Initialize Google Drive');
      }
      // Create/Get Directory on Google Device
      let directoryId = await GDrive.files.safeCreateFolder({
        name: APP_DIRECTORY,
        parents: ['root'],
      });
      console.log('directoryId -> ', directoryId);
      let data = await GDrive.files.list({
        q:
          GDrive._stringifyQueryParams(
            {
              trashed: false,
              // mimeType: 'application/text'
            },
            '',
            ' and ',
            true,
          ) + ` and '${directoryId}' in parents`,
      });
      let result = await data.json();
      setListData(result.files);
    } catch (error) {
      console.log('Error->', error);
      Alert.alert('Warning', `Error-> ${error}`);
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
    //Function for click on an item
    Alert.alert('Warning', JSON.stringify(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Listing of Files from Google Drive</Text>
      {route.params.type == 'all' ? null : (
        <Text style={{textAlign: 'center'}}>Directory: {APP_DIRECTORY}</Text>
      )}
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

export default GDFilesListingScreen;

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
