import { ThemedView } from "@/components/ThemedView";
import ActionBar from "@/components/home/ActionBar";
import LocationList from "@/components/home/LocationList";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <LocationList />
      <ActionBar />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    height: "100%",
    width: "100%"
  }
});
