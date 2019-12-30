import styles from './index.css';
import xirr from 'xirr'
import {Table} from "antd";
import {columnRender, columns, dateFormat, multiply} from "../../utils/table";
import moment from "moment";
import numeral from 'numeral';
import React, {useEffect, useState} from "react";

export default function () {
  let [dataSource,setDataSource] = useState([]);
  useEffect(() => {
    let source = [
      {amount: -1000, when: new Date(2016, 0, 15)},
      {amount: -2500, when: new Date(2016, 1, 8)},
      {amount: -1000, when: new Date(2016, 3, 17)},
      {amount: 5050, when: new Date(2016, 7, 24)},
    ];
    const len = source.length - 1;
    let lastAmount = source[len].amount;
    let lastDate = source[len].when;
    for (let i = 0; i <= 14; i++) {
      let text = moment(lastDate).add(i, 'd').format(dateFormat);
      columns.push({
        dataIndex: text, key: text, title: text,render:columnRender
      })
    }
    let dataSource = [];
    for (let i of multiply) {
      let text = lastAmount * i;
      source[len].amount = text;
      let obj = {key: i, index: text};
      for (let i = 0; i <= 14; i++) {
        let m = moment(lastDate).add(i, 'd');
        let t = m.format(dateFormat);
        source[len].when = m.toDate();
        obj[t] = numeral(xirr(source)).format('0,0.000%');
      }
      dataSource.push(obj);
    }
    setDataSource(dataSource);
  },[]);
  return (
    <div className={styles.normal}>
      <Table columns={columns} dataSource={dataSource} pagination={false} size={'small'}/>
    </div>
  );
}
