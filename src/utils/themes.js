const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal"
];

themes.sort();

const themeOptions = themes.map((theme) => {
    return {
        value: theme,
        label: theme,
    }
})

export default themeOptions;