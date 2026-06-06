import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BodyText, BoldText, CaptionText } from '../../../component/AppText';
import Avatar from '../../../component/Avatar';
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
      <Avatar initials={item.name[0]} size={44} />
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
    gap: 12,
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
