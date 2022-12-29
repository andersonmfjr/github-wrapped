import { User } from "../types/common";
import { getByUsername, retakeScreenshot } from "../utils/exports";
import { Cross1Icon } from "@modulz/radix-icons";
import React from "react";
import Tooltip from "./tooltip";

interface IProps {
  stat: keyof User;
  user: User;
  hidden: any[];
  setHidden: any;
}

function Hide({ stat, user, hidden, setHidden }: IProps) {
  // Toggle hide
  function toggleHide() {
    // Add stat to hidden array
    setHidden([...hidden, stat]);

    // Check if user's data is already written to Supabase
    let checkUser = getByUsername(user.username);
    if (checkUser) {
      // Retake screenshot for link preview
      retakeScreenshot(user);
    }
  }

  return (
    <div className="absolute -top-1 -left-1">
      <Tooltip content="Hide this section">
        <button
          className="opacity-0 group-hover:opacity-100 transition p-2 bg-gray-800/90 hover:bg-gray-600/90 text-white text-sm rounded focus:outline-none"
          onClick={toggleHide}
        >
          <Cross1Icon />
        </button>
      </Tooltip>
    </div>
  );
}

export default Hide;
