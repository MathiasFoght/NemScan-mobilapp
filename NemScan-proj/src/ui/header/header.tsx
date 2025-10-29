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
    const { t } = useTranslation(["screens"]);

    const employeePosition = t(`screens:dashboard.header.positions.${position}`);

    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Avatar name={name} imageUrl={profileImageUrl} />

                <View style={styles.infoSection}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.position}>
                        {employeePosition}
                    </Text>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detail}>{t('screens:dashboard.header.details.employeeNumber')} {employeeNumber}</Text>
                        <Text style={styles.separator}>•</Text>
                        <Text style={styles.detail}>{t('screens:dashboard.header.details.storeNumber')} {storeNumber}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
