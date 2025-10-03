import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { Pressable, Text, Image, View } from "react-native";
import InfoAlert from "../InfoAlert";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/src/features/loadingSlice";
import useAuth from "@/hooks/api/useAuth";
import storage from "@/storage";
import { STORAGE_KEYS } from "@/storage/keys";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const GoogleSSOButton = () => {
  const [popupVisible, setPopUpVisible] = useState(false);
  const [popupText, setPopupText] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const GoogleLogin = async () => {
    // check if users' device has google play services
    await GoogleSignin.hasPlayServices();

    // initiates signIn process
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  };

  const handleOAuthToken = async (token: string) => {
    try {
      //try login
      console.log("token here" , token)
      let loginInResult = await useAuth.signInWithGoogle(token);
      console.log("error here" , loginInResult)
      if (typeof loginInResult === "string") {
        //login in failed
        setPopupText(t("auth.signin.login_error"));
        setPopUpVisible(true);
        return;
      }

      if (loginInResult.status === "succ") {
        await storage.save(STORAGE_KEYS.AUTH.TOKEN, loginInResult.token);
        if (router.canDismiss()) {
          router.dismissAll();
        }
        router.replace("/(Tabs)/home");
        return;
      }

      if (loginInResult.status === "need_link") {
        setPopUpVisible(true);
        setPopupText(
          "Account uses email login , please continue with email login"
        );
        return;
      }

      if (loginInResult.status === "need_signup") {
        //todo : collect deposit address and proceed sign up
        router.navigate({
          pathname: "/(auth)/sign-up-google",
          params: {
            token: loginInResult.token,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInClick = async () => {
    try {
      //   await GoogleSignin.signOut();
      dispatch(showLoading());
      const response = await GoogleLogin();
      dispatch(hideLoading());
      // retrieve user data
      const { idToken, user } = response.data ?? {};
      if (idToken) {
        handleOAuthToken(idToken);
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
        onPress={handleSignInClick}
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
