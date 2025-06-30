import type {
  PaletteColor,
  ColorSystemOptions,
  PaletteColorChannel,
} from "@mui/material/styles";

import { createPaletteChannel } from "minimal-shared/utils";
import { alpha } from "@mui/material/styles";

import { themeConfig } from "../theme-config";

import type { ThemeColorScheme } from "../types";

// ----------------------------------------------------------------------

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../extend-theme-types.d.ts}
 */

// Keys for the palette colors
export type PaletteColorKey =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

// Palette color without additional channels
export type PaletteColorNoChannels = Omit<
  PaletteColor,
  "light" | "dark"
>;

// Palette color with additional channels
export type PaletteColorWithChannels = PaletteColor & PaletteColorChannel;

// Extended common colors
export type CommonColorsExtend = {
  whiteChannel: string;
  blackChannel: string;
};

// Extended text colors
export type TypeTextExtend = {
  disabledChannel: string;
};

// Extended background colors
export type TypeBackgroundExtend = {
  neutral: string;
  neutralChannel: string;
};

// Extended palette colors
export type PaletteColorExtend = {
  lighter: string;
  darker: string;
  light: string;
  dark: string;
};

// Extended grey channels
export type GreyExtend = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

// ----------------------------------------------------------------------

// Primary color
export const primary = createPaletteChannel(themeConfig.palette.primary);

// Secondary color
export const secondary = createPaletteChannel(themeConfig.palette.secondary);

// Info color
export const info = createPaletteChannel(themeConfig.palette.info);

// Success color
export const success = createPaletteChannel(themeConfig.palette.success);

// Warning color
export const warning = createPaletteChannel(themeConfig.palette.warning);

// Error color
export const error = createPaletteChannel(themeConfig.palette.error);

// Common color
export const common = createPaletteChannel(themeConfig.palette.common);

// Grey color
export const grey = createPaletteChannel(themeConfig.palette.grey);

// Text color
export const text = {
  light: createPaletteChannel({
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500],
  }),
};

// Background color
export const background = {
  light: createPaletteChannel({
    paper: "#FFFFFF",
    default: grey[100],
    neutral: grey[200],
  }),
};

// Base action color
export const baseAction = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  focus: alpha(grey[500], 0.24),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

// Action color
export const action = {
  light: { ...baseAction, active: grey[600] },
};

// ----------------------------------------------------------------------

// Base palette
export const basePalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  common,
  grey,
  divider: alpha(grey[500], 0.2),
};

export const palette: Partial<
  Record<ThemeColorScheme, ColorSystemOptions["palette"]>
> = {
  light: {
    ...basePalette,
    text: text.light,
    background: background.light,
    action: action.light,
  },
};
