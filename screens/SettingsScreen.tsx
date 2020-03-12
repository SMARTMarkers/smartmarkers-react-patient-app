import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default SettingsScreen;
