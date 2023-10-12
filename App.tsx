import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GarminConnect from "./GarminConnect";
import AuthScreen from "./GarminConnect";
// import GarminConnect from '../garmin-connect/'
// import {} from './'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <View>
        <GarminConnect />
        {/* <AuthScreen /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
