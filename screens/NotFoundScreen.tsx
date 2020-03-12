import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NotFoundScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Text>Page Not Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default NotFoundScreen;
