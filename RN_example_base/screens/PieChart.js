// PieChart
import React from 'react';
// import all the components we are going to use
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
// import pie to make pie chart
import Pie from './Pie';

export const PieChart = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>Pie Chart Example</Text>
        <Pie
          radius={70}
          series={[56, 11, 77]}
          colors={['yellow', 'green', 'orange']}
          sections={[
            {percentage: 10, color: 'yellow'},
            {percentage: 30, color: 'red'},
            {percentage: 20, color: 'orange'},
            {percentage: 40, color: 'ececec'},
          ]}
        />
        <Text>Solid/Filled Pie Chart</Text>
        <Pie
          radius={70}
          innerRadius={40}
          series={[10, 20, 30, 40]}
          colors={['#f00', '#0f0', '#00f', '#ff0']}
          sections={[
            {percentage: 15, color: '00f'},
            {percentage: 25, color: 'red'},
            {percentage: 5, color: 'ff0'},
            {percentage: 45, color: 'ececec'},
          ]}
        />
        <Text>Donut Pie Chart</Text>
        <View>
          <Pie
            radius={70}
            innerRadius={65}
            series={[55]}
            colors={['#f00']}
            backgroundColor="#ddd"
            sections={[
              {percentage: 15, color: '00f'},
              {percentage: 25, color: 'red'},
              {percentage: 5, color: 'ff0'},
              {percentage: 45, color: 'ececec'},
            ]}
          />
          <View style={styles.gauge}>
            <Text style={styles.gaugeText}>55%</Text>
          </View>
          <Text>Gauge Pie Chart</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  gauge: {
    position: 'absolute',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
});
