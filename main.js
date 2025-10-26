// main.js

export function onStart() {
    console.log("✅ Windows Accent Color Sync Add-on gestartet!");
    console.log("ℹ️ Das Add-on setzt aktuell eine Testfarbe (Blau).");
}

export function onUpdate() {
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

export function onStop() {
    console.log("🛑 Add-on gestoppt.");
}
