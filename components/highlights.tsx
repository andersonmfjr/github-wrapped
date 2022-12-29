import React from "react";
import { User, Stat } from "../types/common";
import Hide from "./hide";

/**
 * Fetch and display the user's top highlights
 * @returns {element} div with text
 */
function Highlights({ user, hidden, setHidden, showHide }: Stat) {
  const stat: keyof User = "commits";

  if (hidden.includes(stat)) return <></>;

  // Size the text according to the number
  const numberToFontSize = (count: number): string => {
    let order = Math.floor(Math.log(count));

    // Medium to 9xl (maximum in Tailwind)
    if (!order || order === 0) return "text-lg";
    else if (order <= 2) return "text-2xl";
    else if (order <= 3) return "text-4xl";
    else if (order <= 4) return "text-4xl";
    else if (order <= 5) return "text-4xl";
    else if (order <= 6) return "text-5xl";
    else return "text-5xl";
  };

  // Stats to render
  let stats = [
    {
      count: user.commits,
      fontSize: "text-lg",
      tagline: "You have no commitment issues",
      title: "Commits",
      colour: "text-blue-600",
    },
    {
      count: user.contributions,
      fontSize: "text-lg",
      tagline: "You put in the work",
      title: "Contributions",
      colour: "text-yellow-600",
    },
    {
      count: user.repos,
      fontSize: "text-lg",
      tagline: "You code far and wide",
      title: "Repositories",
      colour: "text-orange-600",
    },
    {
      count: user.pulls,
      fontSize: "text-lg",
      tagline: "You pull your own weight",
      title: "Pull requests",
      colour: "text-indigo-600",
    },
    {
      count: user.reviews,
      fontSize: "text-lg",
      tagline: "You're a good friend",
      title: "Pull reviews",
      colour: "text-green-600",
    },
  ];

  // Get font size for each stat
  stats.map((stat) => (stat.fontSize = numberToFontSize(stat.count)));

  return (
    <div>
      <div className="text-center text-gray-100 p-5 space-y-1.5 absolute top-5 right-0 left-0">
        <div
          className={
            "flex items-baseline font-bold tracking-tighter transition-all ease-out text-sm justify-center"
          }
        >
          <h3 className="text-center">GitHub</h3>
          <h3 className={"font-mono pl-2 pr-2 text-indigo-600"}>Wrapped</h3>
          <h3 className="text-center">2022</h3>
        </div>

        {user.username && (
          <div>
            <p className="text-3xl text-white space-x-2 transition-all duration-1000 ease-in items-baseline">
              <span className="font-mono">{user.username}</span>
            </p>
          </div>
        )}
      </div>
      <div className="p-5 text-left group relative">
        <h1 className="text-gray-200 font-medium text-xl mb-2">
          {/* {["Highlights", "Overview", "In a nutshell"][~~(Math.random() * 3)]} */}
          In a nutshell
        </h1>

        <div className="grid grid-cols-2 items-end gap-5 text-white">
          {stats.map(
            (stat) =>
              stat.count > 0 && (
                <div key={stat.title}>
                  <p className={`${stat.fontSize} ${stat.colour} font-mono`}>
                    {stat.count}
                  </p>
                  <p className="text-gray-400 leading-none">{stat.title}</p>
                </div>
              )
          )}
        </div>
        {showHide && (
          <Hide stat={stat} user={user} hidden={hidden} setHidden={setHidden} />
        )}
      </div>
    </div>
  );
}

export default Highlights;
