import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import IconExternalLink from '@theme/IconExternalLink';
import styles from './HomepageFeatures.module.css';

import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: translate({id: 'index.feat.python.title', description: 'Feature title for Python-C-API.', message: 'Python without depdencies'}),
    Svg: require('../../static/img/icon_python.svg').default,
    description: (
      <>
        <Translate id='index.feat.python.descr' description='Feature description for Python-C-API.' values={{python: <Link href="https://docs.python.org/3/c-api/index.html" label="Python-C-API">Python-C-API<IconExternalLink /></Link>, numpy: <Link href="https://numpy.org" label="numpy">Numpy<IconExternalLink /></Link>}}>{'Implemented by the {python}. This feature has been included in stdlib. No matter when you need to compile or use this package, the only dependency is {numpy}.'}</Translate>
      </>
    ),
  },
  {
    title: translate({id: 'index.feat.ffmpeg.title', description: 'Feature title for FFMpeg.', message: 'Fully based on FFMpeg'}),
    Svg: require('../../static/img/icon_ffmpeg.svg').default,
    description: (
      <>
        <Translate id='index.feat.ffmpeg.descr' description='Feature description for FFMpeg.' values={{ffmpeg: <Link href="https://ffmpeg.org" label="FFMpeg">FFMpeg<IconExternalLink /></Link>, numpy: <Link href="https://numpy.org" label="numpy">Numpy<IconExternalLink /></Link>}}>{'Combine the shared-lib-enabled {ffmpeg} and {numpy} together. Both the two libraries are not modifed. Users could benefit from user-friendly Numpy APIs and all FFMpeg features.'}</Translate>
      </>
    ),
  },
  {
    title: translate({id: 'index.feat.cpp.title', description: 'Feature title for CPP11.', message: 'Compiled by C++'}),
    Svg: require('../../static/img/icon_cpp.svg').default,
    description: (
      <>
        <Translate id='index.feat.cpp.descr' description='Feature description for CPP11.' values={{license: <Link href="https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/master/LICENSE" label="GPL v3">GPL v3 License<IconExternalLink /></Link>}}>{'Compiled by C++ on both Windows and Linux. The Win version and the Linux version are compiled by VC++ and G++ respectively. All source codes of this project are open-sourced by {license}.'}</Translate>
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
