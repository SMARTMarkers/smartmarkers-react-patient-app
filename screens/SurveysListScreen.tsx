import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SurveysListScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Text>SurveysListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default SurveysListScreen;
