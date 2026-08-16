import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { supabase } from "@/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function sendMagicLink() {
    setIsSending(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({ email });

    setIsSending(false);
    setMessage(
      error ? error.message : "Check your email for a sign-in link.",
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <TextInput
        style={styles.input}
        placeholder="you@example.com"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {isSending ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Send magic link"
          onPress={sendMagicLink}
          disabled={!email.includes("@")}
        />
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  message: {
    textAlign: "center",
    color: "#555",
  },
});
