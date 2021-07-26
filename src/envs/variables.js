/**
 * Environmental variables of this side.
 * Yuchen Jin, mailto:cainmagi@gmail.com
 */

import React from 'react';
import Link from '@docusaurus/Link';

const variables = {
  sourceURL: 'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/e5d48b9c65152a303eddccbe65dad8059d0556ae/MpegCoder'
};

function SourceURL(props) {
  let url = variables.sourceURL + '/' + props.url;
  return (
    <Link to={ url } className="noline">{ props.children }</Link>
  );
};

function Splitter(props) {
  return (
    <span style={{ 'padding': '0 ' + props.padx }}>·</span>
  );
};

Splitter.defaultProps = {
    padx: '1ex'
};

export {SourceURL, Splitter};
