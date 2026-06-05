import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BodyText, BoldText, CaptionText } from '../../../component/AppText';
import type { StyleProp, ViewStyle } from 'react-native';

type Props = {
  item: TransactionHistory.Transaction;
  onPress: (item: TransactionHistory.Transaction) => void;
  style?: StyleProp<ViewStyle>;
};

export default function TransactionItem({ item, onPress, style }: Props) {
  const isSent = item.type === 'sent';
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={() => onPress(item)}>
      <View style={styles.avatar}>
        <BoldText size={18} color="#3C3C43">{item.name[0]}</BoldText>
      </View>
      <View style={styles.details}>
        <BodyText size={16} weight="500" style={styles.name}>{item.name}</BodyText>
        <CaptionText>{item.date}</CaptionText>
      </View>
      <View style={styles.right}>
        <BoldText size={16} color={isSent ? '#FF3B30' : '#34C759'}>
          {isSent ? '-' : '+'}{item.amount}
        </BoldText>
        <BodyText size={18} color="#C7C7CC" style={styles.chevron}>›</BodyText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    marginBottom: 2,
  },
  right: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 4,
  },
  chevron: {
    alignSelf: 'center',
  },
});
