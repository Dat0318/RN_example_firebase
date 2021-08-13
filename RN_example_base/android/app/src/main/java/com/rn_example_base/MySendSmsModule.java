package com.rn_example_base;
 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException; 

import android.telephony.SmsManager;

public class MySendSmsModule extends ReactContextBaseJavaModule {
 
    public MySendSmsModule(ReactApplicationContext reactContext) {
        //required by React Native
        super(reactContext);
    }
 
    @Override
    //getName is required to define the name of the module
    public String getName() { 
        return "DirectSms";
    }
 
    @ReactMethod
    public void sendDirectSms(String phoneNumber, String msg) {
        try {  
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(
              phoneNumber, null, msg, null, null
            );
        } catch (Exception ex) {
            System.out.println("couldn't send message.");
        } 
    }
}