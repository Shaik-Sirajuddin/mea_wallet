import Logo from '@/assets/images/logo-small.svg';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PopupModalFade from '../components/ModelFade';
import SvgIcon from '../components/SvgIcon';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [confirmPopup, setConfirmPopup] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSignIn = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError(null);
    }

    if (valid) {
      setConfirmPopup(true);
    }
  };

  return (
    <View className="flex-1 bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10 justify-between">
        <View>
          <View className="items-center">
            <Logo width={125} height={30} />
          </View>

          <Text className='text-xl font-semibold text-white mt-12'>Finding Passwords</Text>
          
          {/* Email Field */}
          <View className="mt-3 mb-2">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
              <Text className="text-base font-medium text-white">
              Enter Email Address <Text className="text-pink-1200"> *</Text>
              </Text>
            </View>
            <TextInput
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (emailError) setEmailError(null);
              }}
              placeholder="Enter Email Address"
              placeholderTextColor="#FFFFFF"
              className="text-[17px] text-white font-medium px-8 bg-black-1200 w-full h-[71px] rounded-[15px]"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? (
              <Text className="text-red-500 text-xs mt-1 ml-2">{emailError}</Text>
            ) : null}
          </View>
          
          <View className="w-full">
            <View className="flex flex-row items-center gap-2 mb-3">
              <SvgIcon name="infoIcon" />
              <Text className="text-base font-medium leading-[22px] text-white">
                Notice
              </Text>
            </View>

            <View className="py-6 px-8 bg-black-1200 rounded-[15px] w-full">
              <Text className="text-[17px] font-medium text-white">
                A temporary password will be sent to your Email Address.
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Links */}
        <View className="items-center mt-6">
          <TouchableOpacity 
            activeOpacity={1}
            onPress={handleSignIn}
            className="mb-[9px] w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center">
            <Text className="text-base group-active:text-pink-1100 text-white font-semibold">Confirm</Text>
          </TouchableOpacity>
          <View  className='mt-4 mb-4'>
          <TouchableOpacity onPress={() => router.replace('/signin')}>
          <Text className="text-[15px] text-gray-400">Sign In</Text>
          </TouchableOpacity>
       
          </View>
            <View>
          <TouchableOpacity onPress={() => router.replace('/signup')}>
          <Text className="text-[15px] text-pink-1100">Sign Up</Text>
          </TouchableOpacity>
          </View>
        </View>

      </View>

      <PopupModalFade visible={confirmPopup} setVisible={setConfirmPopup}>
        <View className='px-4'>
          <Text className='text-[17px] text-center text-white mb-4'>Temporary password has been sent.
          Please don't stop and wait.</Text>
            <Pressable
            className='text-center group  py-2.5 bg-pink-1100 border border-pink-1100 rounded-[15px] flex items-center justify-center active:bg-transparent active:text-pink-1100 hover:text-pink-1100 hover:bg-transparent'
            onPress={()=>setConfirmPopup(false)}
            >
              <Text className="text-base text-white group-active:text-pink-1100 font-semibold">
              Ok
             </Text>
            </Pressable>
        </View>
      </PopupModalFade>
    </View>
  );
};

export default ForgetPassword;
