import React from 'react';
import { StyleSheet, View, Text, Pressable, ImageBackground } from 'react-native';
import colors from '../../assets/colors';

const Page = ({ navigation }) => {
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
                <Pressable style={styles.Nextbutton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.text}>Next</Text>
                </Pressable>
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
    Nextbutton: {
        paddingVertical: 1.0625 * 16,
        paddingHorizontal: 7.1875 * 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0.625 * 16,
        borderRadius: 1 * 16,
        shadowColor: 'rgba(0, 0, 0, 100)',
        backgroundColor:colors.background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 5,
        shadowRadius: 4,
        elevation: 12,
    },
    text: {
        color: colors.primary,
        textAlign: 'center',
        // fontFamily: 'Poppins',
        fontSize: 1.5 * 16,
        fontWeight: '700',
    },
});
