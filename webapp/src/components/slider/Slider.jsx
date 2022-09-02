import { Slide } from "react-slideshow-image";

import slideImages from "../../data/images";

import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";

export default function Slider() {
  return (
    <div className={styles.container} style={{ marginTop: '30px' }}>
      <Slide easing="ease">
        {slideImages.map((slide, index) => {
          return (
            <div className={styles.slide} key={slide}>
              <div style={{ backgroundImage: `url(${slideImages[index]})`, height: '350px' }}>
                {/* <span>Slide {index + 1}</span> */}
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}
