// app/(tabs)/favorites.js
import { useContext } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FavoritesContext } from './FavoritesContext';

export default function FavoritesScreen() {
  const { favorites, removeFavorite, clearFavorites } = useContext(FavoritesContext);

  const speakJoke = (joke) => {
    if (!joke) return;
    if (Platform.OS === 'web' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(joke);
      utterance.rate = 0.85;
      utterance.pitch = 0.7;
      window.speechSynthesis.speak(utterance);
    } else {
      const Speech = require('expo-speech');
      Speech.speak(joke, { rate: 0.85, pitch: 0.7 });
    }
  };

  const confirmClear = () => {
    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to remove all favorite jokes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => clearFavorites() },
      ]
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>❤️ Your Favorite Jokes ❤️</Text>

        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>No favorites yet!</Text>
        ) : (
          <>
            <FlatList
              data={favorites}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.jokeCard}>
                  <Text style={styles.jokeText}>{item}</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={() => speakJoke(item)}>
                      <Text style={styles.buttonText}>🔊 Speak</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.removeButton]}
                      onPress={() => removeFavorite(item)}
                    >
                      <Text style={styles.buttonText}>🗑 Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <TouchableOpacity style={styles.clearButton} onPress={confirmClear}>
              <Text style={styles.clearButtonText}>Clear All Favorites</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, minHeight: '100vh', justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  container: { maxWidth: 600, width: '100%', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  emptyText: { fontSize: 18, textAlign: 'center', color: '#aaa', marginTop: 20 },
  jokeCard: { marginBottom: 15, padding: 15, borderRadius: 10, backgroundColor: '#f0f0f0', width: '100%' },
  jokeText: { fontSize: 16, marginBottom: 10 },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap' },
  button: { backgroundColor: '#e91e63', padding: 10, borderRadius: 20, marginRight: 10, marginBottom: 5 },
  removeButton: { backgroundColor: '#333' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  clearButton: { marginTop: 20, backgroundColor: '#ff4500', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25 },
  clearButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
