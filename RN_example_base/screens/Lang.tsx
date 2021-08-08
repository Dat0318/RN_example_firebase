import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import LocalizedStrings from 'react-native-localization';

const StringsOfLanguages = new LocalizedStrings({
  hi: {
    first: 'क्या हाल है ?',
    second: 'मैं ठीक हूँ ?',
  },
  ma: {
    first: 'तू कसा आहेस ?',
    second: 'मी ठीक आहे ?',
  },
  en: {
    first: 'How are You ?',
    second: 'I am fine ',
  },
  fr: {
    first: 'comment allez vous',
    second: 'je vais bien',
  },
});

export const Lang = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>{StringsOfLanguages.first}</Text>
        <Text style={styles.text}>{StringsOfLanguages.second}</Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          color: 'grey',
        }}>
        Example of Localization in React Native (Multi Language App)
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey',
        }}>
        www.aboutreact.com
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#191919',
    fontSize: 25,
    marginTop: 15,
  },
});
