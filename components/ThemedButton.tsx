import { useThemeColors } from "@/hooks/useThemeColors";
import { styleButton } from "@/styles/button";
import { Pressable, PressableProps } from "react-native";

interface ThemedButtonProps extends PressableProps {
  type?: "large" | "small";
}

export default function ThemedButton({
  children,
  style,
  type = "large",
  ...rest
}: ThemedButtonProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      {...rest}
      style={(props) => [
        type === "large" ? styleButton.buttonLarge : styleButton.buttonSmall,
        {
          borderColor: colors.line,
          ...((style instanceof Function ? style(props) : style) as object)
        }
      ]}
    >
      {children}
    </Pressable>
  );
}
