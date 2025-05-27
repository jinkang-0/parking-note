import { StyleSheet } from "react-native";

const buttonStyleBase = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderRadius: 8
  }
});

export const styleButton = StyleSheet.create({
  buttonLarge: {
    ...buttonStyleBase.base,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  buttonSmall: {
    ...buttonStyleBase.base,
    paddingHorizontal: 10,
    paddingVertical: 6
  }
});
