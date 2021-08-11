import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const Mytext = props => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 18,
    marginTop: 16,
  },
});

export default Mytext;
