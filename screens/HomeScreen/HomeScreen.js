import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Scan")}
        >
          <Text style={styles.buttonTitle}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Tools")}
        >
          <Text style={styles.buttonTitle}>Tools</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleSignOut()}>
          <Text style={styles.buttonTitle}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
