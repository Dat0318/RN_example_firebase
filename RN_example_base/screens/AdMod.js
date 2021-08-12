import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
import RNSpeedometer from 'react-native-speedometer';

// import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
// import {
//   InterstitialAd,
//   RewardedAd,
//   RewardedAdEventType,
//   TestIds,
//   AdEventType,
//   BannerAd,
//   BannerAdSize,
// } from '@react-native-firebase/admob';
// remove from @react-native-firebase/admob version 11.5.0
// "@react-native-firebase/admob": "^11.5.0",
// change firebase to 11.5.0

// admob()
//   .setRequestConfiguration({
//     // Update all future requests suitable for parental guidance
//     maxAdContentRating: MaxAdContentRating.PG,

//     // Indicates that you want your content treated as child-directed for purposes of COPPA.
//     tagForChildDirectedTreatment: true,

//     // Indicates that you want the ad request to be handled in a
//     // manner suitable for users under the age of consent.
//     tagForUnderAgeOfConsent: true,
//   })
//   .then(() => {
//     // Request config successfully set!
//   });

// const interstialAdUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : 'ca-app-pub-7470375419739273/1165043718';

// const interstitial = InterstitialAd.createForAdRequest(interstialAdUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

// const rewardedAdUnitId = __DEV__
//   ? TestIds.REWARDED
//   : 'ca-app-pub-7470375419739273/3954858586';

// const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

// const bannerAdUnitId = __DEV__
//   ? TestIds.BANNER
//   : 'ca-app-pub-7470375419739273/3954858586';

let {width} = Dimensions.get('window');

export const AdMod = () => {
  const [meterValue, setMeterValue] = useState(20);

  // useEffect(() => {
  //   // Event listener for interstitial Ads
  //   const interstitialAdEventListener = interstitial.onAdEvent(type => {
  //     if (type === AdEventType.LOADED) {
  //       console.log('Interstitial Ad Loaded');
  //     }
  //   });

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Event listener for rewarded Ads
  //   const rewardedAdEventListener = rewarded.onAdEvent(
  //     (type, error, reward) => {
  //       if (type === RewardedAdEventType.LOADED) {
  //         console.log('Rewarded Ad Loaded');
  //       }

  //       if (type === RewardedAdEventType.EARNED_REWARD) {
  //         console.log('User earned reward of ', reward);
  //       }
  //     },
  //   );

  //   // Start loading the rewarded ad straight away
  //   rewarded.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     interstitialAdEventListener();
  //     rewardedAdEventListener();
  //   };
  // }, []);

  const [events, setEvents] = useState([
    {
      start: '2020-01-01 00:00:00',
      end: '2020-01-01 02:00:00',
      title: 'New Year Party',
      summary: 'xyz Location',
    },
    {
      start: '2020-01-01 01:00:00',
      end: '2020-01-01 02:00:00',
      title: 'New Year Wishes',
      summary: 'Call to every one',
    },
    {
      start: '2020-01-02 00:30:00',
      end: '2020-01-02 01:30:00',
      title: 'Parag Birthday Party',
      summary: 'Call him',
    },
    {
      start: '2020-01-03 01:30:00',
      end: '2020-01-03 02:20:00',
      title: 'My Birthday Party',
      summary: 'Lets Enjoy',
    },
    {
      start: '2020-02-04 04:10:00',
      end: '2020-02-04 04:40:00',
      title: 'Engg Expo 2020',
      summary: 'Expoo Vanue not confirm',
    },
  ]);

  const eventClicked = event => {
    //On Click of event showing alert from here
    // alert(JSON.stringify(event));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          // onPress={() => interstitial.show()}
        >
          <Text style={styles.buttonTextStyle}>Show Interstitial Ad</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          // onPress={() => rewarded.show()}
        >
          <Text style={styles.buttonTextStyle}>Show Rewarded Ad</Text>
        </TouchableOpacity>

        <EventCalendar
          eventTapped={eventClicked}
          // Function on event press
          events={events}
          // Passing the Array of event
          width={width}
          // Container width
          size={60}
          // number of date will render before and after initDate
          // (default is 30 will render 30 day before initDate
          // and 29 day after initDate)
          initDate={'2020-01-01'}
          // Show initial date (default is today)
          scrollToFirst
          // Scroll to first event of the day (default true)
        />
      </View>
      {/* <BannerAd
        unitId={bannerAdUnitId}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}

      <RNSpeedometer
        value={meterValue}
        //value for Speedometer
        size={200}
        //Size of Speedometer
        minValue={0}
        //Min value for Speedometer
        maxValue={100}
        //Max value for Speedometer
        allowedDecimals={0}
        //Decimals value allowed or not
        labels={[
          {
            name: 'Low Risk',
            labelColor: '#ff2900',
            activeBarColor: '#ff2900',
          },
          {
            name: 'Medium Risk',
            labelColor: '#f4ab44',
            activeBarColor: '#f4ab44',
          },
          {
            name: 'High Risk',
            labelColor: '#00ff6b',
            activeBarColor: '#00ff6b',
          },
        ]}
        //Labels for the different steps of Speedometer
      />
      <View style={{marginTop: 70, padding: 20}}>
        <Text style={{fontSize: 20}}>
          Enter the value for the speedometer graph between 0 to 100
        </Text>
        <TextInput
          placeholder="Enter Speedometer Value"
          style={styles.textInput}
          onChangeText={value => setMeterValue(value)}
        />
      </View>
    </SafeAreaView>
  );
};

export default AdMod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  buttonStyle: {
    minWidth: 300,
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textInput: {
    height: 25,
    fontSize: 16,
    marginTop: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
});
