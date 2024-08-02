import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const QuestionArea = () => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.questionText}>AYRINTILI BİR BİÇİMDE GÖRÜŞMEDEN, OLACAKLARI DİKKATE ALMADAN</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: '#C30000',
        borderWidth: 2,
        borderRadius: 5,
        width: width * 0.9,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    innerContainer: {
        backgroundColor: '#C30000',
        borderRadius: 5,
        width: '100%',
        padding: 10,
        alignItems: 'flex-start',
    },
    questionText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default QuestionArea;
    