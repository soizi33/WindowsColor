// main.js

// --------------------------- Addon Infos ---------------------------
export function Name() { return "WindowsColor"; }
export function Version() { return "1.0.0"; }
export function Type() { return "software"; }
export function Publisher() { return "Soizi33"; }

let forcedColor = { r: 0, g: 0, b: 0 }; // Platzhalter für Windows-Farbe

// --------------------------- Lifecycle ---------------------------
export function Initialize() {
    console.log("✅ WindowsColor Addon gestartet!");
}

export function Render() {
    // Windows-Farbe auslesen
    forcedColor = getWindowsAccentColor();

    // Geräte abrufen
    const devices = signalrgb.devices;
    if (!devices || devices.length === 0) {
        console.log("⚠️ Keine Geräte gefunden.");
        return;
    }

    // Farbe setzen
    devices.forEach(device => {
        try {
            SendSolidColor(device, forcedColor.r, forcedColor.g, forcedColor.b);
        } catch (err) {
            console.log(`Fehler beim Setzen der Farbe auf ${device.name}: ${err}`);
        }
    });
}

export function Shutdown() {
    console.log("🛑 WindowsColor Addon gestoppt.");
    // LEDs ausschalten
    const devices = signalrgb.devices;
    devices.forEach(device => {
        SendSolidColor(device, 0, 0, 0);
    });
}

// --------------------------- Hilfsfunktionen ---------------------------
function SendSolidColor(device, r, g, b) {
    const packet = [0x53, 0x5A,
        0x30, 0x30,
        0x00, 0x00, // buffer mode
        0x00, 0x00, 0x00, 0x23, // size
        0x00, 0x00, 0x00, 0x00, // security
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x22, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x24, 0x06,
        0x02, 0xFF,
        0x00, r, g, b
    ];

    udp.send(device.ip, device.port, packet);
}

// Dummy-Funktion: Windows-Farbe auslesen
function getWindowsAccentColor() {
    // Später ersetzen mit Registry- oder UWP-Abfrage
    // Für Test aktuell kräftiges Blau
    return { r: 0, g: 100, b: 255 };
}
