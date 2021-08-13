import React, {useState} from 'react';
import {View, Alert, SafeAreaView} from 'react-native';
import Mytextinput from '../Components/Mytextinput';
import Mybutton from '../Components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'images.db'});

export const SQLiteDeleteUser = ({navigation}) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('SQLite'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Warning', 'Please insert a valid User Id');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytextinput
            placeholder="Enter User Id"
            onChangeText={inputUserId => setInputUserId(inputUserId)}
            style={{padding: 10}}
          />
          <Mybutton title="Delete User" customClick={deleteUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};
