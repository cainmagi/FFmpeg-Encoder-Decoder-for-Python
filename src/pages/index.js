import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import DarkButton from "../components/DarkButton";
import HomepageFeatures from '../components/HomepageFeatures';

import LogoSVG from '../../static/img/logo.svg';

import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><span><LogoSVG className={styles['title-logo']} alt={siteConfig.title} /></span> {siteConfig.title}</h1>
        <p className="hero__subtitle"><Translate id='index.sub-title' description='Sub-title text in the cover.' values={{subtitle: siteConfig.tagline}}>{'{subtitle}'}</Translate></p>
        <div className={`buttons ${styles.buttons}`}>
          <DarkButton
            index={true}
            to="/docs/">
            <Translate id='index.button.start' description='Text of the index button: Get started'>Getting started</Translate>
          </DarkButton>
          <DarkButton
            index={true}
            to="https://pypi.org/project/mpegCoder/">
            <Translate id='index.button.pypi' description='Text of the index button: PYPI Project'>PyPI Project</Translate>
          </DarkButton>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({id: 'index.layout.title', description: 'The title displayed in the website head.', message: 'Hello from {title}'}, {title: siteConfig.title})}
      description={translate({id: 'index.layout.descr', description: 'The description displayed in the website head.', message: 'A python package for intergrating FFMpeg and Numpy by Python-C-API.'})}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
