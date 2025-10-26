// main.js

// --------------------------- Addon Infos ---------------------------
export function Name() { return "TestColorEffect"; }
export function Version() { return "1.0.0"; }
export function Type() { return "effect"; } // WICHTIG: "effect", damit es die Library-Farbe übersteuert
export function Publisher() { return "Soizi33"; }

// --------------------------- Lifecycle ---------------------------
export function Initialize() {
    console.log("✅ TestColorEffect gestartet!");

    // Effekt registrieren
    signalrgb.createEffect({
        name: "WindowsColorTest",
        update: () => {
            applyColor();
        }
    });
}

// --------------------------- Funktion zum Setzen der Farbe ---------------------------
function applyColor() {
    const devices = signalrgb.devices;

    if (!devices || devices.length === 0) {
        console.log("⚠️ Keine Geräte gefunden.");
        return;
    }

    // Testfarbe: kräftiges Blau
    const color = { r: 0, g: 100, b: 255 };

    devices.forEach(device => {
        try {
            device.setColor(color.r, color.g, color.b);
        } catch (err) {
            console.log(`Fehler beim Setzen der Farbe auf ${device.name}: ${err}`);
        }
    });
}

export function Shutdown() {
    console.log("🛑 TestColorEffect beendet.");
    // LEDs ausschalten
    const devices = signalrgb.devices;
    devices.forEach(device => {
        device.setColor(0, 0, 0);
    });
}
