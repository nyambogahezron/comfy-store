import React from 'react';
import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { onboardingSteps } from '.';
const {height, width} = Dimensions.get('window');


const onboardingData: React.JSX.Element[] = [
  <View key={1} style={styles.pageContent} >
    <ImageBackground
      source={{ uri: '' }}
      resizeMode='cover'
      style={styles.bgImage}
    >
      {/* header steps indicator */}
      <View className={`mt-1`} style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
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
        <View style={styles.footer}>
          <View style={styles.buttonsRow}>
            <Text onPress={endOnboarding} style={styles.buttonText}>
              Skip
            </Text>

            <Pressable onPress={onContinue} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
          {/*  */}
        </View>
      </View>
    </ImageBackground>
  </View>,
  <View key={2}>
    <Text>Item 2</Text>
  </View>,
  <View key={3}>
    <Text>Item 3</Text>
  </View>,
];

export default onboardingData;



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
    backgroundColor: '#302E38',
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#FDFDFD',
    fontSize: 16,
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