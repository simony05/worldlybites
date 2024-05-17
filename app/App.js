import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './src/components/HomeScreen';
import { RecipeScreen } from './src/components/RecipeScreen';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen 
          name="Recipe"
          component={RecipeScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

