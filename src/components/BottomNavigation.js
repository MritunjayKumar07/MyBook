import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import colors from '../../assets/colors';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavigation() {
    const navigation = useNavigation();

    return (
        <>
            <View style={[styles.bottomNavigation, {}]}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                    <Ionicons style={styles.bottomNavigationButton} name="home" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                    <Ionicons style={styles.bottomNavigationButton} name="search" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('SideBar')}>
                    <AntDesign style={styles.bottomNavigationButton} name="cloudupload" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('SideBar')}>
                    <FontAwesome style={styles.bottomNavigationButton} name="user" size={28} color="black" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    bottomNavigation: {
        display: 'flex',
        borderRadius: 12,
        flexDirection: 'row',
        backgroundColor: colors.text,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 2,
        zIndex: 999,
    },

    bottomNavigationButton: {
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 42,
    },

    bottomNavigationButtonActive: {
        backgroundColor: colors.primary,
    }
})