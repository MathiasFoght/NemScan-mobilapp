import React from 'react';
import { View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '@/src/ui/button/button';
import { colors } from '@/src/shared/global/colors';
import styles from './searchBar.styles';
import { SearchBarProps } from './interfaces';

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder = "Search...",
    onClear,
}) => {
    return (
        <View style={styles.searchContainer}>
            <MaterialIcons 
                name="search" 
                size={24} 
                color={colors.inactive} 
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.searchInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={colors.inactive}
            />
            {value.length > 0 && (
                <Button
                    onPress={onClear}
                    icon={<MaterialIcons name="close" size={20} color={colors.inactive} />}
                    variant="simple"
                    style={styles.clearButton}
                />
            )}
        </View>
    );
};