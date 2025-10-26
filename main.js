// main.js

export function onStart() {
  console.log("✅ Windows Accent Color Sync Add-on gestartet!");
  
  // Alle angeschlossenen Geräte holen
  const devices = signalrgb.devices;

  // Testfarbe: kräftiges Blau
  const color = { r: 0, g: 100, b: 255 };

  // Farbe auf alle Geräte anwenden
  devices.forEach(device => {
    try {
      device.setColor(color.r, color.g, color.b);
    } catch (err) {
      console.log(`Fehler beim Setzen der Farbe auf ${device.name}: ${err}`);
    }
  });

  console.log("🎨 Testfarbe angewendet!");
}

export function onStop() {
  console.log("🛑 Add-on gestoppt.");
}
