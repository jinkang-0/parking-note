import { useLocation } from "@/contexts/LocationContext";
import { useSavedLocation } from "@/contexts/SavedLocationContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { metersToFeet } from "@/lib/utils";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import ThemedButton from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "../ui/IconSymbol";

export default function ActionBar() {
  const colors = useThemeColors();
  const { location } = useLocation();
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
      <ThemedButton style={styles.saveButton} onPress={handleSaveLocation}>
        <IconSymbol name="star" color={colors.text} />
        <ThemedText type="default">Save Location</ThemedText>
      </ThemedButton>
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
