import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoreTimer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>1200</Text>
            </View>
            <Text style={styles.timerText}>4:12</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    scoreContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: '#C30000',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginBottom: 5,
    },
    scoreText: {
        color: '#C30000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    timerText: {
        color: '#C30000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ScoreTimer;
