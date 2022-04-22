import React, { useCallback } from 'react';
import clsx from 'clsx';

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


const ResizePlugin = (slider) => {
  const observer = new ResizeObserver(function () {
    slider.update()
  })

  slider.on("created", () => {
    observer.observe(slider.container)
  })
  slider.on("destroyed", () => {
    observer.unobserve(slider.container)
  })
}


function KeenSlider(props) {
  let sliderRes;
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = React.useState(false)
  const itemSpacing = (props.spacing !== undefined ? props.spacing : 15)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: props.initial !== undefined ? props.initial : 0,
    loop: props.loop !== undefined ? props.loop : true,
    breakpoints: props.breakpoints !== undefined ? props.breakpoints : {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: itemSpacing },
      },
      "(min-width: 1440px)": {
        slides: { perView: 3, spacing: itemSpacing + 5 },
      },
      "(min-width: 1920px)": {
        slides: { perView: 3, spacing: itemSpacing + 15 },
      },
    },
    slides: {
      perView: (props.slidesPerView !== undefined ? props.slidesPerView : 1),
      origin: props.centered !== undefined ? (props.centered ? "center" : "auto") : "center",
      spacing: itemSpacing
    },
    selector: `.${styles.slideItem}`,
    created() {
      setLoaded(true)
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
  }, [ResizePlugin]);

  return (
    <>
      <div className={styles.navigationWrapper}>
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
        {loaded && instanceRef.current && (
          <>
            <ArrowLeft
              onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={false} //{currentSlide === 0}
            />
            <ArrowRight
              onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={false} //{currentSlide === instanceRef.current.track.details.slides.length - 1}
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className={styles.dots}>
          {Array.from(Array(instanceRef.current.track.details.slides.length).keys()).map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
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
