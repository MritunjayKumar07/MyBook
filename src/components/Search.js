import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';

const allData = [
    { id: 1, name: 'Home', description: 'Home Page', press:'Home' },
    { id: 2, name: 'Search1', description: 'Search Page', press:'Search' },
    { id: 3, name: 'Search2', description: 'Search Page', press:'Search' },
    { id: 4, name: 'Search3', description: 'Search Page', press:'Search' },
    { id: 5, name: 'Search4', description: 'Search Page', press:'Search' },
    { id: 6, name: 'Search5', description: 'Search Page', press:'Search' },
    { id: 7, name: 'Search6', description: 'Search Page', press:'Search' },
    { id: 8, name: 'Search7', description: 'Search Page', press:'Search' },
    { id: 9, name: 'Search8', description: 'Search Page', press:'Search' },
    { id: 10, name: 'Search9', description: 'Search Page', press:'Search' },
    { id: 11, name: 'Search10', description: 'Search Page', press:'Search' },
    { id: 12, name: 'Search11', description: 'Search Page', press:'Search' },
    { id: 13, name: 'Search12', description: 'Search Page', press:'Search' },
    { id: 14, name: 'Search13', description: 'Search Page', press:'Search' },
    { id: 15, name: 'Search14', description: 'Search Page', press:'Search' },
    { id: 16, name: 'Search15', description: 'Search Page', press:'Search' },
    { id: 17, name: 'Search16', description: 'Search Page', press:'Search' },
    { id: 18, name: 'Search17', description: 'Search Page', press:'Search' },
    { id: 19, name: 'Search18', description: 'Search Page', press:'Search' },
    { id: 20, name: 'Search19', description: 'Search Page', press:'Search' },
];

export default function Search() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const filteredData = allData.filter(item =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setSearchResults(filteredData);
    }, [searchKeyword]);

    return (
        <View style={styles.container}>
            <View style={styles.boxContent}>
                <View style={styles.filterView}>
                    <TextInput
                        style={styles.filterInput}
                        placeholder="Enter keyword..."
                        onChangeText={text => setSearchKeyword(text)}
                    />
                    <View style={[styles.filterPicker, { width: 'auto', backgroundColor: colors.primary }]}>
                        <Text
                            style={[
                                styles.Picker,
                                {
                                    textAlign: 'center',
                                    paddingHorizontal: 10,
                                    fontSize: 18,
                                    color: colors.text,
                                }
                            ]}>Search</Text>
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        data={searchResults}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.resultItem} onPress={() => navigation.navigate(item.press)}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 8,
        height: '100%',
        backgroundColor: colors.background,
    },
    boxContent: {
        gap: 0.3875 * 16,
        flexShrink: 0,
    },
    filterView: {
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 0,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    filterInput: {
        margin: 5,
        height: 40,
        borderRadius: 0.5 * 16,
        backgroundColor: colors.text,
        paddingLeft: 10,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
    },
    filterPicker: {
        width: 130,
        height: 40,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: colors.text,
    },
    Picker: {
        lineHeight: 40,
    },
    resultItem: {
        flexDirection: 'column',
        borderRadius: 12,
        marginLeft:15,
        marginVertical:7,
    },
    name: {
        color: colors.text,
        fontSize: 15,
        fontWeight: 'bold',
    },
    description: {
        color: colors.text,
        fontSize: 14,
    }
});