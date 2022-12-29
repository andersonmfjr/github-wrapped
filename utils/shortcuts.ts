import { User } from "../types/common";
import Mousetrap from "mousetrap";
import { copyImage, copyPublicLink, download } from "./exports";
import { isMacOS } from "./utils";

// To use ⌘ on MacOS and ctrl on Windows/Linux
const macOS = isMacOS();
const cmdOrCtrl = macOS ? "command" : "ctrl";

/**
 * Add keyboard shortcuts here! They'll be bound in
 * Mousetrap below and can be accessed in tooltips.
 */
export const SHORTCUTS = {
  save: {
    sequence: `${cmdOrCtrl}+s`,
    method: (e, user) => {
      e.preventDefault();
      download(user);
    },
  },
  copyImage: {
    sequence: `${cmdOrCtrl}+c`,
    method: (e, user) => {
      e.preventDefault();
      copyImage();
    },
  },
  copyURL: {
    sequence: `${cmdOrCtrl}+shift+c`,
    method: async (e, user) => {
      e.preventDefault();
      copyPublicLink(user);
    },
  },
  konami: {
    sequence: "up up down down left right left right b a enter",
    method: () => console.log("C-C-C-COMBO BREAKER"),
  },
};

/**
 * Initializes keyboard shortcuts
 */
export function initShortcuts(user: User) {
  Object.values(SHORTCUTS).map((shortcut) =>
    Mousetrap.bind(shortcut.sequence, (e) => shortcut.method(e, user))
  );
}
