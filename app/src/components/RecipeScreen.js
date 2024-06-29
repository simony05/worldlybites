import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList} from 'react-native';
import { RecipeCard } from '../features/RecipeCard';

export const RecipeScreen = ({ route }) => {

    const [isLoading, setIsLoading] = useState(false);
    const { history } = route.params || [];
    const renderItem = ({ item, index }) => (
        <View>
            <Text>- {item}, {index}</Text>
        </View>
    );
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const params = history.join(' ');
        fetch(`http://10.0.0.119:5000/recipe?ingredients=${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(recipes => {
            console.log(recipes)
            setData(Array.from(recipes))
            setIsLoading(false);
        })
    }, [])

    return (
        <View>
            <Text>Recipes</Text>
            {isLoading ? <Text>Loading...</Text> : null}
            <FlatList 
                onScrollBeginDrag={() => Keyboard.dismiss()}
                data={history} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()}
            />
            <ScrollView>
                {data.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </ScrollView>
        </View>
    )
}