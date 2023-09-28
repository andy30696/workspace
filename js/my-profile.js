//ModoNocturno

const dark = "background: #1f1f1f; color: white;";
const light = "background: white; color: black;";

let currentMode = "light";

function changeMode(mode) {
    currentMode = mode;
    document.body.style.cssText = mode === "light" ? light : dark;
}

const modeButton = document.getElementById("darkMode");
modeButton.addEventListener("click", () => {
    changeMode(currentMode === "light" ? "dark" : "light");
});
changeMode(mode);
