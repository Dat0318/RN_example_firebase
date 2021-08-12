import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import CalendarPicker from 'react-native-calendar-picker';

async function buildLink() {
  const link = await dynamicLinks().buildLink({
    link: 'https://dattd.page.link',
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://dattd.page.link',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    analytics: {
      campaign: 'banner',
    },
  });

  return link;
}
export const DynamicLinks = () => {
  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    if (link?.url === 'https://dattd.page.link/offer') {
      // ...navigate to your offers screen
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.titleStyle}>React Native Calendar Picker</Text>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={new Date(2018, 1, 1)}
        maxDate={new Date(2050, 6, 3)}
        weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
        months={[
          'January',
          'Febraury',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
        previousTitle="Previous"
        nextTitle="Next"
        todayBackgroundColor="#e6ffe6"
        selectedDayColor="#66ff33"
        selectedDayTextColor="#000000"
        scaleFactor={375}
        textStyle={{
          fontFamily: 'Cochin',
          color: '#000000',
        }}
        onDateChange={onDateChange}
      />
      <View style={styles.textStyle}>
        <Text style={styles.textStyle}>Selected Start Date :</Text>
        <Text style={styles.textStyle}>
          {selectedStartDate ? selectedStartDate.toString() : ''}
        </Text>
        <Text style={styles.textStyle}>Selected End Date :</Text>
        <Text style={styles.textStyle}>
          {selectedEndDate ? selectedEndDate.toString() : ''}
        </Text>
      </View>
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
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
});
