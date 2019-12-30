import xirr from 'xirr'
import {Button, notification, Popover, Row, Table} from "antd";
import {columnRender, col, dateFormat, demo, multiply, days, dayTexts, sourceCol} from "../../utils/table";
import moment from "moment";
import numeral from 'numeral';
import React from "react";
import lodash from "lodash";
import styles from './index.css';

export default class XIRR extends React.Component {
  state = {
    source: [],
    columns: [],
    dataSource: [],
  };

  componentDidMount() {
    notification.open({
      message: '提示:',
      description: '点击Demo按钮可以查看例子',
    });
  }

  calcXIRR = () => {
    let source =  lodash.cloneDeep(this.state.source);
    source.map(item=>item.when=moment(item.date).toDate());

    const len = source.length - 1;
    let lastAmount = source[len].amount;
    let lastDate = source[len].date;
    let columns = lodash.cloneDeep(col);
    let dataSource = [];
    for (let i = 0; i < days.length; i++) {
      let text = moment(lastDate,dateFormat).add(days[i], 'd').format(dateFormat);
      columns.push({
        dataIndex: text, key: text, title: `${text}(${dayTexts[i]})`, render: columnRender
      })
    }

    for (let i of multiply) {
      let text = lastAmount * i;
      source[len].amount = text;
      let obj = {key: i, index: text};
      for (let j of days) {
        let m = moment(lastDate,dateFormat).add(j, 'd');
        let t = m.format(dateFormat);
        source[len].when = m.toDate();
        obj[t] = numeral(xirr(source)).format('0,0.000%');
      }
      dataSource.push(obj);
    }
    this.setState({columns, dataSource});
  };
  showDemo = () => {
    this.setState({source: demo}, () => this.calcXIRR())
  };

  render() {
    const {columns, dataSource,source} = this.state;
    const content = (
      <div>
        <Table columns={sourceCol} dataSource={source} pagination={false} size={'small'} rowKey={'date'}/>
      </div>
    );
    return (
      <div className={styles.normal}>
        <Row className={styles.row}>
          <Popover content={content} title="">
            <Button type="primary">源数据</Button>
          </Popover>
          <Button type={'primary'} onClick={this.showDemo}>Demo</Button>
        </Row>
        <Table columns={columns} dataSource={dataSource} pagination={false} size={'small'} className={styles.table}/>
      </div>
    );
  }
}
