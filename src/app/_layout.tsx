import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { AuthProvider, useAuth } from "@/lib/auth-context";
import SignIn from "./sign-in";

function RootNavigator() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!session) {
    return <SignIn />;
  }

  return <Stack />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
