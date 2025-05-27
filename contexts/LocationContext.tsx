import {
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationObject,
  PermissionStatus,
  requestForegroundPermissionsAsync
} from "expo-location";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

interface LocationContextProps {
  location: LocationObject | null;
}

export const LocationContext = createContext<LocationContextProps | null>(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const permissionStatus = useRef<PermissionStatus>(
    PermissionStatus.UNDETERMINED
  );
  const [location, setLocation] = useState<LocationObject | null>(null);

  const updateLocation = useCallback(async () => {
    if (permissionStatus.current !== PermissionStatus.GRANTED) {
      const { status } = await requestForegroundPermissionsAsync();
      permissionStatus.current = status;
      if (status !== PermissionStatus.GRANTED) {
        console.error("Permission to access location was denied");
        return;
      }
    }

    try {
      const loc = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.Highest
      });
      setLocation(loc);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateLocation();
    }, 1000); // Update location every second

    // Initial location fetch
    updateLocation();

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [updateLocation]);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
}
