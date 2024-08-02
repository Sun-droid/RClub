const accentColors = [
    "rgb(217 119 6 / var(--tw-bg-opacity))",
    "rgb(180 83 9 / var(--tw-bg-opacity))",
    "rgb(245 158 11 / var(--tw-bg-opacity))",
    "rgb(180 83 9 / var(--tw-bg-opacity))",
    "rgb(120 53 15 / var(--tw-bg-opacity))",
    "rgba(186, 124, 52, 1)",
    "rgba(152, 90, 17, 1)",
    "rgba(140, 71, 19, 1)",
    "rgba(111, 62, 34, 1)",
    "rgba(208, 97, 34, 1)",
    "color(srgb 0.345 0.221 0.1535)",
];
export const defaultColor = "rgb(217 119 6 / var(--tw-bg-opacity))";
export const getRandomColor = () => {
    return accentColors[Math.floor(Math.random() * accentColors.length)];
};