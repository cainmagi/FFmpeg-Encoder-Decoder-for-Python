import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import DarkButton from "../components/DarkButton";
import HomepageFeatures from '../components/HomepageFeatures';

import LogoSVG from '../../static/img/logo.svg';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><span><LogoSVG className={styles['title-logo']} alt={siteConfig.title} /></span> {siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={`buttons ${styles.buttons}`}>
          <DarkButton
            index={true}
            to="/docs/">
            Getting started
          </DarkButton>
          <DarkButton
            index={true}
            to="https://pypi.org/project/mpegCoder/">
            PyPI Project
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
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
