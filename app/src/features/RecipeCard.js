import React from 'react';
import { View, Text } from 'react-native';

export const RecipeCard = ({ recipe }) => {
    return (
        <View>
            <Text>{recipe.title}</Text>
        </View>
    );
};