const languages = [
    "text",
    "rust",
    "c_cpp",
    "java",
    "python",
    "ruby",
    "sass",
    "markdown",
    "mysql",
    "golang",
    "csharp",
    "javascript",
    "typescript",
    "haskell",
    "latex",
    "sql",
    "toml",
    "yaml"
];

languages.sort();

const languageOptions = languages.map((language) => {
    if (language === "javascript") {
        return {
            value: "typescript",
            label: "javascript",
        }
    } else {
        return {
            value: language,
            label: language,
        }
    }
});

export default languageOptions;