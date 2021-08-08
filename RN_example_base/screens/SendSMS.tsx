import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const SendSMS = () => {
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
