/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import analytics from '@react-native-firebase/analytics';

export function sum(a: number, b: number) {
  return a + b;
}

export const App = () => {
  // const user = auth().currentUser;
  const user = {
    email: 'name@gmail.com'
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={styles.sectionTitle}>
        {
          !user ?
            `Welcome ${user?.email}`
            :
            'Please login.'
        }
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

export default App;
