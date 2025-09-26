import { Platform, PermissionsAndroid } from "react-native";
import messaging from "@react-native-firebase/messaging";

export async function requestNotificationPermission() {
  if (Platform.OS === "ios") {
    // iOS requires explicit permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  }

  if (Platform.OS === "android") {
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    // On Android 12 and below, permission is always granted
    return true;
  }

  return false;
}
