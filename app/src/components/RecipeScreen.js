import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Keyboard } from 'react-native';
import { RecipeCard } from '../features/RecipeCard';
import { ActivityIndicator } from 'react-native';

export const RecipeScreen = ({ route }) => {

    const [isLoading, setIsLoading] = useState(true);
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
            const params = ingredients.history.join(' ');
            //console.log(params);
            const response = await fetch(`http://10.0.0.119:5000/recipe?ingredients=${params}`);
            const recipes = await response.json();
            //const formattedData = Object.values(recipes);
            setData(Object.values(recipes));
            setIsLoading(false);
        };
        fetchData();
    }, [ingredients])

    return (
        <SafeAreaView>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Worldly Bites</Text>
            </View>
            {isLoading ? (
               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', padding: 20 }}>
                    <ActivityIndicator
                        size="large"
                        color="#666"
                        animating={isLoading}
                    />
                </View>
            ) : (
              <>
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
              </>
            )}
        </SafeAreaView>
    )
}