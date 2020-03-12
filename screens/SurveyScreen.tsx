import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SurveyScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Text>SurveyScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default SurveyScreen;
