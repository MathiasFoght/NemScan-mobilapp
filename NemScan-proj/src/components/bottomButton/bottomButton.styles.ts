import { StyleSheet } from 'react-native';
import {colors} from "@/src/shared/global/colors";

export const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  sendButton: {
    width: '100%',
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
});
