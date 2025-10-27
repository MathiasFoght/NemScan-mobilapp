import React from 'react';
import { Text } from 'react-native';
import { InfoTextProps } from './interfaces';
import { styles } from './infoText.styles';


const InfoText: React.FC<InfoTextProps> = ({ text }) => {
  return <Text style={styles.subText}>{text}</Text>;
};

export default InfoText;
