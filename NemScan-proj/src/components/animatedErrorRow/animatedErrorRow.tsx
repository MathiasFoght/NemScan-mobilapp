import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import {colors} from "@/src/shared/global/colors";
import {AnimatedErrorRowProps} from "@/src/components/animatedErrorRow/interfaces";
import styles from "./animatedErrorRow.styles";

export const AnimatedErrorRow: React.FC<AnimatedErrorRowProps> = ({ error, percent, delay }) => {
    const animatedWidth = useRef(new Animated.Value(0)).current;
    const animatedPercent = useRef(new Animated.Value(0)).current;
    const [displayPercent, setDisplayPercent] = useState(0);

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: percent,
            duration: 2000,
            delay,
            easing: Easing.out(Easing.exp),
            useNativeDriver: false,
        }).start();

        Animated.timing(animatedPercent, {
            toValue: percent,
            duration: 2000,
            delay,
            easing: Easing.out(Easing.exp),
            useNativeDriver: false,
        }).start();

        const id = animatedPercent.addListener(({ value }) => setDisplayPercent(Math.round(value)));
        return () => animatedPercent.removeListener(id);
    }, [percent, delay, animatedWidth, animatedPercent]);

    const barColor = colors.primary
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{error.label}</Text>
            <View style={styles.barWrapper}>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            width: animatedWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
                            backgroundColor: barColor,
                        },
                    ]}
                />
            </View>
            <Text style={[styles.percent, { color: barColor }]}>{displayPercent}%</Text>
        </View>
    );
};
