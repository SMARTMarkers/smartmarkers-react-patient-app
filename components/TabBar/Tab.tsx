import * as React from "react";
import {
  Animated,
  TouchableOpacity,
  GestureResponderEvent
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface TabProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  focusAnim: any;
  icon: string;
}

const Tab: React.FC<TabProps> = ({ ...props }) => {
  const { onPress, title, focusAnim, icon } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", "tomato"]
          })
        }}
      >
        {icon && <Ionicons name={icon} size={32} />}
        <Animated.Text
          style={{
            color: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["#444", "#fff"]
            })
          }}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Tab;
