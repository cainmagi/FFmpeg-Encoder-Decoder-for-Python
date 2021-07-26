import React from 'react';
import styles from './FeatureCase.module.css';


function FeatureCase({Svg, title, children}) {
  return (
    <div>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--left padding-horiz--md">
        <h3 className="text--center">{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}


export default FeatureCase;
