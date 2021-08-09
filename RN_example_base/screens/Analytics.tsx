import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import 'react-native-gesture-handler';
// import {Navigation} from 'react-native-navigation';

export function sum(a: number, b: number) {
  return a + b;
}

export const Analytics = () => {
  const user = auth().currentUser;

  useEffect(() => {
    _run();
    // Navigation.events().registerComponentDidAppearListener(
    //   async ({componentName, componentType}: any) => {
    //     if (componentType === 'Component') {
    //       await analytics().logScreenView({
    //         screen_name: componentName,
    //         screen_class: componentName,
    //       });
    //     }
    //   },
    // );
  }, []);

  const _run = async () => {
    const appInstanceId = await analytics().getAppInstanceId();
    console.log('appInstanceId: ', appInstanceId);
  };

  const realtimeLogContent = () => {
    analytics().logSelectContent({
      content_type: 'Button Clicked',
      item_id: 'button1',
    });
  };

  const logCustomeEvent = () => {
    analytics().logEvent('my_custom_event', {
      id: 101,
      item: 'My Product Name',
      description: ['My Product Desc 1', 'My Product Desc 2'],
    });
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        {!user ? `Welcome ${user?.email}` : 'Please login.'}
      </Text>
      <Button
        title="Add To Basket"
        onPress={async () =>
          await analytics().logEvent('basket', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
        }
      />

      <Button
        title="Press me"
        // Logs in the firebase analytics console as "select_content" event
        // only accepts the two object properties which accept strings.
        onPress={async () =>
          await analytics().logSelectContent({
            content_type: 'clothing',
            item_id: 'abcd',
          })
        }
      />

      <Button
        title={'Javascript Crash Now.'}
        onPress={() => {
          // undefinedVariable.notAFunction();
        }}
      />

      <View style={styles.container}>
        <Text style={styles.heading}>React Native Firebase</Text>
        <Text style={styles.normalTextStyle}>#1 Firebase Analytics</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.normalTextStyle}>Log React Time Content</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={realtimeLogContent}>
            <Text style={styles.buttonTextStyle}>Click Button</Text>
          </TouchableOpacity>
          <Text style={styles.normalTextStyle}>Trigger My Custom Event</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={logCustomeEvent}>
            <Text style={styles.buttonTextStyle}>Create Custom Event</Text>
          </TouchableOpacity>
        </View>
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
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
  },
  buttonStyle: {
    minWidth: 300,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  normalTextStyle: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
  },
});
