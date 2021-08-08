import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

export const Print = () => {
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  // Only for iOS
  const selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({x: 100, y: 100});
    setSelectedPrinter(selectedPrinter);
  };

  // Only for iOS
  const silentPrint = async () => {
    if (!selectedPrinter) {
      Alert.alert('Title', 'Must Select Printer First');
    }
    const jobName = await RNPrint.print({
      printerURL: selectedPrinter?.url,
      html: '<h1>Silent Print clicked</h1>',
    });
  };

  const printHTML = async () => {
    await RNPrint.print({
      html: '<h1>Here will be Heading 1</h1><h2>Here will be Heading 2</h2><h3>Here will be Heading 3</h3>',
    });
  };

  const printPDF = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: '<h1>Demo Text to converted to PDF</h1>',
      fileName: 'test',
      base64: true,
    });
    await RNPrint.print({
      filePath: results.filePath,
    });
  };

  const printRemotePDF = async () => {
    await RNPrint.print({
      filePath: 'http://www.africau.edu/images/default/sample.pdf',
    });
  };

  const customOptions = () => {
    return (
      <View>
        {selectedPrinter && (
          <View>
            <Text>{`Selected Printer Name: ${selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${selectedPrinter.url}`}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.buttonStyle} onPress={selectPrinter}>
          <Text>Click to Select Printer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={silentPrint}>
          <Text>Click for Silent Print</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Print HTML as a Document from React Native App
      </Text>
      <View style={styles.container}>
        {Platform.OS === 'ios' && customOptions()}
        <TouchableOpacity style={styles.buttonStyle} onPress={printHTML}>
          <Text>Click to Print HTML</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={printPDF}>
          <Text>Click to Print PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={printRemotePDF}>
          <Text>Click to Print Remote PDF</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginVertical: 10,
  },
});
