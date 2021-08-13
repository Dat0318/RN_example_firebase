import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from '../Components/Mytextinput';
import Mybutton from '../Components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'images.db'});

export const SQLiteUpdateUser = ({navigation}) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let updateAllStates = (name, contact, address) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.user_name, res.user_contact, res.user_address);
          } else {
            Alert.alert('Warning', 'No user found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };
  let updateUser = () => {
    console.log(inputUserId, userName, userContact, userAddress);

    if (!inputUserId) {
      Alert.alert('Warning', 'Please fill User id');
      return;
    }
    if (!userName) {
      Alert.alert('Warning', 'Please fill name');
      return;
    }
    if (!userContact) {
      Alert.alert('Warning', 'Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      Alert.alert('Warning', 'Please fill Address');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
        [userName, userContact, userAddress, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('SQLite'),
                },
              ],
              {cancelable: false},
            );
          } else Alert.alert('Warning', 'Updation Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter User Id"
                style={{padding: 10}}
                onChangeText={inputUserId => setInputUserId(inputUserId)}
              />
              <Mybutton title="Search User" customClick={searchUser} />
              <Mytextinput
                placeholder="Enter Name"
                value={userName}
                style={{padding: 10}}
                onChangeText={userName => setUserName(userName)}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                value={'' + userContact}
                onChangeText={userContact => setUserContact(userContact)}
                maxLength={10}
                style={{padding: 10}}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userAddress}
                placeholder="Enter Address"
                onChangeText={userAddress => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mybutton title="Update User" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
