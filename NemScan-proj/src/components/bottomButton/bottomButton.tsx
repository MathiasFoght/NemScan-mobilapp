import React from 'react';
import { View } from 'react-native';
import Button from '@/src/ui/button/button';
import { styles } from './bottomButton.styles';
import { BottomButtonProps } from './interfaces';


const BottomButton: React.FC<BottomButtonProps> = ({
  onPress,
  title,
  disabled,
  submitting,
  style,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={onPress}
        title={submitting ? 'Sending...' : title}
        variant="primary"
        disabled={disabled || submitting}
        style={[
          styles.sendButton,
          (disabled || submitting) && styles.sendButtonDisabled,
          style,
        ]}
      />
    </View>
  );
};

export default BottomButton;
