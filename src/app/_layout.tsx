import { Stack } from "expo-router";
import { Text } from "react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { db } from "@/db/client";
import migrations from "../../drizzle/migrations";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return <Text>Migration error: {error.message}</Text>;
  }

  if (!success) {
    return <Text>Running migrations...</Text>;
  }

  return <Stack />;
}
