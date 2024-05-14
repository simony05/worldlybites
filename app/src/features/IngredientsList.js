import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

export const IngredientsList = ({ history }) => {

    const renderItem = ({item}) => <Text style={styles.item}>- {item}</Text>

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingredients List</Text>
            <FlatList 
                data={history} 
                renderItem={renderItem} 
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