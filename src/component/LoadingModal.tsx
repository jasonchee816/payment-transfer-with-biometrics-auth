import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { BoldText } from './AppText';

type Props = {
  visible: boolean;
  message: string;
};

export default function LoadingModal({ visible, message }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color="#007AFF" />
          <BoldText size={15} style={styles.message}>{message}</BoldText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 36,
    alignItems: 'center',
    gap: 14,
  },
  message: {
    color: '#3C3C43',
  },
});
