import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DEFAULT_SHIMMER_COLORS = ['#E8E8E8', '#F0F0F0', '#E8E8E8'];
const DEFAULT_LOCATIONS: [number, number, number] = [0.3, 0.5, 0.7];

type Props = {
  width: number;
  height: number;
  visible?: boolean;
  children?: React.ReactNode;
  shimmerColors?: string[];
  duration?: number;
  delay?: number;
  location?: number[];
  shimmerWidthPercent?: number;
  stopAutoRun?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  shimmerStyle?: ViewStyle;
};

export default function SkeletonLoader({
  width,
  height,
  visible,
  children,
  shimmerColors = DEFAULT_SHIMMER_COLORS,
  duration = 1000,
  delay = 0,
  location = DEFAULT_LOCATIONS,
  shimmerWidthPercent = 1,
  stopAutoRun = false,
  style,
  contentStyle,
  shimmerStyle,
}: Props) {
  const position = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    position.setValue(-1);

    if (visible || stopAutoRun) {
      return;
    }

    const anim = Animated.loop(
      Animated.timing(position, {
        toValue: 1,
        delay,
        duration,
        useNativeDriver: true,
      }),
    );
    anim.start();

    return () => anim.stop();
  }, [visible, stopAutoRun, duration, delay, position]);

  const translateX = position.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={[
        !visible && { height, width },
        styles.container,
        !visible && shimmerStyle,
        style,
      ]}>
      {children && (
        <View
          style={[
            !visible && styles.hiddenChildren,
            visible && contentStyle,
          ]}>
          {children}
        </View>
      )}

      {!visible && (
        <View style={[styles.shimmerBase, { backgroundColor: shimmerColors[0] }]}>
          <Animated.View style={[styles.animatedView, { transform: [{ translateX }] }]}>
            <LinearGradient
              colors={shimmerColors}
              style={[styles.gradient, { width: width * shimmerWidthPercent }]}
              start={{ x: -1, y: 0.5 }}
              end={{ x: 2, y: 0.5 }}
              locations={location}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmerBase: {
    flex: 1,
  },
  animatedView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  hiddenChildren: {
    width: 0,
    height: 0,
    opacity: 0,
  },
});
