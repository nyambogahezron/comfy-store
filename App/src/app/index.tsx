import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardFooter from '@/components/Onboard';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [screenIndex, setScreenIndex] = useState(0);

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingData.length - 1;
    if (isLastScreen) {
      router.push('/(Home)');
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  const onboardingData: React.JSX.Element[] = [
    <View key={1} style={styles.pageContent}>
      <ImageBackground
        source={require('../../assets/images/onboard/bg1.png')}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <OnboardFooter
          screenIndex={screenIndex}
          onContinue={() => onContinue()}
        />
      </ImageBackground>
    </View>,
    <View key={2} style={styles.pageContent}>
      <ImageBackground
        source={require('../../assets/images/onboard/bg2.png')}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <OnboardFooter
          screenIndex={screenIndex}
          onContinue={() => onContinue()}
        />
      </ImageBackground>
    </View>,
    <View key={3} style={styles.pageContent}>
      <ImageBackground
        source={require('../../assets/images/onboard/bg3.png')}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <OnboardFooter
          screenIndex={screenIndex}
          onContinue={() => onContinue()}
        />
      </ImageBackground>
    </View>,
  ];

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style='light' />
      <GestureDetector gesture={swipes}>
        {onboardingData[screenIndex]} 
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    justifyContent: 'center',
    flex: 1,
    height: height,
    width: width,
  },
  pageContent: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});
