import styles from './index.css';
import xirr from 'xirr'
import {Button, Row, Table} from "antd";
import {columnRender, col, dateFormat, demo, multiply} from "../../utils/table";
import moment from "moment";
import numeral from 'numeral';
import React from "react";
import lodash from "lodash";

export default class XIRR extends React.Component {
  state = {
    source: [],
    columns: [],
    dataSource: [],
  };

  componentDidMount() {

  }

  calcXIRR = () => {
    let {source} = this.state;
    const len = source.length - 1;
    let lastAmount = source[len].amount;
    let lastDate = source[len].when;
    let columns = lodash.cloneDeep(col);
    let dataSource = [];
    for (let i = 0; i <= 14; i++) {
      let text = moment(lastDate).add(i, 'd').format(dateFormat);
      columns.push({
        dataIndex: text, key: text, title: text, render: columnRender
      })
    }

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
    this.setState({columns, dataSource});
  };
  showDemo = () => {
    this.setState({source: lodash.cloneDeep(demo)}, () => this.calcXIRR())
  };

  render() {
    const {columns, dataSource} = this.state;
    return (
      <div className={styles.normal}>
        <Row className={styles.row}>
          <Button type={'primary'} onClick={this.showDemo}>Demo</Button>
        </Row>
        <Table columns={columns} dataSource={dataSource} pagination={false} size={'small'}/>
      </div>
    );
  }
}
