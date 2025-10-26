let interval;

export function onStart() {
  console.log("✅ Windows Accent Color Sync Add-on gestartet!");

  interval = setInterval(() => {
    const devices = signalrgb.devices;
    const color = { r: 0, g: 100, b: 255 }; // Testfarbe

    devices.forEach(device => {
      try {
        device.setColor(color.r, color.g, color.b);
      } catch (err) {
        console.log(`Fehler beim Setzen der Farbe auf ${device.name}: ${err}`);
      }
    });
  }, 1000); // alle 1 Sekunde aktualisieren
}

export function onStop() {
  console.log("🛑 Add-on gestoppt.");
  clearInterval(interval);
}
