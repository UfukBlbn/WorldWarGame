import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const CustomGameScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Ufuk</Text>
        </View>
        <View style={styles.middleButton}>
          <Text style={styles.middleButtonText}>Hayvan sesleri</Text>
        </View>
        <View style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Ufuk</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.sideButton}>
          <Text style={styles.sideButtonText}>4</Text>
        </View>
        <View style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Cevaplar</Text>
        </View>
        <View style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Ufuk</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    borderRadius: 15,
    width: (width - 60) / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  middleButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    borderRadius: 15,
    width: (width - 60) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    borderRadius: 15,
    width: (width - 60) / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomGameScreen;
