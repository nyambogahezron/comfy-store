import { Animated, View, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function TopTabBar({
  state,
  descriptors,
  navigation,
  position,
}: {
  state: any;
  descriptors: any;
  navigation: any;
  position: any;
}) {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange: number[] = state.routes.map((_: any, i: number) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ opacity, color: colors.text }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
