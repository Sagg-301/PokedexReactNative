import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';

export default class AppStorage{

    save(key, data){
        async () => {
            try {
              await AsyncStorage.setItem(key, data);
            } catch (error) {
              Alert.alert('There was an error saving the data');
            }
          };
    }

    get(key){
        async () => {
            try {
              const value = await AsyncStorage.getItem(key);
              if (value !== null) {
                return value
              }
            } catch (error) {
                Alert.alert('There was an error fetching the data');
            }
          };
    }
}