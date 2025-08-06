import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const ViewLayout = () => {
  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#1F1F1F",
            },
          }}
        >
          <Stack.Screen
            name="edit-profile"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </View>
    </View>
  );
};

export default ViewLayout;
