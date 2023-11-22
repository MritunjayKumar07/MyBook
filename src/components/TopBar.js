import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../assets/colors';

export default function TopBar() {
    const [showSideBar, setShowSideBar] = useState(false)
    const navigation = useNavigation();

    const handleMenuPress = () => {
        navigation.navigate('SideBar');
        setShowSideBar(!showSideBar)
    };

    const handleGoBack = () => {
        navigation.goBack();
        // navigation.navigate('Home');
        setShowSideBar(!showSideBar)
    };

    return (
        <View style={styles.topBar}>
            <Text style={styles.topBarLogoText}>My Book</Text>
            {showSideBar ?
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={36} color={colors.text} style={styles.icon} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={handleMenuPress}>
                    <Ionicons name="menu" size={36} color={colors.text} style={styles.icon} />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.text,
        borderBottomStyle: 'solid',
        shadowColor: 'rgba(0, 0, 0, 100)',
        backgroundColor: colors.background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 5,
        shadowRadius: 4,
        elevation: 12,
        paddingTop: 32,
    },
    topBarLogoText: {
        color: colors.primary,
        textAlign: 'left',
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: '600',
    },
    topBarIconsSection: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 0.9375 * 16,
    },
    icon: {
    },
})