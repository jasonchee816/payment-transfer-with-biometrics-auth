import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { BodyText, CaptionText } from './AppText';

export type LabelValueRow = {
  label: string;
  value: string;
  valueColor?: string;
};

type Props = {
  rows: LabelValueRow[];
  style?: StyleProp<ViewStyle>;
};

function RowDivider() {
  return <View style={styles.divider} />;
}

function Row({ label, value, valueColor }: LabelValueRow) {
  return (
    <View style={styles.row}>
      <CaptionText size={15}>{label}</CaptionText>
      <BodyText
        weight="500"
        align="right"
        color={valueColor}
        style={styles.value}>
        {value}
      </BodyText>
    </View>
  );
}

export default function LabelValueCard({ rows, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      {rows.map((row, index) => (
        <View key={row.label}>
          {index > 0 && <RowDivider />}
          <Row {...row} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  value: {
    maxWidth: '55%',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
});
