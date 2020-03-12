import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { TitleMenu } from "../components";
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <TitleMenu title="Hello, Paul" navigateTo={(path: string) => {}} />
      </View>
      <View style={styles.message}>
        <Text>You have a 3 surveys they will expire today</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text>SCI-FI V1.2 Fine</Text>
            <Text>EXPIRE TODAY</Text>
          </View>
          <View style={styles.goTo}>
            <TouchableOpacity
              onPress={() => {
                (path: string) => {};
              }}
            >
              <Ionicons name="md-arrow-round-forward" size={48} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  topMenu: {
    height: 64,
    padding: 4
  },
  content: {
    flex: 1,
    padding: 4
  },
  message: {
    padding: 4,
    height: 64,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2
  },
  item: {
    flex: 1,
    flexDirection: "row",
    padding: 4,
    height: 64,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2
  },
  itemDetails: {
    flex: 1
  },
  goTo: {
    width: 64
  }
});

export default DashboardScreen;
