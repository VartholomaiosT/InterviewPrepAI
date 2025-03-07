import {
  View,
  Text,
  StyleSheet,
  Switch,
  useColorScheme,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Smartphone, Trash2 } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Settings
        </Text>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}
          >
            Appearance
          </Text>

          <View
            style={[
              styles.settingItem,
              { borderColor: isDark ? '#333' : '#e5e5e5' },
            ]}
          >
            <View style={styles.settingLeft}>
              {isDark ? (
                <Moon size={20} color={isDark ? '#fff' : '#000'} />
              ) : (
                <Sun size={20} color={isDark ? '#fff' : '#000'} />
              )}
              <Text
                style={[
                  styles.settingText,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                Dark Mode
              </Text>
            </View>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}
          >
            Data Management
          </Text>
          <Pressable
            style={[
              styles.settingItem,
              { borderColor: isDark ? '#333' : '#e5e5e5' },
            ]}
          >
            <View style={styles.settingLeft}>
              <Trash2 size={20} color="#FF3B30" />
              <Text style={[styles.settingText, { color: '#FF3B30' }]}>
                Clear All Data
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});
