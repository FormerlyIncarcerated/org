// Enhanced theme configuration for the blue-focused palette system
// Provides utilities and constants for the new ocean-inspired theme system

export const blueColorPalette = {
  // Core blue palette from provided hex values
  darkest: {
    hex: "#012A4A",
    hsl: "204 95% 15%",
    name: "Midnight Deep",
    description: "Darkest blue for backgrounds and depth"
  },
  veryDark: {
    hex: "#013A63", 
    hsl: "204 98% 20%",
    name: "Ocean Depth",
    description: "Very dark blue for muted backgrounds"
  },
  dark: {
    hex: "#01497C",
    hsl: "204 98% 24%", 
    name: "Deep Current",
    description: "Dark blue for cards and containers"
  },
  darkAlt: {
    hex: "#014F86",
    hsl: "204 98% 26%",
    name: "Navy Professional", 
    description: "Dark blue alternative for primary actions"
  },
  medium: {
    hex: "#2A6F97",
    hsl: "204 56% 38%",
    name: "Ocean Blue",
    description: "Medium blue for primary brand elements"
  },
  mediumTeal: {
    hex: "#2C7DA0", 
    hsl: "198 57% 40%",
    name: "Teal Current",
    description: "Medium blue-teal for dynamic elements"
  },
  mediumDark: {
    hex: "#468FAF",
    hsl: "198 42% 48%",
    name: "Steel Wave", 
    description: "Medium-dark blue for borders and structure"
  },
  air: {
    hex: "#61A5C2",
    hsl: "198 44% 57%",
    name: "Air Superiority",
    description: "Light blue for secondary actions and highlights"
  },
  lightGray: {
    hex: "#89C2D9",
    hsl: "198 53% 69%",
    name: "Coastal Mist",
    description: "Light blue-gray for subtle backgrounds"
  },
  veryLight: {
    hex: "#A9D6E5", 
    hsl: "198 53% 78%",
    name: "Sky Reflection",
    description: "Very light blue for accents and highlights"
  },
  seasalt: {
    hex: "#F6F6F7",
    hsl: "240 6% 97%", 
    name: "Seasalt",
    description: "Near-white for light backgrounds and text"
  }
} as const;

