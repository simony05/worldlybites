import React from 'react';
import { View, Text, Button, StyleSheet, FlatList , Keyboard } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

export const IngredientsList = ({ history, onDelete }) => {

    const renderItem = ({ item, index }) => (
        <View>
            <Text style={styles.item}>- {item}, {index}</Text>
            <Button title='X' onPress={() => onDelete(index)} />
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
        fontSize: fontSizes.md,
        color: colors.white,
    },
    title: {
        color: colors.white,
        fontSize: fontSizes.md,
        padding: spacing.md,
        fontWeight: 'bold',
    }
})