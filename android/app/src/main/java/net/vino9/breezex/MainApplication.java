package net.vino9.breezex;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.auth0.lock.react.LockReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    private static final String CODEPUSH_DEPLOYMENT_KEY = "RWpbuJCIMycGIQXCSfH_7Ahfw8_p4kPQJ17LM";
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new RNDeviceInfo(),
            new GoogleAnalyticsBridgePackage(),
            new LockReactPackage(),
            new CodePush(CODEPUSH_DEPLOYMENT_KEY, getApplicationContext(), BuildConfig.DEBUG)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
