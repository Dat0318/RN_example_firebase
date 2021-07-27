import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import 'react-native-gesture-handler';
import firebase from '@react-native-firebase/database';

export const RealTime = () => {
  const databaseForDefaultApp = firebase.database();
  useEffect(() => {}, []);

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
