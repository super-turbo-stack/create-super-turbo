import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";

const theme = {
  cursor: "#eff0eb",
  cursorAccent: "#00000000",
  foreground: "#eff0eb",
  background: "#ffffff00",
  red: "#ff5c57",
  green: "#5af78e",
  yellow: "#f3f99d",
  blue: "#57c7ff",
  magenta: "#ff6ac1",
  cyan: "#9aedfe",
  white: "#f1f1f0",
  brightBlack: "#686868",
  brightRed: "#ff5c57",
  brightGreen: "#5af78e",
  brightYellow: "#f3f99d",
  brightBlue: "#57c7ff",
  brightMagenta: "#ff6ac1",
  brightCyan: "#9aedfe",
  brightWhite: "#f1f1f0",
  selectionBackground: "#97979b33",
};

export function createTerminal(element: HTMLPreElement) {
  const terminal = new Terminal({
    convertEol: true,
    cursorBlink: false,
    disableStdin: false,
    theme,
    fontSize: 14,
    fontFamily: "Menlo, courier-new, courier, monospace",
  });

  terminal.open(element);

  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  terminal.loadAddon(new WebLinksAddon());

  fitAddon.fit();

  return terminal;
}
