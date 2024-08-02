import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Image, Keyboard, Animated } from 'react-native';
import { Images, argonTheme } from "../constants"; // Ensure this import is correct and Images.RegisterBackground exists
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
const { width, height } = Dimensions.get("screen");

const GameScreen = () => {
  const [game, setGame] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [player1Time, setPlayer1Time] = useState(29);
  const [player2Time, setPlayer2Time] = useState(26);
  const [player1FontSize, setPlayer1FontSize] = useState(14);
  const [player2FontSize, setPlayer2FontSize] = useState(14);
  const [sceneborderBackgroundColor, setSceneborderBackgroundColor] = useState('rgba(187, 82, 170, 0.8)'); // Default to white
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const imageHeight = new Animated.Value(height * 0.4);
  const [answers, setAnswers] = useState([]);
  const [images, setImages] = useState([]);
  const player1Name = 'Ufuk '; // Example name
  const player2Name = 'Ufuk'; // Example name
  const [currentPlayer, setCurrentPlayer] = useState(1); 

  const startGame = async () => {
    try {
      const response = await fetch('https://192.168.1.101:44305/Game/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player1Id: 1, // Example player1 ID
          player2Id: 2  // Example player2 ID
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setGame(data);
      setPlayer1Time(data.player1TimeLeft);
      setPlayer2Time(data.player2TimeLeft);
      setAnswers(data.answers);
      setImages(data.images);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  useEffect(() => {
    startGame();
    handleName(player1Name, setPlayer1FontSize);
    handleName(player2Name, setPlayer2FontSize);

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        Animated.timing(imageHeight, {
          toValue: height * 0.2,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.timing(imageHeight, {
          toValue: height * 0.4,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      if (currentPlayer === 1) {
        setPlayer1Time(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTimeOver();
            return 0;
          }
          return prevTime - 1;
        });
      } else {
        setPlayer2Time(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTimeOver();
            return 0;
          }
          return prevTime - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer]);

  const handleTimeOver = () => {
   // endGame();
  };

  const endGame = async () => {
    try {
      await axios.post(`https://10.0.2.2:7194/Game/end/${game.id}`);
    } catch (error) {
      console.error("Error ending game:", error);
    }
  };

  const handleName = (name, setFontSize) => {
    if (name.length > 10) {
      setFontSize(10); // Decrease the font size if the name length is greater than 5
    }
    else if (name.length > 7) {
      setFontSize(12); // Decrease the font size if the name length is greater than 5
    } else {
      setFontSize(14); // Default font size
    }
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === answers[currentQuestionIndex].toLowerCase()) {
      setSceneborderBackgroundColor('rgba(64, 224, 208, 0.5)');
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Switch player
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
      if (currentQuestionIndex >= answers.length - 1) {
        handleTimeOver(); // If no more questions, end the game
      }
    } else {
      setSceneborderBackgroundColor('rgba(255, 0, 0, 1)');
    }
    setGuess(''); // Clear the input after submission
  };

  if (!game) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Animated.View style={[styles.imageContainer, { height: imageHeight }]}>
              <View style={[styles.imageBox, { borderColor: sceneborderBackgroundColor }]}>
                <Image source={Images.ceketJpg} style={styles.image} />
              </View>
            </Animated.View>
            <View style={styles.header}>
              <View style={styles.player}>
                <View style={styles.playerLabelLeft}>
                  <Text style={[styles.playerName, { fontSize: player1FontSize }]}>{player1Name}</Text>
                </View>
                <View style={styles.timeLabelLeft}>
                  <Text style={styles.playerTimeLeft}>{player1Time}</Text>
                </View>
              </View>
              <View style={styles.labelsContainer}>
                <View style={styles.categoryLabel}>
                  <Text style={styles.category}>Giysi-Aksesuar</Text>
                </View>
                <View style={styles.answerLabel}>
                  <TextInput
                    style={styles.answer}
                    placeholder="Tahmini girin"
                    value={guess}
                    onChangeText={setGuess}
                    onSubmitEditing={handleGuess}
                    returnKeyType="done" // ensures the keyboard shows a done button
                  />
                </View>
              </View>
              <View style={styles.player}>
                <View style={styles.playerLabelRight}>
                  <Text style={[styles.playerName, { fontSize: player2FontSize }]}>{player2Name}</Text>
                </View>
                <View style={styles.timeLabelRight}>
                  <Text style={styles.playerTimeRight}>{player2Time}</Text>
                </View>
              </View>
            </View>
            {message ? <Text style={styles.message}>{message}</Text> : null}
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '105%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginBottom: 10,
  },
  player: {
    alignItems: 'center',
    flex: 1,
  },
  playerLabelLeft: {
    backgroundColor:'#E5E5FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 2,
    marginBottom:6,
    borderBottomLeftRadius: 50,
    zIndex: 999,
    alignSelf: 'flex-start',
    width: height * 0.12,
    height: height * 0.04,
    justifyContent: 'center',
  },
  playerLabelRight: {
    backgroundColor:'#E5E5FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 2,
    marginBottom: 6,
    left: height * 0.01,
    borderBottomRightRadius: 50,
    zIndex: 999,
    alignSelf: 'flex-end',
    width: height * 0.13,
    height: height * 0.04,
    justifyContent: 'center',
  },
  timeLabelLeft: {
    backgroundColor: '#E5E5FF',
    paddingVertical: 5, // Adjusted for smaller size
    paddingHorizontal: 10, // Adjusted for smaller size
    marginVertical: 2,
    borderBottomLeftRadius: 50,
    zIndex: 1,
    marginTop: -5,
    left: height * 0.043,
    alignSelf: 'flex-start',
  },
  timeLabelRight: {
    backgroundColor: '#E5E5FF',
    paddingVertical: 5, // Adjusted for smaller size
    paddingHorizontal: 10, // Adjusted for smaller size
    marginVertical: 2,
    borderBottomRightRadius: 50,
    zIndex: 1,
    marginTop: -5,
    right: height * 0.043,
    alignSelf: 'flex-end',
  },
  categoryLabel: {
    backgroundColor: '#7D84CF',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 2,
    marginBottom: 5, // Adjusted for spacing between labels
    width: height * 0.195,
    height : height * 0.05,
    alignItems: 'center',
    transform: [{ skewX: '-20deg' }],
    zIndex: 3, // Ensures the category label is on top
  },
  answerLabel: {
    backgroundColor: '#7D84CF',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 2,
    width: height * 0.275,
    height : height * 0.03,
    marginTop : -4,
    alignItems: 'center',
    transform: [{ skewX: '-20deg' }],
    zIndex: -1, // Ensures the category label is on top
  },
  labelsContainer: {
    alignItems: 'center', // Labels' container to center both labels
  },
  playerName: {
    color: '#741b47',
    textAlign: 'center',
    fontWeight: 'bold',
    flexShrink: 1,
    marginTop: -2
  },
  playerTimeLeft: {
    color: '#741b47',
    fontWeight: 'bold',
    fontSize: 12,
  },
  playerTimeRight: {
    color: '#741b47',
    fontWeight: 'bold',
    fontSize: 12,
  },
  category: {
    color: '#fff',
    textAlign: 'center',
    textAlign:'justify',
    fontSize: 20,
    fontWeight: 'bold',
  },
  answer: {
    color: '#fff',
    textAlign: 'center',
    textAlign:'justify',
    fontSize: 14,
  },
  imageContainer: {
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 10,
  },
  imageBox: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 6, // Set the border width
    borderColor: 'rgba(187, 82, 170, 0.8)'
  },
  image: {
    width: '100%',  // Make the image take the full width of the container
    height: '100%', // Make the image take the full height of the container
    resizeMode: 'contain', // Ensure the image scales properly to fit within the container
    borderRadius: 10,
  },
  imageText: {
    fontSize: 24,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'rgba(64, 224, 208, 0.8)',
    borderWidth: 3,
    paddingHorizontal: 8,
    width: '80%',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  message: {
    fontSize: 18,
    color: '#f0f',
    marginTop: 20,
  },
});

export default GameScreen;
