package com.rn_example_base; // replace com.your-app-name with your app’s name

import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class CalendarModule extends ReactContextBaseJavaModule {

  CalendarModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "CalendarModule";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("DEFAULT_EVENT_NAME", "New Event");
    return constants;
  }

  @ReactMethod
  public void createCalendarEvent(String name, String location) {
    Log.d(
      "CalendarModule",
      "Create event called with name: " + name + " and location: " + location
    );
    String dateFormat = "yyyy-MM-dd";
    SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
    String dateString = sdf.format(new Date());
    try {
      Log.d("CalendarModule", "Now Date: " + dateString);
    } catch (Exception ex) {
      System.out.println("couldn't send message.");
    }
  }
}
