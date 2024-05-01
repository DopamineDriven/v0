import gradient from "gradient-string";

const poimandresTheme = {
  blue: "#add7ff",
  cyan: "#89ddff",
  green: "#5de4c7",
  magenta: "#fae4fc",
  red: "#d0679d",
  yellow: "#fffac2"
} as const;

export const renderTitle = () => {
  const codemodGradient = gradient(Object.values(poimandresTheme));
  console.log(codemodGradient.multiline(TITLE_TEXT));
};
// const userAgent = process.env.npm_config_user_agent;
// console.log(userAgent);

// prettier-ignore
export const TITLE_TEXT = `
      $$\\       $$\\                           $$\\                                         $$\\
      $$ |      $$ |                          $$ |                                        $$ |
 $$$$$$$ | $$$$$$$ | $$$$$$$\\  $$$$$$\\   $$$$$$$ | $$$$$$\\  $$$$$$\\$$$$\\   $$$$$$\\   $$$$$$$ |
$$  __$$ |$$  __$$ |$$  _____|$$  __$$\\ $$  __$$ |$$  __$$\\ $$  _$$  _$$\\ $$  __$$\\ $$  __$$ |
$$ /  $$ |$$ /  $$ |$$ /      $$ /  $$ |$$ /  $$ |$$$$$$$$ |$$ / $$ / $$ |$$ /  $$ |$$ /  $$ |
$$ |  $$ |$$ |  $$ |$$ |      $$ |  $$ |$$ |  $$ |$$   ____|$$ | $$ | $$ |$$ |  $$ |$$ |  $$ |
\\$$$$$$$ |\\$$$$$$$ |\\$$$$$$$\\ \\$$$$$$  |\\$$$$$$$ |\\$$$$$$$\\ $$ | $$ | $$ |\\$$$$$$  |\\$$$$$$$ |
 \\_______| \\_______| \\_______| \\______/  \\_______| \\_______|\\__| \\__| \\__| \\______/  \\_______|
`;
