import React, { useState, useEffect } from 'react';
import { View, Text, FlatList} from 'react-native';

export const RecipeScreen = ({ route }) => {

    const { history } = route.params;
    const renderItem = ({ item, index }) => (
        <View>
            <Text>- {item}, {index}</Text>
        </View>
    );
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://169.231.126.186:8081/recipe?ingredients= pasta tomato onion', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(recipes => {
            console.log(recipes)
            //setData(recipes)
        })
    }, [])

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