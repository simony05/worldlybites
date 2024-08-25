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
                    label="Add ingredient one at a time"
                    onChangeText={setIngredient}
                    value={ingredient}
                    color="black"
                />
                <View style={styles.button}>
                    {ingredient != '' ?
                        <Button 
                            titleStyle={{ color: 'black' }}
                            color="black"
                            title="Add"
                            onPress={submit}
                            
                        />
                        : 
                        <Button
                            titleStyle={{ color: 'black' }}
                            color="black"
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
        backgroundColor: '#D3D3D3'
    },
    inputContainer: {
        padding: spacing.lg,
        justifyContent: 'top',
        flexDirection: 'row',
    }
})