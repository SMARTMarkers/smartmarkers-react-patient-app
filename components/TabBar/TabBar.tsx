import * as React from "react";
import { View, Animated, StyleSheet } from "react-native";
import Tab from "./Tab";

export interface NavitationStateRoue {
  name: string;
  path: string;
  icon: string;
}
export interface NavitationState {
  routes: NavitationStateRoue[];
}

export interface TabBarProps {
  navigationState: NavitationState;
  navigateTo: (path: string) => void;
  position: Animated.Value;
}

const TabBar: React.FC<TabBarProps> = ({ ...props }) => {
  const { navigationState, navigateTo, position } = props;
  return (
    <View style={styles.container}>
      {navigationState.routes.map((route, index) => {
        const focusAnim = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 1, 0]
        });
        return (
          <Tab
            key={index}
            focusAnim={focusAnim}
            title={route.name}
            icon={route.icon}
            onPress={() => navigateTo(route.path)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default TabBar;
