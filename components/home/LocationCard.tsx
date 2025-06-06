import { useLocation } from "@/contexts/LocationContext";
import { useSavedLocation } from "@/contexts/SavedLocationContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { distanceLonLatMiles, formatTime, getMapLink } from "@/lib/utils";
import { styleButton } from "@/styles/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOutUp } from "react-native-reanimated";
import { IconSymbol } from "../ui/IconSymbol";
import ThemedButton from "../ui/ThemedButton";
import { ThemedText } from "../ui/ThemedText";

interface LocationCardProps {
  location: SavedLocation;
}

export default function LocationCard({ location }: LocationCardProps) {
  const colors = useThemeColors();
  const { location: currentLocation } = useLocation();
  const { removeSavedLocation } = useSavedLocation();

  const distanceInMiles = useMemo(() => {
    if (!currentLocation || !location) return null;
    return distanceLonLatMiles(
      location.longitude,
      location.latitude,
      currentLocation.coords.longitude,
      currentLocation.coords.latitude
    ).toFixed(2);
  }, [location, currentLocation]);

  const elapsedTime = useMemo(() => {
    if (!location.saved) return null;
    return formatTime(location.saved);
  }, [location.saved]);

  // handlers

  const handleDelete = () => {
    AsyncStorage.removeItem(location.id);
    removeSavedLocation(location.id);
  };

  return (
    <Animated.View
      style={{
        ...styles.cardContainer,
        borderColor: colors.border,
        backgroundColor: colors.card
      }}
      entering={FadeIn}
      exiting={FadeOutUp}
    >
      <View style={styles.infoContainer}>
        <View style={styles.infoBig}>
          <IconSymbol name="mappin.circle" color={colors.text} />
          <ThemedText type="medium">
            {location.latitude}, {location.longitude}
          </ThemedText>
        </View>
        <View style={styles.info}>
          <IconSymbol size={20} name="ruler" color={colors.text} />
          <ThemedText type="light">
            {distanceInMiles
              ? `${distanceInMiles} miles away`
              : "distance unavailable"}
          </ThemedText>
        </View>
        <View style={styles.info}>
          <IconSymbol size={20} name="clock" color={colors.text} />
          <ThemedText type="light">
            {elapsedTime ? `saved ${elapsedTime}` : "time unavailable"}
          </ThemedText>
        </View>
      </View>
      <View style={styles.actions}>
        <ThemedButton
          style={{
            backgroundColor: colors.red
          }}
          type="small"
          onPress={handleDelete}
        >
          <IconSymbol size={16} name="trash" color="#eee" />
          <ThemedText type="action">Delete</ThemedText>
        </ThemedButton>
        <Link
          href={`https://${getMapLink(location.latitude, location.longitude)}`}
        >
          <View
            style={{ ...styleButton.buttonSmall, backgroundColor: colors.blue }}
          >
            <IconSymbol size={16} name="scope" color="#eee" />
            <ThemedText type="action">Navigate</ThemedText>
          </View>
        </Link>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8
  },
  infoContainer: {
    gap: 8
  },
  locationInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  infoBig: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8
  }
});
