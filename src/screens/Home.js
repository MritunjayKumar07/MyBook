import React, { useState, useEffect, } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  FlatList,
  ScrollView,
  Dimensions,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../assets/colors';


const applyFilter = (data, filterCriteria, filterKeyword) => {
  let filteredData = [...data];
  switch (filterCriteria) {
    case 'amount':
    case 'party':
    case 'date':
    case 'description':
      filteredData = filteredData.filter(item => item[filterCriteria].includes(filterKeyword));
      break;
    default:
      break;
  }
  return filteredData;
};
const { height, width } = Dimensions.get('window');

export default function Home() {
  const [sections, setSections] = useState(['Loan', 'Udhar', 'Expense', 'Income']);
  const [activeSection, setActiveSection] = useState('Loan');
  const [filterCriteria, setFilterCriteria] = useState('party');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(null);
  const [addData, setAddData] = useState(false);
  const [edit, setEdit] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    party: '',
    amount: '',
    description: '',
  });
  const [newSectionInput, setNewSectionInput] = useState('');


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

  const deleteItem = async (itemId) => {
    Alert.alert(
      'Confirm',
      'Do you really want to delete this transaction?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel delete operation...');
          },
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const storedData = await AsyncStorage.getItem('BusinessData');
              if (storedData) {
                const parsedData = JSON.parse(storedData);
                const updatedData = parsedData.filter(item => item.id !== itemId);
                await AsyncStorage.setItem('BusinessData', JSON.stringify(updatedData));
                getData();
                setShow(null);
              }
            } catch (error) {
              console.error('Error deleting data: ', error);
            }
          },
        },
      ]
    );
  };

  const editItem = async (itemId) => {
    try {
      // Fetch the existing data from AsyncStorage
      const storedData = await AsyncStorage.getItem('BusinessData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Find the index of the item to be edited
        const itemIndex = parsedData.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          // Update the item properties with new values
          parsedData[itemIndex].party = inputValues.party || parsedData[itemIndex].party;
          parsedData[itemIndex].amount = inputValues.amount || parsedData[itemIndex].amount;
          parsedData[itemIndex].description = inputValues.description || parsedData[itemIndex].description;
          // Save the updated data back to AsyncStorage
          await AsyncStorage.setItem('BusinessData', JSON.stringify(parsedData));
          // Fetch and update the state with the updated data
          getData();
          // Reset input values and show a success message
          setInputValues({ party: '', amount: '', description: '' });
          setShow(null);
          Alert.alert('Success', 'Data updated successfully!');
        } else {
          Alert.alert('Error', 'Item not found.');
        }
      }
    } catch (error) {
      console.error('Error editing data: ', error);
      Alert.alert('Error', 'Error editing data: ' + error.message);
    }
  };


  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('BusinessData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const filteredData = parsedData.filter(item => item.type === activeSection);
        setData(filteredData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  const calculateTotalAmount = (data) => {
    return data.reduce((total, item) => total + parseFloat(item.amount), 0);
  };

  const totalAmount = calculateTotalAmount(data);

  const handleOKPress = () => {
    if (newSectionInput.trim() !== '') {
      setSections([...sections, newSectionInput]);
      setNewSectionInput('');
      setModalVisible(false);
      SaveSection();
    } else {
      Alert.alert('Error', 'Section name cannot be empty');
    }
  };

  const handleCancelPress = () => {
    console.log('Cancel Pressed');
    setModalVisible(false);
  };

  const AddListInput = () => {
    setModalVisible(true);
  };

  const SaveSection = async () => {
    try {
      await AsyncStorage.setItem('AccountSection', JSON.stringify(sections));
      Alert.alert('Success', 'Data saved successfully!');
      GatSection();
    } catch (error) {
      Alert.alert('Error', 'Error saving data: ' + error.message);
    }
  }

  const GatSection = async () => {
    try {
      const GatSectionData = await AsyncStorage.getItem('AccountSection');
      const GatSectionDataParce = JSON.parse(GatSectionData);
      console.log(GatSectionDataParce);
    } catch (error) {
      Alert.alert('Error', 'Error retrieving data: ' + error.message);
    }
  }

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
      GatSection();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [activeSection]);


  return (
    <View style={styles.container}>
      <View style={styles.boxContent}>
        {show ? (
          <ScrollView style={styles.editDeletContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AntDesign onPress={() => setShow(null)} name="back" size={38} color={colors.primary} />
              <AntDesign onPress={() => setEdit(!edit)} name="edit" size={38} color={colors.primary} />
            </View>
            <View style={styles.box}>
              <Text style={styles.AddDataTitle}>Date</Text>
              <View style={[styles.InputField, { flexDirection: 'row' }]}>
                <Text style={{ color: colors.background }}>{show.date}</Text>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.AddDataTitle}>Time</Text>
              <View style={[styles.InputField, { flexDirection: 'row' }]}>
                <Text style={{ color: colors.background }}>{show.time}</Text>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.AddDataTitle}>Party Name</Text>
              <View style={[styles.InputField, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                {edit ? (
                  <Text style={{ color: colors.background }}>{show.party}</Text>
                ) : (
                  <TextInput
                    placeholder="Party name..."
                    onChangeText={text => setInputValues({ ...inputValues, party: text })}
                    value={inputValues.party}
                  />
                )}
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.AddDataTitle}>Amount</Text>
              <View style={[styles.InputField, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                {edit ? (
                  <Text style={{ color: colors.background }}>{show.amount}</Text>
                ) : (
                  <TextInput
                    placeholder="Amount..."
                    onChangeText={text => setInputValues({ ...inputValues, amount: text })}
                    value={inputValues.amount}
                    keyboardType="numeric"
                  />
                )}
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.AddDataTitle}>Description</Text>
              <View style={[styles.InputField, { height: 150, flexDirection: 'row', justifyContent: 'space-between' }]}>
                {edit ? (
                  <Text style={{ color: colors.background }}>{show.description}</Text>
                ) : (
                  <TextInput
                    style={[{ height: 6.4375 * 16 }]}
                    placeholder="Description..."
                    onChangeText={text => setInputValues({ ...inputValues, description: text })}
                    value={inputValues.description}
                  />
                )}
              </View>
            </View>
            <View style={styles.boxSubmit}>
              <TouchableOpacity
                style={[styles.AddButton, { backgroundColor: '#7AEA36' }]}
                onPress={() => editItem(show.id)}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.AddButton, { backgroundColor: '#F26F53' }]}
                onPress={() => deleteItem(show.id)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <>
            {/* List:- */}
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
            <ScrollView horizontal style={styles.listHorzontalScroll}>
              <View style={styles.listView}>
                {sections.map(section => (
                  <TouchableOpacity
                    key={section}
                    onPress={() => setActiveSection(section)}
                    // onLongPress={handleLongPress}
                    style={[styles.listViewButtons, activeSection === section && styles.activelistViewButtons]}
                  >
                    <Text style={styles.listViewText}>{section}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={AddListInput}>
                  <Ionicons
                    style={{ color: colors.primary, lineHeight: 65 }}
                    name="add-circle-sharp"
                    size={55}
                    color={colors.primary}
                  />
                </TouchableOpacity>

                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Add New Account</Text>
                      <TextInput
                        style={styles.inputField}
                        placeholder="Type here..."
                        onChangeText={text => setNewSectionInput(text)}
                      />
                      <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleCancelPress}>
                          <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleOKPress}>
                          <Text>OK</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </ScrollView>
            {/* filter:- */}
            <View style={styles.filterView}>
              <TextInput
                style={styles.filterInput}
                placeholder="Enter keyword..."
                onChangeText={text => setFilterKeyword(text)}
              />
              <View style={styles.filterPicker}>
                <Picker
                  selectedValue={filterCriteria}
                  style={styles.Picker}
                  onValueChange={itemValue => setFilterCriteria(itemValue)}
                >
                  <Picker.Item label="Amount" value="amount" />
                  <Picker.Item label="Party" value="party" />
                  <Picker.Item label="Date" value="date" />
                  <Picker.Item label="Description" value="description" />
                </Picker>
              </View>
            </View>
            {/* listTitle:- */}
            <View style={styles.listTitle}>
              <Text style={styles.listTitletext}>Total {activeSection}: {totalAmount}</Text>
              {addData ?
                <Ionicons
                  onPress={() => setAddData(!addData)}
                  style={styles.Addbutton}
                  name="close-circle"
                  size={55}
                  color={colors.primary}
                /> :
                <Ionicons
                  onPress={() => setAddData(!addData)}
                  style={styles.Addbutton}
                  name="add-circle-sharp"
                  size={55}
                  color={colors.primary}
                />}
            </View>
            {addData ? (
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
            ) : (
              <ScrollView>
                {/* List */}
                <View style={styles.list}>
                  <FlatList
                    data={applyFilter(data, filterCriteria, filterKeyword)}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => setShow(item)} style={styles.singleList}>
                        <View style={styles.DateTime}>
                          <View style={styles.DateText}>
                            <Text style={styles.listText}>Date : {item.date}</Text>
                          </View>
                          <View style={styles.TimeText}>
                            <Text style={styles.listText}>Time : {item.time}</Text>
                          </View>
                        </View>
                        <Text style={styles.listText}>Name : {item.party}</Text>
                        <Text style={styles.listText}>Amount : {item.amount}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
              </ScrollView>
            )}
          </>
        )}
      </View>
    </View>
  );
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
  //List:-
  listHorzontalScroll: {
    height: 70,
  },
  listView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  listViewButtons: {
    display: 'flex',
    padding: 0.625 * 16,
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: colors.text,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 100,
    shadowRadius: 4,
    elevation: 10,
  },
  activelistViewButtons: {
    backgroundColor: colors.primary,
  },
  listViewText: {
    color: colors.background,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  //filter:-
  filterView: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    // marginTop:-475,
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
  //listTitle:-
  listTitle: {
    display: 'flex',
    flexDirection: 'row',
    width: 325,
    height: 55,
    flexShrink: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitletext: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 55,
  },
  //list:-
  list: {
    flex: 1,
    minHeight: height * 0.7,
    // height: 'auto',
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 0.5375 * 16,
    flexShrink: 0,
  },
  singleList: {
    width: '100%',
    display: 'flex',
    height: 4.5625 * 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    flexShrink: 0,

    borderWidth: 0.2,
    borderColor: '#F0F2FC',

    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 100,
    shadowRadius: 4,
    elevation: 10,
  },
  DateTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0.3125 * 16,
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  DateText: {
    color: '#F0F2FC',
    alignItems: 'center',
    textAlign: 'center',
  },
  TimeText: {
    color: '#F0F2FC',
    alignItems: 'center',
    textAlign: 'center',
  },
  listText: {
    color: '#F0F2FC',
    textAlign: 'center',
    paddingHorizontal: 10,
    // fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
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
  editDeletContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 25,
  },
  box: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    gap: 2,
  },
  boxSubmit: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  },


  modalContainer: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    backgroundColor: colors.primary,
  },
});
