import React, { useState, useRef } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import Colors from "../constants/Colours";
import slides from "../Data/slides";
import OnboardingItem from "./OnboardingItem";


export default function Onboarding1Screen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/onboardlogo.png")}
        style={styles.onboardlogo}
      />
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    borderColor: "#000000",
  },

  onboardlogo: {
    marginTop: 90,
    marginBottom: 0,
  },

  onboardingimg: {
    width: 190,
    height: 220,
    marginBottom: 40,
  },

  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: Colors.blue,
    width: "100%",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    backgroundColor: Colors.white,
    marginTop: 25,
    borderColor: Colors.blue,
    borderWidth: 2,
  },

  buttonOutlineText: {
    color: Colors.blue,
    fontWeight: "700",
    fontSize: 16,
  },

  buttonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
});