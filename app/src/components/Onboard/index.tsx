import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type OnboardingProps = {
  screenIndex: number;
  onContinue: () => void;
};

export default function OnboardFooter({
  screenIndex,
  onContinue,
}: OnboardingProps) {
  return (
    <React.Fragment>
      {/* header steps indicator */}
      <View className={`mt-1`} style={styles.stepIndicatorContainer}>
        {[1, 2, 3].map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              {
                backgroundColor: index === screenIndex ? '#CEF202' : 'grey',
              },
            ]}
          />
        ))}
      </View>
      {/*  */}
      <View style={styles.wrapper}>
        {/* footer */}
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.footer}
        >
          <View style={styles.buttonsRow}>
            <Text
              onPress={() => router.replace('/(Home)')}
              style={styles.buttonText}
            >
              Skip
            </Text>

            <Pressable onPress={onContinue} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
          {/*  */}
        </Animated.View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 50,
    alignItems: 'center',
    borderColor: '#FDFDFD',
    borderWidth: 3,
    flex: 1,
  },
  buttonText: {
    color: '#FDFDFD',
    fontSize: 17,
    padding: 15,
    paddingHorizontal: 25,
  },

  // steps
  stepIndicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 15,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
});
