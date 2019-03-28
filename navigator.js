import React, { Component } from 'react'; 
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import  LoginScreen  from './views/auth/login';
import  RegisterScreen  from './views/auth/register';
import  MainScreen  from './views/main/main';
import  DetailScreen  from './views/main/detail';
import  BootScreen  from './views/boot';

const MainStack = createStackNavigator(
    {
        Main: MainScreen,
        Details: DetailScreen,
    }
)

const AuthStack = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen,
    }
)

const AppNavigator = createAppContainer(createSwitchNavigator(
    {
        MainStack: MainStack,
        AuthStack: AuthStack,
        BootScreen: BootScreen
    },
    {
        initialRouteName: 'BootScreen'
    }
));
export default AppNavigator;