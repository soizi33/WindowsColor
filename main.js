// main.js

import * as os from "os";
import { execSync } from "child_process";

// --------------------------- Addon Infos ---------------------------
export function Name() { return "WindowsColor"; }
export function Version() { return "1.1.0"; }
export function Type() { return "software"; }
export function Publisher() { return "Soizi33"; }

let forcedColor = { r: 0, g: 0, b: 0 };

// --------------------------- Lifecycle ---------------------------
export function Initialize() {
    console.log("✅ WindowsColor Addon gestartet!");
}

export function Render() {
    // Windows-Farbe auslesen
    forcedColor = getWindowsAccentColor();

    const devices = signalrgb.devices;
    if (!devices || devices.length === 0) {
        console.log("⚠️ Keine Geräte gefunden.");
        return;
    }

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
    const devices = signalrgb.devices;
    devices.forEach(device => {
        SendSolidColor(device, 0, 0, 0);
    });
}

// --------------------------- Hilfsfunktionen ---------------------------
function SendSolidColor(device, r, g, b) {
    const packet = [0x53, 0x5A,
        0x30, 0x30,
        0x00, 0x00,
        0x00, 0x00, 0x00, 0x23,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x22, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x24, 0x06,
        0x02, 0xFF,
        0x00, r, g, b
    ];

    udp.send(device.ip, device.port, packet);
}

// Liest die Windows-Akzentfarbe aus der Registry
function getWindowsAccentColor() {
    try {
        const output = execSync(
            'reg query "HKCU\\Software\\Microsoft\\Windows\\DWM" /v AccentColor',
            { encoding: 'utf8' }
        );

        const match = output.match(/0x([0-9a-fA-F]{8})/);
        if (match) {
            const hex = parseInt(match[1], 16);
            // DWORD BGR -> RGB
            const b = (hex & 0xFF);
            const g = (hex >> 8) & 0xFF;
            const r = (hex >> 16) & 0xFF;
            return { r, g, b };
        }
    } catch (err) {
        console.log("⚠️ Fehler beim Auslesen der Windows-Farbe:", err);
    }

    // Fallback-Farbe
    return { r: 0, g: 100, b: 255 };
}
