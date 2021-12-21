import React, {useEffect, useState} from 'react';

// import all the components we are going to use
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Linking,
  Platform,
  TextInput,
} from 'react-native';

// 1. Either import the whole module
import Communications from 'react-native-communications';
/* 2. Or import single methods
 import {
  phonecall,
  email,
  text,
  web
} from 'react-native-communications';*/

const GOOGLE_PACKAGE_NAME = 'agrawal.trial.yourfeedback';
const APPLE_STORE_ID = 'id284882215';

export const RnCommunity = () => {
  const [count, setCount] = useState(5);
  const [isIntervalRunnig, setIsIntervalRunnig] = useState(false);

  useEffect(() => {
    startRatingCounter();
  }, []);

  const startRatingCounter = () => {
    //Initialize count by 5 to start counter for 5 sec
    setCount(5);
    let tempcount = 5;
    if (!isIntervalRunnig) {
      setIsIntervalRunnig(true);
      let t = setInterval(() => {
        tempcount = tempcount - 1;
        console.log(tempcount);
        setCount(tempcount);
        if (tempcount == 0) {
          clearInterval(t);
          setIsIntervalRunnig(false);
          //After 5 second ask for the rate this app
          Alert.alert(
            'Rate us',
            'Would you like to share your review with us? This will help and motivate us a lot.',
            [
              {text: 'Sure', onPress: () => openStore()},
              {
                text: 'No Thanks!',
                onPress: () => console.log('No Thanks Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
      }, 1000);
    }
  };

  const openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
        Alert.alert('Warning', 'Please check for Google Play Store'),
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      ).catch(err => Alert.alert('Warning', 'Please check for the App Store'));
    }
  };

  // Share Facebook
  const [facebookShareURL, setFacebookShareURL] = useState(
    'https://aboutreact.com',
  );
  const [postContent, setPostContent] = useState(
    'Hello Guys, This is a testing of facebook share example',
  );

  const postOnFacebook = () => {
    let facebookParameters = [];
    if (facebookShareURL)
      facebookParameters.push('u=' + encodeURI(facebookShareURL));
    if (postContent) facebookParameters.push('quote=' + encodeURI(postContent));
    const url =
      'https://www.facebook.com/sharer/sharer.php?' +
      facebookParameters.join('&');

    Linking.openURL(url)
      .then(data => {
        Alert.alert('Warning', 'Facebook Opened');
      })
      .catch(() => {
        Alert.alert('Warning', 'Something went wrong');
      });
  };

  // Share Twitter

  const [twitterShareURL, setTwitterShareURL] = useState(
    'https://aboutreact.com',
  );
  const [tweetContent, setTweetContent] = useState(
    'Hello Guys, This is a testing of twitter share example',
  );
  const [twitterViaAccount, setTwitterViaAccount] = useState('AboutReact');

  const tweetNow = () => {
    let twitterParameters = [];
    if (twitterShareURL)
      twitterParameters.push('url=' + encodeURI(twitterShareURL));
    if (tweetContent) twitterParameters.push('text=' + encodeURI(tweetContent));
    if (twitterViaAccount)
      twitterParameters.push('via=' + encodeURI(twitterViaAccount));
    const url =
      'https://twitter.com/intent/tweet?' + twitterParameters.join('&');
    Linking.openURL(url)
      .then(data => {
        Alert.alert('Warning', 'Twitter Opened');
      })
      .catch(() => {
        Alert.alert('Warning', 'Something went wrong');
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Make Phone Call, Send SMS or Email Using React Native Communication
        </Text>
        {/* Call: phonecall(phoneNumber, prompt) */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => Communications.phonecall('0123456789', true)}
        >
          <Text style={styles.buttonTextStyle}>Make Phone Call</Text>
        </TouchableOpacity>
        {/* Mail: email(to, cc, bcc, subject, body) */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() =>
            Communications.email(
              ['aboutreact11@gmail.com', 'hello@aboutreact.com'],
              null,
              null,
              'Demo Subject',
              'Demo Content for the mail',
            )
          }
        >
          <Text style={styles.buttonTextStyle}>Send an Email</Text>
        </TouchableOpacity>
        {/* SMS: text(phoneNumber = null, body = null) */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() =>
            Communications.text('0123456789', 'Follow https://aboutreact.com')
          }
        >
          <Text style={styles.buttonTextStyle}>Send a Text/iMessage</Text>
        </TouchableOpacity>
        {/* Web: web(address = null)*/}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => Communications.web('https://aboutreact.com')}
        >
          <Text style={styles.buttonTextStyle}>Open AboutReact</Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>
          Example to add rate this app feature in React Native
        </Text>
        {isIntervalRunnig ? (
          <Text style={styles.textStyle}>
            Rate this App alert will be in {count} second
          </Text>
        ) : null}
        {isIntervalRunnig ? null : (
          <TouchableOpacity
            onPress={startRatingCounter}
            activeOpacity={0.6}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>Restart Rating Counter</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.titleText}>
          Share Facebook Post with URL from React Native App
        </Text>
        <Text style={styles.titleTextsmall}>Enter Post Content</Text>
        <TextInput
          value={postContent}
          onChangeText={postContent => setPostContent(postContent)}
          placeholder={'Enter Facebook Post Content'}
          style={styles.textInput}
        />
        <Text style={styles.titleTextsmall}>Enter URL to Share</Text>
        <TextInput
          value={facebookShareURL}
          onChangeText={facebookShareURL =>
            setFacebookShareURL(facebookShareURL)
          }
          placeholder={'Enter URL to Share'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={postOnFacebook}
        >
          <Text style={styles.buttonTextStyle}>Share on Facebook</Text>
        </TouchableOpacity>

        {/* Share Twitter */}
        <Text style={styles.titleText}>
          Tweet on Twitter with URL from React Native App
        </Text>
        <Text style={{marginTop: 20}}>Enter Tweet Content</Text>
        <TextInput
          value={tweetContent}
          onChangeText={tweetContent => setTweetContent(tweetContent)}
          placeholder={'Enter Tweet Content'}
          style={styles.textInput}
        />
        <Text style={{marginTop: 20}}>Enter URL to Share</Text>
        <TextInput
          value={twitterShareURL}
          onChangeText={twitterShareURL => setTwitterShareURL(twitterShareURL)}
          placeholder={'Enter URL to Share'}
          style={styles.textInput}
        />
        <Text style={{marginTop: 20}}>Enter Via Account</Text>
        <TextInput
          value={twitterViaAccount}
          onChangeText={twitterViaAccount =>
            setTwitterViaAccount(twitterViaAccount)
          }
          placeholder={'Enter Via Account'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={tweetNow}
        >
          <Text style={styles.buttonTextStyle}>Tweet Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RnCommunity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 15,
    marginTop: 30,
    textAlign: 'center',
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});
