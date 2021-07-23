import React, {useEffect, useState} from 'react';

import { Icon, InlineIcon } from "@iconify/react";


function InlineIconM(props) {
  return (
    <InlineIcon icon={props.icon} width='1.35rem' style={{"verticalAlign": "-0.4rem"}} />
  );
}


export default InlineIconM;
