import { View, Text } from 'react-native';
import '@/i18n/i18n.config';
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import { Avatar } from '@/src/ui/avatar/avatar';
import styles from './header.styles'
import {HeaderProps} from "@/src/ui/header/interfaces";

export const Header = ({
   name,
   position,
   employeeNumber,
   storeNumber,
   profileImageUrl,
}: HeaderProps) => {
    const { t } = useTranslation();

    const employeePosition = t(`employeeProfile.positions.${position}`);

    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Avatar name={name} imageUrl={profileImageUrl} />

                <View style={styles.infoSection}>
                    <Text style={styles.name}>{name || t('employeeProfile.fallbacks.name')}</Text>
                    <Text style={styles.position}>
                        {employeePosition || t('employeeProfile.fallbacks.position')}
                    </Text>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detail}>{t('employeeProfile.details.employeeNumber')} {employeeNumber || t('employeeProfile.fallbacks.employeeNumber')}</Text>
                        <Text style={styles.separator}>•</Text>
                        <Text style={styles.detail}>{t('employeeProfile.details.storeNumber')} {storeNumber || t('employeeProfile.fallbacks.storeNumber')}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
