import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text } from 'react-native';
import {CountUpProps} from "@/src/components/countUp/interfaces";

export const CountUp: React.FC<CountUpProps> = ({
    value,
    duration = 1500,
    delay = 0,
    decimals = 0,
    suffix = '',
    style,
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration,
            delay,
            easing: Easing.out(Easing.exp),
            useNativeDriver: false, // Text uses layout
        }).start();

        const id = animatedValue.addListener(({ value }) => {
            setDisplayValue(`${value.toFixed(decimals)}${suffix}`);
        });

        return () => {
            animatedValue.removeListener(id);
        };
    }, [value, duration, delay, decimals, suffix, animatedValue]);

    return <Text style={style}>{displayValue}</Text>;
};

export default CountUp;
