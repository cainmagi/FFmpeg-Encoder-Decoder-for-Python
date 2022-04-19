/**
 * Environmental variables of this side.
 * Yuchen Jin, mailto:cainmagi@gmail.com
 */

import React from 'react';
import Link from '@docusaurus/Link';

const variables = {
  source_3_1_0: 'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/e5d48b9c65152a303eddccbe65dad8059d0556ae/MpegCoder',
  source_3_2_0: 'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/1553da11d08463ca7b007bcdd68685503da45a5f/MpegCoder'
};

function SourceURL(props) {
  let url;
  if (props.ver !== undefined ) {
    switch (props.ver) {
      case '3.2.0':
        url = variables.source_3_2_0 + '/' + props.url;
        break;
      case '3.1.0':
        url = variables.source_3_1_0 + '/' + props.url;
        break;
      default:
        url = variables.source_3_2_0 + '/' + props.url;
    }
  } else {
    url = variables.source_3_2_0 + '/' + props.url;
  }
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
