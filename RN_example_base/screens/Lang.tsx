import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
  const [name, setName] = useState('Dat');
  const _changeLang = () => {
    StringsOfLanguages.setLanguage('fr');
    setName('Duy');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>{StringsOfLanguages.first}</Text>
        <Text style={styles.text}>
          {StringsOfLanguages.second} {name}
        </Text>
      </View>
      <TouchableOpacity onPress={_changeLang}>
        <Text>Change Text</Text>
      </TouchableOpacity>
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
