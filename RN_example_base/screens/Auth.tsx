import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
// import { AppleButton } from '@invertase/react-native-apple-authentication';

export function Auth() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User email: ', user.email);
      }
    });
  }, [currentUser]);

  if (user) {
    console.log('User email: ', currentUser?.email);
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user);

    setUser(user);
    if (initializing) setInitializing(false);
  }

  const _anonymous = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  const _loginWithEmailAndPassword = () => {
    auth()
      .createUserWithEmailAndPassword('datd@vmodev.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const _signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const _signInWithPhone = async () => {
    let user = await auth().signInWithPhoneNumber('+84986419381');
    console.log('user: ', user);
  };

  const _verifyPhone = async () => {
    await firebase
      .auth()
      .verifyPhoneNumber('+4423456789')
      .on('state_changed', phoneAuthSnapshot => {
        console.log('Snapshot state: ', phoneAuthSnapshot.state);
      });
  };

  if (initializing) return null;

  if (!!user) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Login</Text>
        <TouchableOpacity style={styles.button} onPress={_signOut}>
          <Text style={styles.btnText}>_signOut</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Welcome {user?.email}</Text>
      </View>
      <View style={styles.listButton}>
        <TouchableOpacity style={styles.button} onPress={_anonymous}>
          <Text style={styles.btnText}>_anonymous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={_loginWithEmailAndPassword}
        >
          <Text style={styles.btnText}>_loginWithEmailAndPassword</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_signOut}>
          <Text style={styles.btnText}>_signOut</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_signInWithPhone}>
          <Text style={styles.btnText}>_signInWithPhone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_verifyPhone}>
          <Text style={styles.btnText}>_verifyPhone</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  listButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    flexWrap: 'wrap',
  },
  button: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    marginBottom: 10,
  },
  btnText: {
    fontSize: 10,
    color: 'black',
  },
});
