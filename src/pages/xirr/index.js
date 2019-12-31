import xirr from 'xirr'
import {Button, Collapse, notification, Popover, Row, Table} from "antd";
import {
  columnRender,
  col,
  demo,
  multiply,
  days,
  dayTexts,
  sourceCol,
  dateFormatIn, dateFormatOut
} from "../../utils/table";
import moment from "moment";
import numeral from 'numeral';
import React from "react";
import lodash from "lodash";
import styles from './index.css';
import {EditableTable} from "@/components/add";

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
    let source = lodash.cloneDeep(this.state.source);
    source.forEach(item => {
      item.when = moment(item.date, dateFormatIn).toDate();
      item.amount = Number(item.amount)
    });

    const len = source.length - 1;
    let lastAmount = source[len].amount;
    let lastDate = source[len].date;
    let columns = lodash.cloneDeep(col);
    let dataSource = [];
    for (let i = 0; i < days.length; i++) {
      let text = moment(lastDate, dateFormatIn).add(days[i], 'd').format(dateFormatOut);
      columns.push({
        dataIndex: text, key: text, title: `${text}(${dayTexts[i]})`, render: columnRender, align: 'center'
      })
    }

    for (let i of multiply) {
      let text = lastAmount * i;
      source[len].amount = text;
      let obj = {key: i, index: text};
      for (let j of days) {
        let m = moment(lastDate, dateFormatIn).add(j, 'd');
        let t = m.format(dateFormatOut);
        source[len].when = m.toDate();
        try {
          obj[t] = numeral(xirr(source)).format('0,0.000%');
        } catch (e) {
          obj[t] = '-';
          notification.open({
            message: '提示:',
            description: e.message,
          });
          console.log(e.stack);
        }
      }
      dataSource.push(obj);
    }
    this.setState({columns, dataSource});
  };
  add = (source = []) => {
    this.setState({source}, () => this.calcXIRR())
  };
  showDemo = () => {
    this.setState({source: demo}, () => this.calcXIRR())
  };

  render() {
    const {columns, dataSource, source} = this.state;
    const content = (
      <div>
        <Table columns={sourceCol} dataSource={source} pagination={false} size={'small'} bordered={true}/>
      </div>
    );
    return (
      <div className={styles.normal}>
        <Row className={styles.row}>
          <Button> <a href={'index.html'}>返回</a></Button>
          <Popover content={content} title="">
            <Button type="primary">查看源数据</Button>
          </Popover>
          <Button type={'primary'} onClick={this.showDemo}>Demo</Button>
        </Row>
        <Table columns={columns} dataSource={dataSource} pagination={false} bordered={true} size={'small'}
               className={styles.table}/>
        <Collapse defaultActiveKey={['1']} className={styles.collapse}>
          <Collapse.Panel header="编辑数据" key="1" className={styles.panel}>
            <EditableTable dataSource={source} onOk={this.add}/>
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  }
}
