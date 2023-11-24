import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Alert, FlatList, ScrollView, Dimensions, Modal, SafeAreaView, } from 'react-native';

export default function AddTransation() {
    const [inputValues, setInputValues] = useState({
        party: '',
        amount: '',
        description: '',
    });
    
    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    };
    const saveData = async () => {
        const { party, amount, description } = inputValues;
        if (party.trim() === '' || amount.trim() === '') {
            Alert.alert('Error', 'All fields are required');
        } else {
            try {
                const currentDate = new Date();
                const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
                const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
                const existingData = await AsyncStorage.getItem('BusinessData');
                const id = generateUniqueId();
                const parsedData = JSON.parse(existingData) || [];
                const newData = [
                    ...parsedData,
                    { id, type: `${activeSection}`, party, amount, description, date: formattedDate, time: formattedTime },
                ];
                await AsyncStorage.setItem('BusinessData', JSON.stringify(newData));
                Alert.alert('Success', 'Data saved successfully!');
                setAddData(false);
                setInputValues({ party: '', amount: '', description: '' }); // Reset input values after saving
            } catch (error) {
                Alert.alert('Error', 'Error saving data: ' + error.message);
            }
        }
    };
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.boxContent}>
                    <ScrollView style={styles.AddTransaction}>
                        {/* Add Data */}
                        <View style={styles.InnerAddTransaction}>
                            <Text style={styles.AddDataTitle}>Add Transaction in <Text style={{ color: 'orange' }}>{activeSection}</Text> Book</Text>
                            <View style={styles.AddDataInput}>
                                <Text style={styles.AddDataTitle}>Party name</Text>
                                <TextInput
                                    style={styles.InputField}
                                    placeholder="Name..."
                                    onChangeText={text => setInputValues({ ...inputValues, party: text })}
                                    value={inputValues.party}
                                />
                            </View>
                            <View style={styles.AddDataInput}>
                                <Text style={styles.AddDataTitle}>Amount</Text>
                                <TextInput
                                    style={styles.InputField}
                                    placeholder="Amount..."
                                    onChangeText={text => setInputValues({ ...inputValues, amount: text })}
                                    value={inputValues.amount}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.AddDataInput}>
                                <Text style={styles.AddDataTitle}>Description</Text>
                                <TextInput
                                    style={[styles.InputField, { height: 6.4375 * 16 }]}
                                    placeholder="Description..."
                                    onChangeText={text => setInputValues({ ...inputValues, description: text })}
                                    value={inputValues.description}
                                />
                            </View>
                            <Pressable style={styles.AddButton} onPress={saveData}>
                                <Text style={styles.submitData}>Submit</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: colors.background,
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    boxContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0.3875 * 16,
        flexShrink: 0,
    },
    AddTransaction: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 2.125 * 16,
        gap: 1 * 16,
    },
    InnerAddTransaction: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1 * 16,
    },
    AddDataInput: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    AddDataTitle: {
        color: colors.text,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    InputField: {
        width: 21.0625 * 16,
        height: 3.4375 * 16,
        borderRadius: 0.75 * 16,
        borderWidth: 1,
        padding: 10,
        borderColor: colors.text,
        backgroundColor: colors.text,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    AddButton: {
        width: 7.375 * 16,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#CEA9A1',
        marginTop: 10,
    },
    submitData: {
        color: '#2E2E33',
        textAlign: 'center',
        // fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
    },
})