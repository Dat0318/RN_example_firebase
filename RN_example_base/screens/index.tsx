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

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

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
    </Stack.Navigator>
  );
}

export default Navigation;
