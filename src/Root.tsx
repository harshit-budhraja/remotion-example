import './tailwind.css';
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  // Get query parameters from URL
  const searchParams = new URLSearchParams(window.location.search);
  let email = searchParams.get('email');

  if (email === "" || email === null) {
    email = "dimahbi494@disipulo.com";
  }

  return (
    <Composition
      id="MyComp"
      component={MyComposition}
      durationInFrames={120}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        email
      }}
    />
  );
};
