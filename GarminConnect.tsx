import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { WebView, WebViewNavigation } from "react-native-webview";
import InAppBrowser from "react-native-inappbrowser-reborn";

const GarminConnect = () => {
  const [openBrowser, setOpenBrowser] = useState(false);
  console.log("test", Linking.createURL("/"));
  // const token = "da1d7df4-6db2-41d2-b728-71ad5eca83d5";
  const token = "7b9f11b9-a955-48c8-bb50-f6f4fc2088a5";
  const garminConnect = async () => {
    let result = await WebBrowser.openAuthSessionAsync(
      // config.googleAuthBasePath,
      // "http://localhost:8080",
      // `https://cd90-125-99-240-64.ngrok-free.app/connect/garmin?token=${token}`,
      // `https://b1ae-125-99-240-64.ngrok-free.app/connect/garmin?token=${token}`,
      `https://c271-125-99-240-64.ngrok-free.app/connect/garmin?token=${token}`,
      Linking.createURL("/")
    );
    console.log("result", result?.type);
    // setOpenBrowser(!openBrowser);
  };

  // useEffect(() => {
  //   // Check if the InAppBrowser is available
  //   async function checkAvailability() {
  //     try {
  //       const isAvailable = await (InAppBrowser as any).isAvailable();
  //       console.log("InAppBrowser is available:", isAvailable);
  //     } catch (error) {
  //       console.error("Error checking InAppBrowser availability:", error);
  //     }
  //   }

  //   checkAvailability();
  // }, []);

  // const openExternalUrl = () => {
  //   const url = "https://cd90-125-99-240-64.ngrok-free.app/connect/garmin";
  //   Linking.openURL(url).catch((err) => {
  //     console.error("Error opening URL:", err);
  //   });
  // };

  // const openExternalUrl = async () => {
  //   const url = "https://cd90-125-99-240-64.ngrok-free.app/connect/garmin";
  //   try {
  //     if (await InAppBrowser.isAvailable()) {
  //       await InAppBrowser.open(url, {
  //         // Android and iOS options
  //         showTitle: true,
  //         toolbarColor: "#6200EE",
  //         enableUrlBarHiding: true,
  //         // iOS-specific options
  //         dismissButtonStyle: "cancel",
  //         preferredBarTintColor: "#6200EE",
  //         preferredControlTintColor: "white",
  //         readerMode: false,
  //         // Android-specific options
  //         forceCloseOnRedirection: false,
  //       });
  //     } else {
  //       // Fallback to opening in a browser
  //       await Linking.openURL(url);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View>
      {/* <TouchableOpacity onPress={() => openExternalUrl()}> */}
      <TouchableOpacity onPress={() => garminConnect()}>
        <Text>Connect To Garmin</Text>
      </TouchableOpacity>
      {/* {openBrowser && (
        <View style={{ flex: 1, width: 500 }}>
          <AuthScreen />
        </View>
      )} */}
    </View>
  );
};

const AuthScreen = () => {
  const [webViewUrl, setWebViewUrl] = useState(
    "https://cd90-125-99-240-64.ngrok-free.app/connect/garmin"
  );
  const webViewRef = useRef<WebView | null>(null);

  // Handle WebView navigation
  const handleNavigationStateChange = (newNavState: WebViewNavigation) => {
    // Check if the WebView navigated to a URL indicating authentication completion
    if (
      newNavState.url &&
      newNavState.url.includes("YOUR_BACKEND_CALLBACK_URL")
    ) {
      // Close the WebView using JavaScript injection
      webViewRef.current?.injectJavaScript("window.close();");

      // You can also perform any additional logic here as needed
    }
  };
  return (
    <WebView
      ref={(ref) => (webViewRef.current = ref)}
      source={{ uri: webViewUrl }}
      onNavigationStateChange={handleNavigationStateChange}
      injectedJavaScript={
        "window.ReactNativeWebView.postMessage(document.body.innerHTML);"
      }
      javaScriptEnabled={true}
    />
  );
};

export default GarminConnect;
