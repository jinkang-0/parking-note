import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "light" | "medium" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colors = useThemeColors();

  return (
    <Text
      style={[
        { color: colors.text },
        type === "default" ? styles.default : undefined,
        type === "light"
          ? { ...styles.default, color: colors.shadedText, fontWeight: 300 }
          : undefined,
        type === "medium" ? styles.medium : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500
  },
  subtitle: {
    fontSize: 16,
    textTransform: "uppercase",
    width: "100%"
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4"
  }
});
