import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

export const CacheImage = () => {
  useEffect(() => {}, []);

  return <View style={[styles.sectionContainer, {backgroundColor: 'red'}]} />;
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
