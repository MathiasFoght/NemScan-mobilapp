import { View, Image, Text } from 'react-native';
import styles from './avatar.styles'
import {AvatarProps} from "@/src/ui/avatar/interfaces";
import '@/i18n/i18n.config';
import i18n from "i18next";
import {useTranslation} from "react-i18next";

export const Avatar = ({ name, imageUrl }: AvatarProps) => {
    const { t } = useTranslation();

    const getInitials = (fullName: string) => {
        if (!fullName) return '?';
        const names = fullName.trim().split(' ');
        return names.length >= 2
            ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
            : fullName[0].toUpperCase();
    };

    return imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
    ) : (
        <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>{getInitials(name) || t('employeeProfile.fallbacks.name')}</Text>
        </View>
    );
};
