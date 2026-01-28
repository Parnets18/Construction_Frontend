import { useEffect } from "react";
import MissionVisionValues from "./MissionVisionValues";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <MissionVisionValues />
    </>
  );
};

export default About;
