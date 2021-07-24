/* DarkButton
 * Author: cainmagi@gmail.com
 */
import React, {useEffect, useState} from 'react';

import Link from '@docusaurus/Link';
import { Icon, InlineIcon } from "@iconify/react";
import useThemeContext from '@theme/hooks/useThemeContext'; //docs: https://v2.docusaurus.io/docs/2.0.0-alpha.69/theme-classic#usethemecontext


const useButtonTheme = () => {
  const {isDarkTheme} = useThemeContext();
  if (isDarkTheme) {
    return "button--secondary button--outline";
  }
  else {
    return "button--secondary";
  }
};


function DarkButton(props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const curStyle = useButtonTheme();

  let className;
  if (props.index) {
    className = `button ${curStyle} button--lg button--index`;
  } else {
    className = `button ${curStyle} button--lg`;
  }

  return (
     <Link
      key={String(mounted)}
      className={className}
      to={props.to}>
      {props.icon &&
        <InlineIcon icon={props.icon} width='1.35rem' style={{"verticalAlign": "-0.3rem", "marginRight": "1ex"}} />
      }{props.children}
    </Link>
  );
}


export default DarkButton;
