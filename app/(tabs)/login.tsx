import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

import AppButton from '@/components/AppButton';
import { COLORS } from '@/constants/colors';
import { signIn } from '@/lib/auth';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await signIn(
        email.trim(),
        password
      );

      if (authError) {
        setError(authError.message);
      } else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.subtitle}>
        Sign in to your account
      </Text>

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />

      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        editable={!loading}
      />

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      ) : (
        <AppButton
          title="Sign In"
          icon="log-in-outline"
          theme="primary"
          onPress={handleLogin}
        />
      )}

      <Link href="/register" style={styles.link}>
        Don't have an account? Sign Up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  error: {
    color: '#C62828',
    textAlign: 'center',
    marginTop: 12,
  },

  loader: {
    marginVertical: 20,
  },

  link: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.primary,
    fontWeight: '600',
  },
});