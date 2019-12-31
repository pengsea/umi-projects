import React from "react";
import {Tag} from "antd";import numeral from 'numeral';
export const sourceCol = [
  {dataIndex: 'amount', title: '数量', key: 'amount'},
  {dataIndex: 'date', title: '日期', key: 'date'},
];
export const col = [
  {dataIndex: 'index', title: '', key: 'index',render:text=>numeral(text).format('0,0.00')}
];
export const dateFormatIn = 'YYYY/M/D';
export const dateFormatOut = 'YY/M/D';
export const days = [0, 1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 60, 90, 180, 270, 360];
export const dayTexts = ['当天', '1天', '2天', '3天', '4天', '5天', '6天', '1周', '2周', '3周', '1月', '2月', '1季',
  '2季', '3季', '1年'];
export const multiply = [0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1, 1.01, 1.02, 1.03, 1.04, 1.05,
  1.06, 1.07, 1.08, 1.09, 1.1];
export const columnRender = (text, record) => {
  if (record.key === 1) {
    return <Tag color="#108ee9">{text}</Tag>
  } else {
    return text;
  }
};
export const demo = [
  { key: '0',amount: -1000, date:'2016/1/15'},
  { key: '1',amount: -2500, date:'2016/2/8' },
  { key: '2',amount: -1000, date:'2016/4/17'},
  { key: '3',amount: 5050, date:'2016/8/24'},
];
