import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import 'react-native-gesture-handler';
import database from '@react-native-firebase/database';

export const RealTime = () => {
  const databaseForDefaultApp = database().ref('/users/123');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    _getData().then();
  }, []);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${userId}`)
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${userId}`).off('value', onValueChange);
  }, [userId]);

  useEffect(() => {
    const onChildAdd = database()
      .ref('/users')
      .on('child_added', snapshot => {
        console.log('A new node has been added', snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref('/users').off('child_added', onChildAdd);
  }, [userId]);

  const _getData = async () => {
    database()
      .ref('/users/123')
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
      });
  };

  const handleUpdateData = async () => {
    database()
      .ref('/users/123')
      .update({
        age: 32,
      })
      .then(() => console.log('Data updated.'));
  };

  const handlePushNewData = async () => {
    const newReference = database().ref('/users').push();
    console.log('Auto generated key: ', newReference.key);

    newReference
      .set({
        age: 32,
      })
      .then(() => console.log('Data updated.'));
  };

  const handleRemoveRecords = async () => {
    await database().ref('/users/123').remove();
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Demo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});
