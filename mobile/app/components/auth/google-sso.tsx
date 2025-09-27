import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { Pressable, Text, Image, View } from "react-native";
import InfoAlert from "../InfoAlert";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/src/features/loadingSlice";

const GoogleSSOButton = () => {
  const [popupVisible, setPopUpVisible] = useState(false);
  const [popupText, setPopupText] = useState("");
  const dispatch = useDispatch();
  const GoogleLogin = async () => {
    // check if users' device has google play services
    await GoogleSignin.hasPlayServices();

    // initiates signIn process
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  };

  const googleSignIn = async () => {
    try {
      //   await GoogleSignin.signOut();
      dispatch(showLoading());
      const response = await GoogleLogin();
      dispatch(hideLoading());
      // retrieve user data
      const { idToken, user } = response.data ?? {};
      if (idToken) {
        console.log("Received data from user ", idToken, user);
        // await processUserData(idToken, user); // Server call to validate the token & process the user data for signing In
      } else {
        setPopUpVisible(true);
        setPopupText("Something went wrong , please try again ");
        //show something went wrong
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <View>
      <Pressable
        onPress={googleSignIn}
        className="flex-row items-center justify-center bg-white rounded-full h-12 w-full shadow"
      >
        <Image
          source={require("../../../assets/images/google_logo.png")}
          className="w-6 h-6 mr-3"
        />
        <Text className="text-base font-medium text-black">
          Continue with Google
        </Text>
      </Pressable>

      <InfoAlert
        visible={popupVisible}
        setVisible={setPopUpVisible}
        text={popupText}
      />
    </View>
  );
};

export default GoogleSSOButton;
