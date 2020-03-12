import React from "react";
import { StyleSheet, View } from "react-native";
import { withRouter, RouteComponentProps } from "../../react-router";
import BottomTabNavigator from "../../navigation/BottomTabNavigator";
import Constants from "expo-constants";

interface MainProps {
  children: React.ReactNode;
}

interface RouteParams {
  example: string;
}

const Main: React.FC<MainProps & RouteComponentProps<RouteParams>> = ({
  ...props
}) => {
  const { children, location, history } = props;
  const navigateTo = (path: string) => {
    history.push(path);
  };
  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <View style={styles.childrenContainer}>{children}</View>
      <View style={styles.bottomNavBar}>
        <BottomTabNavigator
          currentPath={location.pathname}
          navigateTo={navigateTo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  childrenContainer: {
    flex: 1
  },
  bottomNavBar: {
    height: 80
  }
});

export default withRouter<
  MainProps & RouteComponentProps<RouteParams>,
  React.FC<MainProps & RouteComponentProps<RouteParams>>
>(Main);
