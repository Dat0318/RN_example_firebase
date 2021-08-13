import {Ama} from './Ama';
import {Analytics} from './Analytics';
import {Auth} from './Auth';
import {CacheImage} from './CacheImage';
import {Drive} from './Drive';
import {Lang} from './Lang';
import {List} from './List';
import {Map} from './Map';
import {PDF} from './PDF';
import {Print} from './Print';
import {DynamicLinks} from './DynamicLinks';
import {RealTime} from './RealTime';
import {You} from './You';
import {GeoLocation} from './GeoLocation';
import {ImageMap} from './ImageMapper';
import {SwipeCard} from './SwipeCard';
import {AccordionSection} from './Accordion';
import {AlphabetContacts} from './AlphabetContacts';
import {
  GoogleLoginScreen,
  GDUploadFileScreen,
  GDFilesListingScreen,
  GDSingleFileScreen,
  GDDeleteFileScreen,
  GDDownloadFileScreen,
} from './Drive/index';
import {
  AddOrderSummary,
  RealTimeAddUpdateUser,
  DeleteUser,
  RegisterUser,
  UpdateUser,
  ViewAllUser,
  ViewUser,
} from './FireStore';
import {FileStore} from './FileStore';
import {Storage} from './Storage';
import {FilesListingScreen, UploadFileScreen} from './Storage/index';
import {InAppMessage} from './InAppMessage';
import {Crashlytics} from './Crashlytics';
import {AdMod} from './AdMod';
import {Performance} from './Performance';
import {FirebaseAuth, Login, Register} from './Auth/index';
import {PieChart} from './PieChart';
import {ChartKit} from './ChartKit';
import {GenQR} from './GenQR';
import {ShareQR} from './ShareQR';
import {Md5} from './Md5';
import {RnSound} from './Sound';
import {RnVideo} from './RnVideo';
import {TextToSpeed} from './TextToSpeed';
import {SpeedToText} from './SpeedToText';
import {Brightness} from './Brightness';
import {RnKeepAwake} from './KeepAwake';
import {RnSendSMS} from './RnSendSMS';
import {Signature} from './Signature';

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SendSMS} from './SendSMS';
import {CallDetective} from './CallDetective';
import {RnCommunity} from './RnCommunity';
import {CallLogAndroid} from './CallLogAndroid';
import {RnRealm} from './Realm';
import {
  RealmDeleteUser,
  RealmRegisterUser,
  RealmUpdateUser,
  RealmViewAllUser,
  RealmViewUser,
} from './Realm/index';

import {SQLite} from './SQLite';
import {
  SQLiteDeleteUser,
  SQLiteRegisterUser,
  SQLiteUpdateUser,
  SQLiteViewAllUser,
  SQLiteViewUser,
} from './SQLite/index';

const Stack = createStackNavigator();

