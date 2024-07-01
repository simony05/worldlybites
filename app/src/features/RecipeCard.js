import React from 'react';
import { View, Text, Image } from 'react-native';

export const RecipeCard = ({ recipe }) => {
    return (
        <View>
            <Text>{recipe.title}</Text>
            <Image
                source={{ uri: `data:image/jpeg;base64,${recipe.image}` }}
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
};