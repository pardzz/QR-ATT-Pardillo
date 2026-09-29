import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

import AppButton from '@/components/AppButton';
import { COLORS } from '@/constants/colors';
import { useAuth, signOut } from '@/lib/auth';

export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOut();

      router.replace('/login');
    } catch (err: any) {
      Alert.alert(
        'Error',
        err?.message || 'Failed to sign out.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Profile
      </Text>

      {user && (
        <View style={styles.card}>
          <Text style={styles.label}>
            Email
          </Text>

          <Text style={styles.value}>
            {user.email}
          </Text>

          <Text style={styles.label}>
            User ID
          </Text>

          <Text style={styles.id}>
            {user.id}
          </Text>
        </View>
      )}

      <AppButton
       title={loading ? 'Signing Out...' : 'Sign Out'}
       icon="log-out-outline"
       onPress={handleSignOut}
     
     />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 20,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  id: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});