export function Navigation() {
  return (
    <Stack.Navigator
      headerMode="none"
      //  initialRouteName= "Home"
    >
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Ama" component={Ama} />
      <Stack.Screen name="Drive" component={Drive} />
      <Stack.Screen name="Lang" component={Lang} />
      <Stack.Screen name="PDF" component={PDF} />
      <Stack.Screen name="Print" component={Print} />
      <Stack.Screen name="You" component={You} />
      <Stack.Screen name="CacheImage" component={CacheImage} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="DynamicLinks" component={DynamicLinks} />
      <Stack.Screen name="RealTime" component={RealTime} />
      <Stack.Screen name="GoogleLoginScreen" component={GoogleLoginScreen} />
      <Stack.Screen name="HomeScreen" component={Drive} />
      <Stack.Screen name="GeoLocation" component={GeoLocation} />
      <Stack.Screen name="ImageMapper" component={ImageMap} />
      <Stack.Screen name="SwipeCard" component={SwipeCard} />
      <Stack.Screen name="AlphabetContacts" component={AlphabetContacts} />
      <Stack.Screen name="Accordion" component={AccordionSection} />
      {/* <Stack.Screen name="" component={} /> */}
      <Stack.Screen name="GDUploadFileScreen" component={GDUploadFileScreen} />
      <Stack.Screen
        name="GDFilesListingScreen"
        component={GDFilesListingScreen}
      />
      <Stack.Screen name="GDSingleFileScreen" component={GDSingleFileScreen} />
      <Stack.Screen name="GDDeleteFileScreen" component={GDDeleteFileScreen} />
      <Stack.Screen
        name="GDDownloadFileScreen"
        component={GDDownloadFileScreen}
      />

      {/* Firebase FileStore Database */}
      <Stack.Screen name="FileStore" component={FileStore} />
      <Stack.Screen name="RegisterUser" component={RegisterUser} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="ViewAllUser" component={ViewAllUser} />
      <Stack.Screen name="ViewUser" component={ViewUser} />
      <Stack.Screen name="DeleteUser" component={DeleteUser} />
      <Stack.Screen
        name="RealTimeAddUpdateUser"
        component={RealTimeAddUpdateUser}
      />
      <Stack.Screen name="AddOrderSummary" component={AddOrderSummary} />

      {/* Firebase storage */}
      <Stack.Screen name="Storage" component={Storage} />
      <Stack.Screen name="UploadFileScreen" component={UploadFileScreen} />
      <Stack.Screen name="FilesListingScreen" component={FilesListingScreen} />
      {/* Firebase In App Message */}
      <Stack.Screen name="InAppMessage" component={InAppMessage} />
      {/* Firebase Crashlytics */}
      <Stack.Screen name="Crashlytics" component={Crashlytics} />
      {/* Firebase AdMod */}
      <Stack.Screen name="AdMod" component={AdMod} />
      {/* Firebase Performance */}
      <Stack.Screen name="Performance" component={Performance} />
      {/* FirebaseAuth */}
      <Stack.Screen name="FirebaseAuth" component={FirebaseAuth} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      {/* PieChart */}
      <Stack.Screen name="PieChart" component={PieChart} />
      {/* ChartKit */}
      <Stack.Screen name="ChartKit" component={ChartKit} />
      {/* ShareQR */}
      <Stack.Screen name="ShareQR" component={ShareQR} />
      <Stack.Screen name="GenQR" component={GenQR} />
      {/* Md5 */}
      <Stack.Screen name="Md5" component={Md5} />
      {/* RnSound */}
      <Stack.Screen name="RnSound" component={RnSound} />
      {/* RnVideo */}
      <Stack.Screen name="RnVideo" component={RnVideo} />
      {/* SpeedToText */}
      <Stack.Screen name="SpeedToText" component={SpeedToText} />
      <Stack.Screen name="TextToSpeed" component={TextToSpeed} />
      {/* Brightness */}
      <Stack.Screen name="Brightness" component={Brightness} />
      {/* RnKeepAwake */}
      <Stack.Screen name="RnKeepAwake" component={RnKeepAwake} />
      {/* Signature */}
      <Stack.Screen name="Signature" component={Signature} />
      <Stack.Screen name="RnSendSMS" component={RnSendSMS} />
      {/* SendSMS */}
      <Stack.Screen name="SendSMS" component={SendSMS} />
      <Stack.Screen name="CallDetective" component={CallDetective} />
      <Stack.Screen name="RnCommunity" component={RnCommunity} />
      <Stack.Screen name="CallLogAndroid" component={CallLogAndroid} />
      {/* RnRealm */}
      <Stack.Screen name="RnRealm" component={RnRealm} />
      <Stack.Screen name="RealmDeleteUser" component={RealmDeleteUser} />
      <Stack.Screen name="RealmRegisterUser" component={RealmRegisterUser} />
      <Stack.Screen name="RealmUpdateUser" component={RealmUpdateUser} />
      <Stack.Screen name="RealmViewAllUser" component={RealmViewAllUser} />
      <Stack.Screen name="RealmViewUser" component={RealmViewUser} />
      {/* SQLite */}
      <Stack.Screen name="SQLite" component={SQLite} />
      <Stack.Screen name="SQLiteDelete" component={SQLiteDeleteUser} />
      <Stack.Screen name="SQLiteUpdate" component={SQLiteUpdateUser} />
      <Stack.Screen name="SQLiteViewAll" component={SQLiteViewAllUser} />
      <Stack.Screen name="SQLiteRegister" component={SQLiteRegisterUser} />
      <Stack.Screen name="SQLiteView" component={SQLiteViewUser} />
    </Stack.Navigator>
  );
}

export default Navigation;
