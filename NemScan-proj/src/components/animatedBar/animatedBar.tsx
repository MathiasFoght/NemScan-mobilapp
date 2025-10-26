import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import {CountUp} from "@/src/components/countUp/countUp";
import {AnimatedBarProps} from "@/src/components/animatedBar/interfaces";
import styles from './animatedBar.styles';

const AnimatedBar: React.FC<AnimatedBarProps> = ({
   percentage,
   color,
   height = 12,
   duration = 1200,
   containerStyle,
   labelStyle,
}) => {
    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: percentage,
            duration,
            useNativeDriver: false,
        }).start();
    }, [animatedWidth, duration, percentage]);

    const widthInterpolation = animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <CountUp
                value={percentage}
                suffix="%"
                decimals={1}
                duration={1200}
                style={[styles.label, labelStyle]}
            />


            <View style={[styles.barBackground, { height }]}>
                <Animated.View
                    style={[
                        styles.barFill,
                        { backgroundColor: color, width: widthInterpolation, height },
                    ]}
                />
            </View>
        </View>
    );
};

export default AnimatedBar;
