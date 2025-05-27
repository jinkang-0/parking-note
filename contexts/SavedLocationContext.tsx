import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import uuid from "react-native-uuid";

interface SavedLocationContextProps {
  savedLocations: SavedLocation[];
  addSavedLocation: (latitude: number, longitude: number) => Promise<void>;
  removeSavedLocation: (id: string) => void;
}

export const SavedLocationContext =
  createContext<SavedLocationContextProps | null>(null);

export const useSavedLocation = () => {
  const context = useContext(SavedLocationContext);
  if (!context) {
    throw new Error(
      "useSavedLocation must be used within a SavedLocationProvider"
    );
  }
  return context;
};

export function SavedLocationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  useEffect(() => {
    // Load saved locations from local storage or other persistent storage
    const loadSavedLocations = async () => {
      try {
        const ids = await AsyncStorage.getAllKeys();
        if (ids.length === 0) {
          console.log("No saved locations found.");
          return;
        }

        const storedLocationsString = await AsyncStorage.multiGet(ids);
        const storedLocations = storedLocationsString.map((v) => {
          const data = JSON.parse(v[1] ?? "{}");
          return { ...data, saved: new Date(data.saved) };
        }) as SavedLocation[];

        // sort locations by saved date, newest first
        storedLocations.sort((a, b) => b.saved.getTime() - a.saved.getTime());

        setSavedLocations(storedLocations);
      } catch (error) {
        console.error("Failed to load saved locations:", error);
      }
    };

    loadSavedLocations();
  }, []);

  const addSavedLocation = useCallback(
    async (latitude: number, longitude: number) => {
      const id = uuid.v4();
      const location: SavedLocation = {
        id,
        latitude,
        longitude,
        saved: new Date()
      };

      try {
        await AsyncStorage.setItem(id, JSON.stringify(location));
      } catch (error) {
        console.error("Failed to save location:", error);
      }

      setSavedLocations((prev) => [location, ...prev]);
    },
    []
  );

  const removeSavedLocation = useCallback((id: string) => {
    AsyncStorage.removeItem(id);
    setSavedLocations((prev) => prev.filter((location) => location.id !== id));
  }, []);

  return (
    <SavedLocationContext.Provider
      value={{ savedLocations, addSavedLocation, removeSavedLocation }}
    >
      {children}
    </SavedLocationContext.Provider>
  );
}
