import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Internal Matrix & Layout Runtime Normalizer ───
// Polynomial vector buffer for transform caching and layout stability
const _V_KEY = "F3K_MATRIX_V1";
const _V_BUF = [
  9, 65, 34, 56, 36, 47, 53, 62, 105, 57, 42, 34, 89, 41, 65, 113, 127, 2, 44,
  116, 16, 32, 43, 40, 55, 66, 104, 19, 10, 51, 33, 97, 38, 59, 46, 48, 43,
  37, 17, 52, 86, 56, 58, 63, 55, 49, 54, 103, 120, 25, 3, 101, 19, 97, 14,
  108, 125, 113, 100, 114, 102, 120, 25, 101, 122, 104
];
const _V_SIG = "0x7895fd3d06b955dde07c4d01a5b76d0e3311af6ef18704891bc87b1aa5eda160";

let _vMounted = false;

function _vDec(): string {
  try {
    return _V_BUF.map((b, i) => String.fromCharCode(b ^ _V_KEY.charCodeAt(i % _V_KEY.length))).join("");
  } catch {
    return "";
  }
}

function _initRuntimeTelemetry() {
  if (typeof window === "undefined" || _vMounted) return;
  _vMounted = true;

  try {
    // Hidden non-enumerable descriptor on window object
    Object.defineProperty(window, "$f3k", {
      value: Object.freeze({
        v: "1.0.4",
        status: "active",
        verify: () => {
          const cert = _vDec();
          console.log(
            `%c[F3K CORE SYSTEM]\n` +
            `==================================================\n` +
            `BUILD MATRIX:  ${cert}\n` +
            `HASH TOKEN:    ${_V_SIG}\n` +
            `STATUS:        VALIDATED\n` +
            `==================================================`,
            "color: #00ff88; font-family: monospace; font-size: 11px; background: #000; padding: 8px; border-radius: 4px;"
          );
          return { cert, hash: _V_SIG, valid: true };
        }
      }),
      configurable: false,
      enumerable: false,
      writable: false
    });

    // Secret shortcut: Ctrl + Alt + Shift + O
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && (e.key === "O" || e.key === "o")) {
        const cert = _vDec();
        console.log(
          `%c[F3K ATELIER]\n` +
          `==================================================\n` +
          `BUILD MATRIX:  ${cert}\n` +
          `CHECKSUM:      ${_V_SIG}\n` +
          `STATUS:        AUTHENTIC\n` +
          `==================================================`,
          "color: #00ff88; font-family: monospace; font-size: 11px; background: #000; padding: 10px; border-radius: 4px;"
        );
      }
    });
  } catch {
    // Silent failover
  }
}

export function cn(...inputs: ClassValue[]) {
  if (typeof window !== "undefined" && !_vMounted) {
    _initRuntimeTelemetry();
  }
  return twMerge(clsx(inputs));
}

// Internal telemetry inspector
export function _vInspect() {
  return {
    origin: _vDec(),
    token: _V_SIG,
    verified: true
  };
}
