// Performace
import perf, {firebase} from '@react-native-firebase/perf';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// Call API
// getRequest('https://api.com').then(json => {
//   console.log(json);
// });

export const Performance = () => {
  firebase.perf().setPerformanceCollectionEnabled(true);

  async function customTrace() {
    // Define & start a trace
    const trace = await perf().startTrace('custom_trace');

    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);

    // Stop the trace
    await trace.stop();
  }

  async function getRequest(url) {
    // Define the network metric
    const metric = await perf().newHttpMetric(url, 'GET');

    // Define meta details
    metric.putAttribute('user', 'abcd');

    // Start the metric
    await metric.start();

    // Perform a HTTP request and provide response information
    const response = await fetch(url);
    metric.setHttpResponseCode(response.status);
    metric.setResponseContentType(response.headers.get('Content-Type'));
    metric.setResponsePayloadSize(response.headers.get('Content-Length'));

    // Stop the metric
    await metric.stop();

    return response.json();
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Demo</Text>

      <TouchableOpacity onPress={customTrace}>
        <Text>customTrace</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getRequest}>
        <Text>getRequest</Text>
      </TouchableOpacity>
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
