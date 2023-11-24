import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { SearchKeyWordData } from '../Data/SearchKeyWordData';

const { height, width } = Dimensions.get('window');

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState(SearchKeyWordData);
  const navigation = useNavigation();

  useEffect(() => {
    const filteredData = SearchKeyWordData.filter(item =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchKeyword]);

  const navigatePage = (GoSearchResults, activeBySearch) => {
    navigation.navigate(GoSearchResults, { activeSectionBySearch: activeBySearch });
    // navigation.navigate(GoSearchResults);
  };

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
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          {searchKeyword.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.resultItem} onPress={() => navigatePage(item.press, item.activeBySearch)}>
                  <Text style={styles.name}>{`${item.press} > ${item.name}`}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Image source={require('../../assets/searchingGIF.gif')} style={styles.gifImage} />
          )}
        </View>
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
    marginLeft: 15,
    marginVertical: 7,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  description: {
    color: colors.text,
    fontSize: 14,
  },
  gifImage: {
    width: width * 1,
    height: height * 0.4,
  }
});