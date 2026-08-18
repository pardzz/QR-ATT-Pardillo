import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants/colors';

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Scanner</Text>
      <Text style={styles.subtitle}>
        The QR scanner will be implemented in Phase 2.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  title: { fontSize: 20, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20 },
});
