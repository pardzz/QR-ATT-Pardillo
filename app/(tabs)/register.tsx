import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';

import AppButton from '@/components/AppButton';
import { COLORS } from '@/constants/colors';
import { signUp } from '@/lib/auth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);

    if (!email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await signUp(
        email.trim(),
        password
      );

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Register your QR Attendance account
      </Text>

      {success ? (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>
            Check your email!
          </Text>

          <Text style={styles.successText}>
            We sent a confirmation link to {email}.
            Please verify your account before signing in.
          </Text>

          <Link href="/login" style={styles.link}>
            Back to Sign In
          </Link>
        </View>
      ) : (
        <>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            placeholderTextColor="#999"
            secureTextEntry
          />

          <Text style={styles.label}>
            Confirm Password
          </Text>

          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter your password"
            placeholderTextColor="#999"
            secureTextEntry
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
              title="Sign Up"
              icon="person-add-outline"
              theme="primary"
              onPress={handleRegister}
            />
          )}

          <Link href="/login" style={styles.link}>
            Already have an account? Sign In
          </Link>
        </>
      )}
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
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 20,
  },

  successBox: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 14,
  },

  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },

  successText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },
});