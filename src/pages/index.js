import styles from './index.css';
import React from "react";
import {icp} from "@/utils/utils";
export default function() {
  return (
    <div className={styles.normal}>
      <a href={'#/xirr'}>XIRR</a>
      <hr/>
      <a href={'#/snow'}>SNOW</a>
      <hr/>
      <footer className={styles.footer}><a href={'http://www.beian.miit.gov.cn'} target={'_blank'}>{icp}</a></footer>
    </div>
  );
}
