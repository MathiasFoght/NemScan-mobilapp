import { StyleProp, ViewStyle } from 'react-native';

export interface BottomButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  submitting?: boolean;
  style?: StyleProp<ViewStyle>;
}
