import React from 'react';
import { View, Text, FlatList} from 'react-native';

export const RecipeScreen = ({ route }) => {

    const { history } = route.params;
    const renderItem = ({ item, index }) => (
        <View>
            <Text>- {item}, {index}</Text>
        </View>
    );

    return (
        <View>
            <Text>Recipes</Text>
            <FlatList 
                onScrollBeginDrag={() => Keyboard.dismiss()}
                data={history} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}