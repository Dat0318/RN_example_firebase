import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
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
