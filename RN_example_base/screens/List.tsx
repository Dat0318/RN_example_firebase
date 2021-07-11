import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const List = () => {
  const navigation = useNavigation();

  const _navigate = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => _navigate('Analytics')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Auth')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Auth</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _navigate('Analytics')}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Analytics</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'lightblue',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
