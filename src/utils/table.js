import React from "react";
import {Tag} from "antd";

export const col = [
  {dataIndex: 'index', title: '', key: 'index'}
];
export const dateFormat = 'YYYY-MM-DD';
export const multiply = [0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1, 1.01, 1.02, 1.03, 1.04, 1.05,
  1.06, 1.07, 1.08, 1.09, 1.1];
export const columnRender = (text, record) => {
  if (record.key === 1) {
    return <Tag color="#108ee9">{text}</Tag>
  } else {
    return text;
  }
};
export const demo=  [
  {amount: -1000, when: new Date(2016, 0, 15)},
  {amount: -2500, when: new Date(2016, 1, 8)},
  {amount: -1000, when: new Date(2016, 3, 17)},
  {amount: 5050, when: new Date(2016, 7, 24)},
];
