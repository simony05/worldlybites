import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';
import Icon from 'react-native-vector-icons/FontAwesome';

export const IngredientsList = ({ history, onDelete }) => {

    const renderItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={styles.item}>• {item} </Text>
            <Icon name="times-circle" size={16} color="#333" onPress={() => onDelete(index)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingredients List</Text>
            <FlatList 
                onScrollBeginDrag={() => Keyboard.dismiss()}
                data={history} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        flex: 1,
    },
    item: {
        fontSize: 16,
        color: 'black',
    },
    title: {
        color: 'black',
        fontSize: 24,
        padding: spacing.md,
        fontWeight: 'bold',
    }
})