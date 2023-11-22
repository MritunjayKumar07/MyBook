import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import colors from '../../assets/colors';

const Page = () => {

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <ImageBackground
                    source={require('../../assets/Screen1Img.png')}
                    style={styles.imageBackground}
                />
                <View style={styles.textArea}>
                    <Text style={styles.MainOne}>
                        Welcome to my book
                    </Text>
                    <Text style={styles.MainSecond}>
                        DIGITALIZE YOUR BUSINESS
                    </Text>
                </View>
                
            </View>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5.125 * 16,
    },
    imageBackground: {
        width: 17.75 * 16,
        height: 21.5 * 16,
        resizeMode: 'cover', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    textArea: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1.4375 * 16,
    },
    MainOne: {
        color: colors.text,
        textAlign: 'center',
        // fontFamily: 'Poppins',
        fontSize: 1.25 * 16,
        fontWeight: '500',
    },
    MainSecond: {
        color: colors.text,
        textAlign: 'center',
        // fontFamily: 'Poppins',
        fontSize: 1.25 * 16,
        fontWeight: '600',
    },
});
