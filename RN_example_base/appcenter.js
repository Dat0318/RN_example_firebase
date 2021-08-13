'CREATE AN APP';
'ANDROID';
// appcenter apps create -d RnExampleAndroid -o Android -p React-Native
'result: ';
// App Secret:            917d4525-193b-4717-94dd-1c34de823185
// Description:
// Display Name:          RnExampleAndroid
// Name:                  RnExampleAndroid
// OS:                    Android
// Platform:              React-Native
// Release Type:
// Owner ID:              032161df-f806-4810-ab8e-f57f57a0fc2b
// Owner Display Name:    Adamo Digital
// Owner Email:           support@adamodigital.com
// Owner Name:            adamodigital
'deployment';
// appcenter codepush deployment add -a dattran0319-gmail.com/RnExampleAndroid Staging
// appcenter codepush deployment add -a dattran0319-gmail.com/RnExampleAndroid Production
'get list key';
// appcenter codepush deployment list -a dattran0319-gmail.com/RnExampleAndroid -k

// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ 3j8Rqfg9G421Q-4VICSNEySSehJinGHGJuy5t │
// ├────────────┼───────────────────────────────────────┤
// │ Staging    │ WnQjLyEv311M94JKK0CH7k3T2RpGsBjLwyBZi │

'IOS';
// appcenter apps create -d RnExampleIos -o iOS -p React-Native
'result';
// App Secret:            4d3d300d-2f4c-4c58-b38e-6d60d5cf6935
// Description:
// Display Name:          RnExampleIos
// Name:                  RnExampleIos
// OS:                    iOS
// Platform:              React-Native
// Release Type:
// Owner ID:              032161df-f806-4810-ab8e-f57f57a0fc2b
// Owner Display Name:    Adamo Digital
// Owner Email:           support@adamodigital.com
// Owner Name:            adamodigital

// Kill package
// adb uninstall com.rn_example_base

'deployment';
// appcenter codepush deployment add -a dattran0319-gmail.com/RnExampleIos Staging
// appcenter codepush deployment add -a dattran0319-gmail.com/RnExampleIos Production
'get list key';
// appcenter codepush deployment list -a dattran0319-gmail.com/RnExampleIos -k

// │ Staging    │ zpzI6qUBMlYTsQ40IRQ56zg8n6_hfTP18RkrJ │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ _ct6WYszTbzQM64l7HRnAdabqThtqHwm5RloT │

'RELEASE APP';
// "cpis": "appcenter codepush release-react -a dattran0319-gmail.com/RnExampleIos -d Staging",
// "cpas": "appcenter codepush release-react -a dattran0319-gmail.com/RnExampleAndroid -d Staging",
// "cpip": "appcenter codepush release-react -a dattran0319-gmail.com/RnExampleIos -d Production",
// "cpap": "appcenter codepush release-react -a dattran0319-gmail.com/RnExampleAndroid -d Production",
