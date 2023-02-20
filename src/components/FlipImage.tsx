import Image from "next/image";
import { useEffect, useState } from "react";
import fetcher from "./fetcher";

const FlipImage = () => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    let interval = setInterval(() => {
      fetcher("/api/count").then((data) => {
        setImage(data.image);
      });
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Image src={image} alt={""} width={640} height={480} />
    </div>
  );
};
export default FlipImage;
