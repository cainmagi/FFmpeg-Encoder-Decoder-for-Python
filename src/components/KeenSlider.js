import React, { useCallback } from 'react';
import clsx from 'clsx';

import { useResizeDetector } from 'react-resize-detector';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.scss";
import styles from "./KeenSlider.module.scss";


function ArrowLeft(props) {
  const disabled = props.disabled ? " ${styles.disabled}" : ""
  return (
    <svg
      onClick={props.onClick}
      className={clsx([styles.arrow, styles.left, disabled])}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  )
};


function ArrowRight(props) {
  const disabled = props.disabled ? ` ${styles.disabled}` : ""
  return (
    <svg
      onClick={props.onClick}
      className={clsx([styles.arrow, styles.right, disabled])}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  )
};


function KeenSlider(props) {
  let sliderRes;
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: props.initial !== undefined ? props.initial : 0,
    slidesPerView: props.slidesPerView !== undefined ? props.slidesPerView : 1,
    spacing: props.spacing !== undefined ? props.spacing : 15,
    loop: props.loop !== undefined ? props.loop : true,
    centered: props.centered !== undefined ? props.centered : true,
    breakpoints: props.breakpoints !== undefined ? props.breakpoints : {
      "(min-width: 768px)": {
        slidesPerView: 2,
      },
      "(min-width: 1280px)": {
        slidesPerView: 3,
      },
      "(min-width: 1920px)": {
        slidesPerView: 4,
      },
    },
    slides: `.${styles.slideItem}`,
    created(s) {
      sliderRes=s;
    },
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  const onResize = useCallback(() => {
    if (sliderRes !== undefined && sliderRes !== null) {
      sliderRes.resize();
    }
  }, []);
  const { width, height, ref } = useResizeDetector({ onResize, handleWidth: true, handleHeight: false });

  return (
    <>
      <div ref={ref} className={styles.navigationWrapper}>
        <div ref={sliderRef} className="keen-slider">
          {props.children && (
            React.Children.map(props.children, child => {
              return (
                <div className={styles.slideItem}>
                  {child}
                </div>
              );
            })
          )}
        </div>
        {slider && (
          <>
            <ArrowLeft
              onClick={(e) => e.stopPropagation() || slider.prev()}
              disabled={false} //{currentSlide === 0}
            />
            <ArrowRight
              onClick={(e) => e.stopPropagation() || slider.next()}
              disabled={false} //{currentSlide === slider.details().size - 1}
            />
          </>
        )}
      </div>
      {slider && (
        <div className={styles.dots}>
          {Array.from(Array(slider.details().size).keys()).map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                className={clsx([styles.dot, (currentSlide === idx ? styles.active : "")])}
              />
            )
          })}
        </div>
      )}
    </>
  )
}


export default KeenSlider;
