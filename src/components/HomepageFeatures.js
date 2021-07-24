import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import IconExternalLink from '@theme/IconExternalLink';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Python without depdencies',
    Svg: require('../../static/img/icon_python.svg').default,
    description: (
      <>
        Implemented by the <Link href="https://docs.python.org/3/c-api/index.html" label="Python-C-API">Python-C-API<IconExternalLink /></Link>. This feature has been included in stdlib. No matter when you need to compile or use this package, the only dependency is <Link href="https://numpy.org" label="numpy">Numpy<IconExternalLink /></Link>.
      </>
    ),
  },
  {
    title: 'Fully based on FFMpeg',
    Svg: require('../../static/img/icon_ffmpeg.svg').default,
    description: (
      <>
        Combine the shared-lib-enabled <Link href="https://ffmpeg.org" label="FFMpeg">FFMpeg<IconExternalLink /></Link> and <Link href="https://numpy.org" label="numpy">Numpy<IconExternalLink /></Link> together. Both the two libraries are not modifed. Users could benefit from user-friendly Numpy APIs and all FFMpeg features.
      </>
    ),
  },
  {
    title: 'Compiled by C++',
    Svg: require('../../static/img/icon_cpp.svg').default,
    description: (
      <>
        Compiled by C++ on both Windows and Linux. The Win version and the Linux version are compiled by VC++ and G++ respectively. All source codes of this project are open-sourced by <Link href="https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/master/LICENSE" label="GPL v3">GPL v3 License<IconExternalLink /></Link>.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--left padding-horiz--md">
        <h3 className="text--center">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
