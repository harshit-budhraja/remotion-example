import './tailwind.css';
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

const defaultProps = {
  unfake: {
    name: "Unfake",
    repo: "unfake.dev",
    logo: "https://ik.imagekit.io/oq1pyotaq/unfake/unfake-logo-shield.png",
  },
  react: {
    name: "React",
    repo: "facebook/react",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  imagekit: {
    name: "ImageKit",
    repo: "imagekit.io",
    logo: "https://pbs.twimg.com/profile_images/1394248978456190986/VdHMA6Oh_400x400.jpg",
  },
  typescript: {
    name: "TypeScript",
    repo: "microsoft/TypeScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  },
  javascript: {
    name: "JavaScript",
    repo: "javascript/javascript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
  },
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        defaultProps={defaultProps.react}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
