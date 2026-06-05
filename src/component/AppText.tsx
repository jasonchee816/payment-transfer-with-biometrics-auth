import { Text as RNText, StyleSheet } from 'react-native';
import type { StyleProp, TextProps, TextStyle } from 'react-native';

export const TextColors = {
  primary: '#000000',
  secondary: '#8E8E93',
  accent: '#007AFF',
  inverse: '#FFFFFF',
} as const;

export type AppTextProps = TextProps & {
  /** Override the text color (avoids a one-off style object). */
  color?: string;
  /** Override the font weight. */
  weight?: TextStyle['fontWeight'];
  /** Override the font size. */
  size?: number;
  /** Override the text alignment. */
  align?: TextStyle['textAlign'];
  /** Layout-only overrides (margins, flex, etc.). Avoid re-declaring typography here. */
  style?: StyleProp<TextStyle>;
};

function createTextComponent(baseStyle: TextStyle, displayName: string) {
  function TextComponent({ color, weight, size, align, style, ...rest }: AppTextProps) {
    const overrides: TextStyle = {};
    if (color !== undefined) overrides.color = color;
    if (weight !== undefined) overrides.fontWeight = weight;
    if (size !== undefined) overrides.fontSize = size;
    if (align !== undefined) overrides.textAlign = align;

    return <RNText {...rest} style={[baseStyle, overrides, style]} />;
  }
  TextComponent.displayName = displayName;
  return TextComponent;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: TextColors.primary,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: TextColors.primary,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    color: TextColors.primary,
  },
  bold: {
    fontSize: 15,
    fontWeight: '600',
    color: TextColors.primary,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    color: TextColors.secondary,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: TextColors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});

/** Large screen-level heading (28/700). */
export const HeadingText = createTextComponent(styles.heading, 'HeadingText');

/** Section / card title (18/700). */
export const TitleText = createTextComponent(styles.title, 'TitleText');

/** Default body copy (15/400). */
export const BodyText = createTextComponent(styles.body, 'BodyText');

/** Emphasized body copy (15/600). */
export const BoldText = createTextComponent(styles.bold, 'BoldText');

/** Small, muted supporting text (13/400, grey). */
export const CaptionText = createTextComponent(styles.caption, 'CaptionText');

/** Small uppercase label (12/600, grey). */
export const LabelText = createTextComponent(styles.label, 'LabelText');
