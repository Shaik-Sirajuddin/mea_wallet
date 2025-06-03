import EyeIcon from '@/assets/images/eye-icon.svg';
import Logo from '@/assets/images/logo-small.svg';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Signin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation state
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSignIn = () => {
    let valid = true;

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError(null);
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (valid) {
      Alert.alert('Login...');
      // Place your login logic here
    }
  };

  return (
    <View className="flex-1 bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10 justify-between">
        <View>
          <View className="items-center">
            <Logo width={125} height={30} />
          </View>
          
          <View className="flex-row items-center gap-4 mt-12">
          <TouchableOpacity onPress={() => router.replace('/signin')}>
          <Text className="text-xl font-semibold text-white">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/signup')}>
          <Text className="text-xl font-semibold text-gray-400">Sign Up</Text>
          </TouchableOpacity>
          </View>
          
          {/* Email Field */}
          <View className="mt-3 mb-2">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
              <Text className="text-base font-medium text-white">
                Email Address <Text className="text-pink-1200">*</Text>
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

            {/* Password Field */}
          <View className="mb-2">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
              <Text className="text-base font-medium text-white">
                Password <Text className="text-pink-1200">*</Text>
              </Text>
            </View>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (passwordError) setPasswordError(null);
                }}
                secureTextEntry={!showPassword}
                placeholder="Enter Password"
                placeholderTextColor="#FFFFFF"
                className="text-[17px] text-white font-medium pl-8 pr-14 bg-black-1200 w-full h-[71px] rounded-[15px]"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                className="absolute p-2 top-1/2 right-4 -translate-y-1/2">
                <EyeIcon />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text className="text-red-500 text-xs mt-1 ml-2">{passwordError}</Text>
            ) : null}
          </View>
          
        </View>

        {/* Bottom Links */}
        <View className="items-center mt-6">
          <TouchableOpacity 
            activeOpacity={1}
            onPress={handleSignIn}
            className="mb-[9px] w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center">
            <Text className="text-base group-active:text-pink-1100 text-white font-semibold">Sign In</Text>
          </TouchableOpacity>
          <View  className='mt-5 mb-4'>
          <Link href="/forget-password">
            <Text className="text-[15px] text-gray-400">Forgot Password</Text>
          </Link>
          
          </View>
            <View>
          <TouchableOpacity onPress={() => router.replace('/signup')}>
          <Text className="text-[15px] text-pink-1100">Sign Up</Text>
          </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
};

export default Signin;
