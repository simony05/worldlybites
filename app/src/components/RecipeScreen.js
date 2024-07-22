import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Keyboard } from 'react-native';
import { RecipeCard } from '../features/RecipeCard';

export const RecipeScreen = ({ route }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    //const { history } = route.params || [];
    
    useEffect(() => {
        setIngredients(route.params);
    }, [route.params]);

    const renderItem = ({ item, index }) => (
        <View>
            <Text>- {item}, {index}</Text>
        </View>
    );
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const params = ingredients.join(' ');
            const response = await fetch(`http://10.0.0.80:5000/recipe?ingredients=${params}`);
            const recipes = await response.json();
            //const formattedData = Object.values(recipes);
            setData( Object.values(recipes));
            setIsLoading(false);
        };
        fetchData();
    }, [ingredients])

    return (
        <View>
            <Text>Recipes</Text>
            {isLoading ? <Text>Loading...</Text> : null}
            <FlatList 
                onScrollBeginDrag={() => Keyboard.dismiss()}
                data={ingredients} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => <RecipeCard recipe={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}