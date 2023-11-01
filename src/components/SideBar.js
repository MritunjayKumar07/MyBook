import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../../assets/colors';

export default function SideBar({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.boxContent}>
          {/* TopBar:- */}
          <View style={styles.topBar}>
            <Text onPress={() => navigation.navigate('Home')} style={styles.topBarLogoText}>Manage Business</Text>
            <View style={styles.topBarIconsSection}>
              {/* <Ionicons name='search' size={29} color={colors.text} style={styles.icon} /> */}
              <AntDesign name='cloudupload' size={32} color={colors.text} style={styles.icon} onPress={() => Alert.alert('Comming Soon', 'Working it.')} />
              <Ionicons name='menu' size={42} color={colors.text} style={styles.icon} onPress={() => navigation.navigate('SideBar')} />
            </View>
          </View>
          <View style={{ flexDirection: 'column', gap: 5,textAlign:'center' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Note:</Text>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Introducing My Book Accounting App! </Text>
            <Text style={{ color: '#fff' }}>This app, designed by Mritunjay Kumar, is here to make your life easier! It's a special tool created to help everyone manage their daily accounting effortlessly.</Text>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Why Use This App?</Text>
            <View style={{ flexDirection: 'row', }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Simplicity: </Text>
              <Text style={{ color: '#fff' }}>This app is super easy to use. No complicated features!</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Daily Accounting: </Text>
              <Text style={{ color: '#fff' }}>Keep track of your daily expenses and earnings with ease.</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Relax & Manage: </Text>
              <Text style={{ color: '#fff' }}>Relax and let the app handle your accounting worries.</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>For Everyone: </Text>
              <Text style={{ color: '#fff' }}>Designed for the public, so anyone can use it!</Text>
            </View>
            <Text style={{ color: '#fff' }}>With My Book app, accounting has never been this relaxing. Enjoy stress-free financial management every day!</Text>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>MADE BY :- MRITUNJAY KUMAR</Text>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>CONTACT ME :- mrituj359@gmail.com</Text>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingVertical: 16,
    paddingHorizontal:8,
    height: '100%',
    backgroundColor: colors.background,
  },
  boxContent: {
    gap: 0.3875 * 16,
    flexShrink: 0,
  },
  //TopBar:-
  topBar: {
    flexDirection: 'row',
    width: '100%',
    height: 68,
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
  icon: {},
});