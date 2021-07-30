/**
 * Modified from Docusaurus official versions.js
 * Copyright (c) Yuchen Jin and its affiliates.
 * Original author: Facebook, Inc. and its affiliates.
 */

import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import InlineIcon from '@site/src/components/InlineIcon';
import mdiFileDocumentMultipleOutline from '@iconify-icons/mdi/file-document-multiple-outline';
import octTag16 from '@iconify-icons/octicon/tag-16';

import { useVersions, useLatestVersion } from '@theme/hooks/useDocs';

import Translate, { translate } from '@docusaurus/Translate';

function Version() {
  const { siteConfig } = useDocusaurusContext();
  const versions = useVersions();
  const latestVersion = useLatestVersion();
  const currentVersion = versions.find((version) => version.name === 'current');
  const pastVersions = versions.filter(
    (version) => version !== latestVersion && version.name !== 'current',
  );
  const repoUrl = `https://github.com/${siteConfig.organizationName}/FFmpeg-Encoder-Decoder-for-Python`;

  return (
    <Layout
      title="Versions"
      description="Docusaurus 2 Versions page listing all documented site versions">
      <main className="container margin-vert--lg">
        <h1><Translate id='versions.title' description='Title text in the version page.' values={{title: <code>{siteConfig.title}</code>}}>{'{title} documentation versions'}</Translate></h1>

        {latestVersion && (
          <div className="margin-bottom--lg">
            <h3 id="next"><Translate id='versions.current.head' description='Head of the current version.'>Current version (Stable)</Translate></h3>
            <p>
              <Translate id='versions.current.descr' description='Description of the current version.'>
                Here you can find the documentation for current released version.
              </Translate>
            </p>
            <table>
              <thead>
                <tr>
                  <th><Translate id='versions.table.version' description='Table item: version.'>Version</Translate></th>
                  <th><Translate id='versions.table.docs' description='Table item: version.'>Documentation</Translate></th>
                  <th><Translate id='versions.table.relwin' description='Table item: version.'>Release (Win)</Translate></th>
                  <th><Translate id='versions.table.rellinux' description='Table item: version.'>Release (Linux)</Translate></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{latestVersion.label}</th>
                  <td align='center'>
                    <Link to={latestVersion.path}>
                      <InlineIcon icon={mdiFileDocumentMultipleOutline}/>
                    </Link>
                  </td>
                  <td align='center'>
                    <Link href={`${repoUrl}/releases/tag/${latestVersion.name}`}>
                      <InlineIcon icon={octTag16}/>
                    </Link>
                  </td>
                  <td align='center'>
                    <Link href={`${repoUrl}/releases/tag/${latestVersion.name}-linux`}>
                      <InlineIcon icon={octTag16}/>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {(pastVersions.length > 0) && (
          <div className="margin-bottom--lg">
            <h3 id="archive">
              <Translate id='versions.prev.head' description='Head of the previous version.'>
                Past versions (Not maintained anymore)
              </Translate>
            </h3>
            <p>
              <Translate id='versions.prev.descr' description='Description of the previous version.' values={{title: <code>{siteConfig.title}</code>}}>
                {'Here you can find documentation for previous versions of {title}.'}
              </Translate>
            </p>
            <table>
              <thead>
                <tr>
                  <th><Translate id='versions.table.version' description='Table item: version.'>Version</Translate></th>
                  <th><Translate id='versions.table.docs' description='Table item: version.'>Documentation</Translate></th>
                  <th><Translate id='versions.table.relwin' description='Table item: version.'>Release (Win)</Translate></th>
                  <th><Translate id='versions.table.rellinux' description='Table item: version.'>Release (Linux)</Translate></th>
                </tr>
              </thead>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td align='center'>
                      <Link to={version.path}>
                        <InlineIcon icon={mdiFileDocumentMultipleOutline}/>
                      </Link>
                    </td>
                    <td align='center'>
                      <Link href={`${repoUrl}/releases/tag/${version.name}`}>
                        <InlineIcon icon={octTag16}/>
                      </Link>
                    </td>
                    <td align='center'>
                      <Link href={`${repoUrl}/releases/tag/${version.name}-linux`}>
                        <InlineIcon icon={octTag16}/>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentVersion !== latestVersion && (
          <div className="margin-bottom--lg">
            <h3 id="latest">Next version (Unreleased)</h3>
            <p>
              Here you can find the documentation for work-in-process unreleased
              version.
            </p>
            <table>
              <thead>
                <tr>
                  <th><Translate id='versions.table.version' description='Table item: version.'>Version</Translate></th>
                  <th><Translate id='versions.table.docs' description='Table item: version.'>Documentation</Translate></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{currentVersion.label}</th>
                  <td align='center'>
                    <Link to={currentVersion.path}>
                      <InlineIcon icon={mdiFileDocumentMultipleOutline}/>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
}

export default Version;