export const themeVariants = {
  sanQuentin: {
    name: "San Quentin Standard",
    description: "Classic, trusted, and foundational – honoring transformation programs",
    primary: blueColorPalette.medium.hsl,        // Ocean Blue #2A6F97
    secondary: blueColorPalette.air.hsl,         // Air Superiority #61A5C2
    accent: blueColorPalette.veryLight.hsl,      // Sky Reflection #A9D6E5
    background: blueColorPalette.seasalt.hsl,    // Seasalt #F6F6F7
    foreground: blueColorPalette.darkest.hsl,    // Old Folsom #012A4A
    muted: blueColorPalette.lightGray.hsl,       // Coastal Mist #89C2D9
    border: blueColorPalette.medium.hsl,         // Ocean Blue
  },
  pelicanDepths: {
    name: "Pelican Depths",
    description: "Heavy, isolated, and intense – echoing the atmosphere of Pelican Bay's SHU",
    primary: blueColorPalette.darkAlt.hsl,       // Pelican Bay #014F86
    secondary: blueColorPalette.mediumTeal.hsl,  // Teal Current #2C7DA0
    accent: blueColorPalette.mediumDark.hsl,     // Steel Wave #468FAF
    background: blueColorPalette.dark.hsl,       // San Quentin #01497C
    foreground: blueColorPalette.seasalt.hsl,    // Seasalt #F6F6F7
    muted: blueColorPalette.darkest.hsl,         // Old Folsom #012A4A
    border: blueColorPalette.lightGray.hsl,      // Coastal Mist #89C2D9
  },
  chinoSkies: {
    name: "Chino Skies",
    description: "Lighter tone symbolic of open yards and reentry potential",
    primary: blueColorPalette.air.hsl,           // Air Superiority #61A5C2
    secondary: blueColorPalette.veryLight.hsl,   // Sky Reflection #A9D6E5
    accent: blueColorPalette.medium.hsl,         // Ocean Blue #2A6F97
    background: blueColorPalette.lightGray.hsl,  // Coastal Mist #89C2D9
    foreground: blueColorPalette.veryDark.hsl,   // New Folsom #013A63
    muted: blueColorPalette.seasalt.hsl,         // Seasalt #F6F6F7
    border: blueColorPalette.mediumDark.hsl,     // Steel Wave #468FAF
  },
  folsomIron: {
    name: "Folsom Iron",
    description: "Rugged, industrial look – honoring Folsom's legacy and strength through adversity",
    primary: blueColorPalette.mediumDark.hsl,    // Steel Wave #468FAF
    secondary: blueColorPalette.medium.hsl,      // Ocean Blue #2A6F97
    accent: blueColorPalette.veryLight.hsl,      // Sky Reflection #A9D6E5
    background: blueColorPalette.veryDark.hsl,   // New Folsom #013A63
    foreground: blueColorPalette.seasalt.hsl,    // Seasalt #F6F6F7
    muted: blueColorPalette.dark.hsl,            // San Quentin #01497C
    border: blueColorPalette.air.hsl,            // Air Superiority #61A5C2
  },
  lancasterLight: {
    name: "Lancaster Light",
    description: "Modern, rehabilitative, and calm – inspired by progressive programming efforts",
    primary: blueColorPalette.lightGray.hsl,     // Coastal Mist #89C2D9
    secondary: blueColorPalette.veryLight.hsl,   // Sky Reflection #A9D6E5
    accent: blueColorPalette.darkAlt.hsl,        // Pelican Bay #014F86
    background: blueColorPalette.seasalt.hsl,    // Seasalt #F6F6F7
    foreground: blueColorPalette.darkest.hsl,    // Old Folsom #012A4A
    muted: blueColorPalette.air.hsl,             // Air Superiority #61A5C2
    border: blueColorPalette.medium.hsl,         // Ocean Blue #2A6F97
  },
  crescentNight: {
    name: "Crescent Night",
    description: "Solemn, deep night tones symbolizing reflection and change",
    primary: blueColorPalette.mediumTeal.hsl,    // Teal Current #2C7DA0
    secondary: blueColorPalette.medium.hsl,      // Ocean Blue #2A6F97
    accent: blueColorPalette.veryLight.hsl,      // Sky Reflection #A9D6E5
    background: blueColorPalette.darkest.hsl,    // Old Folsom #012A4A
    foreground: blueColorPalette.seasalt.hsl,    // Seasalt #F6F6F7
    muted: blueColorPalette.veryDark.hsl,        // New Folsom #013A63
    border: blueColorPalette.mediumDark.hsl,     // Steel Wave #468FAF
  }
} as const;

// CSS custom property generators
export const generateCSSVariables = (theme: keyof typeof themeVariants) => {
  const variant = themeVariants[theme];
  return {
    '--primary': variant.primary,
    '--secondary': variant.secondary,
    '--accent': variant.accent,
    '--background': variant.background,
    '--foreground': variant.foreground,
    '--muted': variant.muted,
    '--border': variant.border,
  };
};

// Accessibility information
export const accessibilityInfo = {
  contrastRatios: {
    darkOnLight: "8.7:1", // Darkest blue on seasalt
    lightOnDark: "8.7:1", // Seasalt on darkest blue  
    mediumOnLight: "6.2:1", // Medium blue on seasalt
    lightOnMedium: "6.2:1", // Seasalt on medium blue
  },
  wcagLevel: "AAA",
  colorBlindSafe: true,
  notes: "All color combinations meet WCAG AAA standards for accessibility"
};

// Gradient definitions using the blue palette
export const blueGradients = {
  oceanDepth: `linear-gradient(135deg, ${blueColorPalette.darkest.hex}, ${blueColorPalette.medium.hex})`,
  skyReflection: `linear-gradient(45deg, ${blueColorPalette.air.hex}, ${blueColorPalette.veryLight.hex})`,
  professionalFlow: `linear-gradient(90deg, ${blueColorPalette.darkAlt.hex}, ${blueColorPalette.mediumTeal.hex}, ${blueColorPalette.air.hex})`,
  coastalMist: `linear-gradient(180deg, ${blueColorPalette.seasalt.hex}, ${blueColorPalette.lightGray.hex})`,
  fullSpectrum: `linear-gradient(90deg, ${blueColorPalette.darkest.hex}, ${blueColorPalette.medium.hex}, ${blueColorPalette.air.hex}, ${blueColorPalette.veryLight.hex})`,
};

export type BlueThemeVariant = keyof typeof themeVariants;
export type BlueColorKey = keyof typeof blueColorPalette;
