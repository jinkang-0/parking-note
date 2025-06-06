import {
  Accuracy,
  getForegroundPermissionsAsync,
  LocationObject,
  LocationSubscription,
  PermissionStatus,
  requestForegroundPermissionsAsync,
  watchPositionAsync
} from "expo-location";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { AppState } from "react-native";

interface LocationContextProps {
  location: LocationObject | null;
  permissionStatus: PermissionStatus;
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
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(PermissionStatus.UNDETERMINED);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const watcher = useRef<LocationSubscription | null>(null);

  useEffect(() => {
    // setup app state listener to handle app state changes
    AppState.addEventListener("change", async () => {
      const permission = await getForegroundPermissionsAsync();
      setPermissionStatus(permission.status);
      if (permission.status === PermissionStatus.GRANTED) {
        // remove previous watcher if it exists
        if (watcher.current)
          watcher.current.remove();

        // start watching position if permission is granted
        watcher.current = await watchPositionAsync(
          { accuracy: Accuracy.Highest, distanceInterval: 0 },
          (newLocation) => {
            setLocation(newLocation);
          });
      } else {
        setLocation(null); // reset location if permission is not granted
      }
    });

    // initialize location permission request
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== PermissionStatus.GRANTED) {
        return;
      }

      // if permission is granted, we can start watching the position
      watcher.current = await watchPositionAsync(
        { accuracy: Accuracy.Highest, distanceInterval: 0 },
        (newLocation) => {
          setLocation(newLocation);
        });
    })();

    return () => {
      if (watcher.current) {
        watcher.current.remove();
      }
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, permissionStatus }}>
      {children}
    </LocationContext.Provider>
  );
}
