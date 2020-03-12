import React from "react";
import { StyleSheet, Text, View, Button, Animated } from "react-native";
import TabBar from "../components/TabBar/TabBar";

export interface BottomTabNavigatorProps {
  currentPath: string;
  navigateTo: (path: string) => void;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  ...props
}) => {
  const { currentPath, navigateTo } = props;
  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "md-square"
    },
    {
      name: "My Surveys",
      path: "/my-surveys",
      icon: "md-square-outline"
    }
  ];
  const position = routes.findIndex(({ path }) => path === currentPath);
  return (
    <View style={styles.container}>
      <TabBar
        navigationState={{
          routes
        }}
        position={new Animated.Value(position > -1 ? position : 0)}
        navigateTo={navigateTo}
      ></TabBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: "lightgrey",
    borderTopWidth: 2,
    padding: 4
  }
});

export default BottomTabNavigator;
