import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { spacing } from '../utils/sizes';

export const Ingredients = ({ addIngredient }) => {

    const [ingredient, setIngredient] = useState('');

    const submit = () => {
        addIngredient(ingredient);
        setIngredient('');
    }

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput}
                    label="Add ingredient one at a time (ex: butter, apple, beef)"
                    onChangeText={setIngredient}
                    value={ingredient}
                />
                <View style={styles.button}>
                    {ingredient != '' ?
                        <Button 
                            title="Add"
                            onPress={submit}
                        />
                        : 
                        <Button
                            title="Add"
                        />
                    }
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
    },
    textInput: {
        flex: 1,
        marginRight: spacing.sm,
    },
    inputContainer: {
        padding: spacing.lg,
        justifyContent: 'top',
        flexDirection: 'row',
    }
})