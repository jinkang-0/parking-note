import { useLocation } from "@/contexts/LocationContext";
import { useSavedLocation } from "@/contexts/SavedLocationContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { metersToFeet } from "@/lib/utils";
import * as Haptics from "expo-haptics";
import { PermissionStatus } from "expo-location";
import { useCallback } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import ThemedButton from "../ui/ThemedButton";
import { ThemedText } from "../ui/ThemedText";

export default function ActionBar() {
  const colors = useThemeColors();
  const { location, permissionStatus } = useLocation();
  const { addSavedLocation } = useSavedLocation();

  const handleSaveLocation = useCallback(async () => {
    if (!location) {
      console.warn("No location available to save.");
      return;
    }

    const { coords } = location;
    addSavedLocation(coords.latitude, coords.longitude);
  }, [location, addSavedLocation]);

  return (
    <View
      style={{
        ...styles.actionBar,
        borderColor: colors.line,
        backgroundColor: colors.card
      }}
    >
      {/* button */}
      {permissionStatus === PermissionStatus.DENIED ? (
        <ThemedButton
          style={styles.saveButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            Linking.openSettings();
          }}
        >
          <IconSymbol name="location.slash" color={colors.text} />
          <ThemedText type="default">
            Enable Location Permission
          </ThemedText>
        </ThemedButton>
      ) : (
        <ThemedButton
          style={styles.saveButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            handleSaveLocation();
          }}
        >
          <IconSymbol name="star" color={colors.text} />
          <ThemedText type="default">Save Location</ThemedText>
        </ThemedButton>
      )}
      <View style={styles.keyValueContainer}>
        <View style={styles.keyValueList}>
          <ThemedText type="medium">GPS Accuracy</ThemedText>
          <ThemedText type="medium">Latitude</ThemedText>
          <ThemedText type="medium">Longitude</ThemedText>
        </View>
        <View style={styles.keyValueList}>
          <ThemedText type="light">
            {location?.coords.accuracy
              ? metersToFeet(location?.coords.accuracy).toFixed(2) + " ft"
              : "Unavailable"}
          </ThemedText>
          <ThemedText type="light">
            {location?.coords.latitude ?? "Unavailable"}
          </ThemedText>
          <ThemedText type="light">
            {location?.coords.longitude ?? "Unavailable"}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 48,
    paddingTop: 22,
    paddingBottom: 48,
    gap: 20,
    borderTopWidth: 1,
    borderStyle: "solid"
  },
  keyValueContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 16
  },
  keyValueList: {
    gap: 8
  },
  saveButton: {
    borderStyle: "solid",
    borderWidth: 1
  }
});
