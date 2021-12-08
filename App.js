import React, { useState } from 'react';

import Login from './screens/login';
import BoardScreen from './screens/boards';
import MapScreen from './screens/map';
import UserLoginScreen from './screens/userLogin';
import UserSignupScreen from './screens/userSignup';
import SettingScreen from './screens/settings';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

// This gets rid of the non-serialized warning when passing a function
// through route.params
LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
]);

export default function App() {
  const [username, setUsername] = useState('FuriousFive5');
  const [userEmail, setUserEmail] = useState('abc123@mail');
  const [boardsType, setBoardsType] = useState('My');
  const [userPhoto, setUserPhoto] = useState('default');

  // Used to store information from the google login
  const setUserInfo = (name, email, photo) => {
    setUsername(name);
    setUserEmail(email);
    setUserPhoto(photo);
  }

  function boardScreen({ route, navigation }) {
    return (
      <BoardScreen
        setBoardsType={setBoardsType}
        setCreator={route.params.setCreator}
        navigator={navigation}
        userPhoto={'default'}
        setBoard={route.params.setBoard}
      />
    )
  }

  function loginScreen({ navigation }) {
    return (
      <Login
        navigator={navigation}
      />
    )
  };

  function userLoginScreen({ route, navigation }) {
    return (
      <UserLoginScreen
        navigator={navigation}
      />
    )
  };

  function userSignupScreen({ route, navigation }) {
    return (
      <UserSignupScreen
        navigator={navigation}
      />
    )
  };

  function settingsScreen({ route, navigation }) {
    return (
      <SettingScreen
        navigator={navigation}
        userPhoto={userPhoto}
        locationPermission={route.params.locationPermission}
      />
    )
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Boards" component={boardScreen} />
        <Stack.Screen name="User Login" component={userLoginScreen} />
        <Stack.Screen name="User Sign Up" component={userSignupScreen} />
        <Stack.Screen name="Settings" component={settingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
