import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [joke, setJoke] = useState("Press the button for a dad joke!");

  const getJoke = async () => {
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      setJoke("Oops! Couldn't fetch a joke 😅");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.joke}>{joke}</Text>
      <Button title="Get a Dad Joke" onPress={getJoke} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  joke: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
