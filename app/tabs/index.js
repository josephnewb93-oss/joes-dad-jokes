// app/(tabs)/index.js
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import laughingAnimal from '../../assets/laughing-animal.png';
import { FavoritesContext } from './FavoritesContext';

export default function DadJokesScreen() {
  const [joke, setJoke] = useState('');
  const { addFavorite } = useContext(FavoritesContext);

  const getJoke = async () => {
    try {
      const res = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();
      setJoke(data.joke);
      speakJoke(data.joke);
    } catch {
      setJoke("Oops! Couldn't fetch a joke 😅");
    }
  };

  const speakJoke = (text) => {
    if (Platform.OS === 'web' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 0.7;
      window.speechSynthesis.speak(utterance);
    } else {
      const Speech = require('expo-speech');
      Speech.speak(text, { rate: 0.85, pitch: 0.7 });
    }
  };

  const saveFavorite = () => {
    if (joke) {
      addFavorite(joke);
      Alert.alert('Saved!', 'Joke added to favorites ❤️');
    }
  };

  const repeatJoke = () => speakJoke(joke);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Joe&apos;s Dad Jokes</Text>
        <Image source={laughingAnimal} style={styles.laughImage} />
        <Text style={styles.jokeText}>{joke || "Press the button for a joke!"}</Text>

        <TouchableOpacity style={styles.bigButton} onPress={getJoke}>
          <Text style={styles.bigButtonText}>Get a Dad Joke</Text>
        </TouchableOpacity>

        {joke && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.smallButton} onPress={repeatJoke}>
              <Text style={styles.smallButtonText}>🔁 Repeat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButtonSave} onPress={saveFavorite}>
              <Text style={styles.smallButtonText}>❤️ Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    maxWidth: 600,
    width: '100%',
  },
  mainTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  laughImage: { width: 150, height: 150, marginBottom: 20 },
  jokeText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  bigButton: { backgroundColor: '#e91e63', padding: 20, borderRadius: 50, marginBottom: 10 },
  bigButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  actions: { flexDirection: 'row', marginTop: 10 },
  smallButton: { backgroundColor: '#333', padding: 10, borderRadius: 20, marginHorizontal: 5 },
  smallButtonSave: { backgroundColor: '#e91e63', padding: 10, borderRadius: 20, marginHorizontal: 5 },
  smallButtonText: { color: '#fff', fontSize: 16 },
});
