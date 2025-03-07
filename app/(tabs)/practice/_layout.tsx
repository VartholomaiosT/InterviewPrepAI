import { Stack } from 'expo-router';

export default function PracticeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="paste"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="quick"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="questions"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}