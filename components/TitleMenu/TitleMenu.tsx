import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface TitleMenuProps {
  navigateTo: (path: string) => void;
  title: string;
}

const TitleMenu: React.FC<TitleMenuProps> = ({ ...props }) => {
  const { navigateTo, title } = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.userIcon}>
        <TouchableOpacity
          onPress={() => {
            navigateTo("/settings");
          }}
        >
          <Ionicons name="md-person" size={48} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 8
  },
  title: {
    fontSize: 25
  },
  userIcon: {
    width: 64
  }
});

export default TitleMenu;
