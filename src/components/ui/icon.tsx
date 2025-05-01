
import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  color,
  size = 24,
  strokeWidth = 2,
  className = "",
  fallback = "CircleAlert",
}) => {
  // @ts-ignore - динамический импорт иконок
  const LucideIcon = LucideIcons[name] || LucideIcons[fallback];

  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};

export default Icon;
