import { Fragment, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { BoldText, BodyText, CaptionText, LabelText } from '../../../component/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebugStore } from '../hooks/DebugStore';

type ErrorScenario = {
  key: keyof Debug.DebugFlags;
  label: string;
  description: string;
};

const ERROR_SCENARIOS: ErrorScenario[] = [
  {
    key: 'simulateTransferFailure',
    label: 'Transfer Failure',
    description: 'Rejects submitTransfer with an error',
  },
];

export default function FloatingDebugButton() {
  const { flags, setFlag } = useDebugStore();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  const hasActiveFlag = Object.values(flags).some(Boolean);

  if (!__DEV__) {
    return null;
  }

  return (
    <View style={[styles.container, { bottom: insets.bottom + 24 }]}>
      {open && (
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <LabelText size={13} style={styles.panelTitle}>Error Simulations</LabelText>
          </View>
          {ERROR_SCENARIOS.map((scenario, index) => (
            <Fragment key={scenario.key}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.row}>
                <View style={styles.rowLabels}>
                  <BodyText weight="500" color="#FFFFFF">{scenario.label}</BodyText>
                  <CaptionText size={12}>{scenario.description}</CaptionText>
                </View>
                <Switch
                  value={flags[scenario.key]}
                  onValueChange={value => setFlag(scenario.key, value)}
                  trackColor={{ false: '#E5E5EA', true: '#FF3B3066' }}
                  thumbColor={flags[scenario.key] ? '#FF3B30' : '#FFFFFF'}
                />
              </View>
            </Fragment>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={[styles.fab, hasActiveFlag && styles.fabActive]}
        onPress={() => setOpen(prev => !prev)}
        activeOpacity={0.8}>
        <BoldText size={11} weight="700" color="#FFFFFF" style={styles.fabIcon}>{open ? 'X' : 'Debug'}</BoldText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    alignItems: 'flex-end',
    zIndex: 999,
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabActive: {
    backgroundColor: '#FF3B30',
  },
  fabIcon: {
    letterSpacing: 0.5,
  },
  panel: {
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    marginBottom: 10,
    width: 280,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  panelHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#3A3A3C',
  },
  panelTitle: {
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  rowLabels: {
    flex: 1,
    gap: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#3A3A3C',
    marginHorizontal: 16,
  },
});
