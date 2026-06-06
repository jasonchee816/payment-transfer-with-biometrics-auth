import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { HeadingText } from './AppText';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatAmount(amount: number): string {
  return `RM ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function scaleAndRound(value: number): number {
  return Math.round(value * 100) / 100;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FixedDecimalCurrencyInputRef {
  focus: () => void;
  blur: () => void;
}

type TProps = {
  ref?: React.Ref<FixedDecimalCurrencyInputRef>;
  /** Amount in dollar value */
  amount?: number;
  setAmount: (amount: number) => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Currency input with a fixed decimal point (cash-register style).
 * Input is handled in cents and displayed in dollars.
 *
 * | Input   | Display      |
 * |---------|--------------|
 * | `1`     | `RM 0.01`    |
 * | `12`    | `RM 0.12`    |
 * | `123`   | `RM 1.23`    |
 * | `1234`  | `RM 12.34`   |
 */
export default function FixedDecimalCurrencyInput({
  ref,
  amount = 0,
  setAmount,
  disabled = false,
  containerStyle,
}: TProps) {
  const inputRef = useRef<TextInput>(null);
  const cursorOpacity = useRef(new Animated.Value(0)).current;

  const [amountInCents, setAmountInCents] = useState('');
  const [dollarDisplay, setDollarDisplay] = useState(formatAmount(amount));
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  // Cents → dollars conversion on every keystroke
  const onChangeText = useCallback(
    (text: string) => {
      const cents = parseInt(text.replace(/\D/g, '') || '0', 10);
      const dollars = cents / 100;

      setAmountInCents(cents === 0 ? '' : String(cents));
      setDollarDisplay(formatAmount(dollars));
      setAmount(dollars);
    },
    [setAmount],
  );

  // Blinking cursor animation
  useEffect(() => {
    if (isFocused) {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(cursorOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );
      anim.start();
      return () => anim.stop();
    } else {
      cursorOpacity.setValue(0);
    }
  }, [isFocused, cursorOpacity]);

  // Sync when the external `amount` prop changes
  useEffect(() => {
    const rounded = scaleAndRound(amount);
    const cents = Math.round(rounded * 100);
    setAmountInCents(cents === 0 ? '' : String(cents));
    setDollarDisplay(formatAmount(rounded));
  }, [amount]);

  return (
    <TouchableWithoutFeedback
      onPress={() => !disabled && inputRef.current?.focus()}
      disabled={disabled}>
      <View style={[styles.container, containerStyle]}>

        {/*
          Row keeps text and cursor inline so the cursor naturally
          sits right beside the last character rather than being
          positioned relative to the full container width.
        */}
        <View style={styles.inputRow}>
          <HeadingText
            size={48}
            color={!amount ? '#C7C7CC' : undefined}
            style={styles.displayText}>
            {dollarDisplay}
          </HeadingText>

          {isFocused && (
            <Animated.View style={{ opacity: cursorOpacity }}>
              <HeadingText size={48} weight="300" color="#007AFF">|</HeadingText>
            </Animated.View>
          )}
        </View>

        {/* Hidden input — captures keystrokes, never visible */}
        <TextInput
          ref={inputRef}
          value={amountInCents}
          keyboardType="number-pad"
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.hiddenInput}
          contextMenuHidden
          autoCorrect={false}
          editable={!disabled}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayText: {
    letterSpacing: -1,
  },
  hiddenInput: {
    height: 0,
    width: 0,
    position: 'absolute',
  },
});
