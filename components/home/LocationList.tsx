import { useSavedLocation } from "@/contexts/SavedLocationContext";
import { FlatList, StyleSheet, View } from "react-native";
import LocationCard from "../LocationCard";
import { ThemedText } from "../ThemedText";

export default function LocationList() {
  const { savedLocations } = useSavedLocation();

  return (
    <View style={styles.savedLocations}>
      <ThemedText type="subtitle" style={styles.title}>
        Saved Locations
      </ThemedText>
      <FlatList
        data={savedLocations}
        renderItem={({ item }) => <LocationCard location={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    paddingHorizontal: 48
  },
  savedLocations: {
    width: "100%",
    paddingTop: 82,
    gap: 20,
    flex: 1
  },
  list: {
    paddingHorizontal: 48,
    gap: 16
  }
});
