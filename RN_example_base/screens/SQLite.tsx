// Document to remember:
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native/
// https://aboutreact.com/see-saved-data-of-the-sqlite-database-in-device/
// https://aboutreact.com/example-of-sqlite-database-in-react-native/

import React, {useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import Mybutton from './Components/Mybutton';
import Mytext from './Components/Mytext';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'images.db'});

export const SQLite = ({navigation}) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );

            txn.executeSql('DROP TABLE IF EXISTS images', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS images(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytext text="SQLite Example" />
          <Mybutton
            title="Register"
            customClick={() => navigation.navigate('SQLiteRegister')}
          />
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('SQLiteUpdate')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('SQLiteView')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('SQLiteViewAll')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('SQLiteDelete')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
