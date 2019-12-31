import xirr from 'xirr'
import {Button, Modal, notification, Popover, Row, Table} from "antd";
import {columnRender, col, dateFormat, demo, multiply, days, dayTexts, sourceCol} from "../../utils/table";
import moment from "moment";
import numeral from 'numeral';
import React from "react";
import lodash from "lodash";
import styles from './index.css';
import {EditableTable} from "@/pages/xirr/add";

export default class XIRR extends React.Component {
  state = {
    source: [],
    columns: [],
    dataSource: [],
    addVisible: false,
  };

  componentDidMount() {
    notification.open({
      message: '提示:',
      description: '点击Demo按钮可以查看例子',
    });
  }

  calcXIRR = () => {
    try {
      let source = lodash.cloneDeep(this.state.source);
      source.map(item => {item.when = moment(item.date,dateFormat).toDate();item.amount=Number(item.amount)});

      const len = source.length - 1;
      let lastAmount = source[len].amount;
      let lastDate = source[len].date;
      let columns = lodash.cloneDeep(col);
      let dataSource = [];
      for (let i = 0; i < days.length; i++) {
        let text = moment(lastDate, dateFormat).add(days[i], 'd').format(dateFormat);
        columns.push({
          dataIndex: text, key: text, title: `${text}(${dayTexts[i]})`, render: columnRender
        })
      }

      for (let i of multiply) {
        let text = lastAmount * i;
        source[len].amount = text;
        let obj = {key: i, index: text};
        for (let j of days) {
          let m = moment(lastDate, dateFormat).add(j, 'd');
          let t = m.format(dateFormat);
          source[len].when = m.toDate();
          obj[t] = numeral(xirr(source)).format('0,0.000%');
        }
        dataSource.push(obj);
      }
      this.setState({columns, dataSource});
    }catch (e) {
      notification.open({
        message: '提示:',
        description: e.toString(),
      });
    }
  };
  toggleAddVisible = () => {
      this.setState(state => ({addVisible: !state.addVisible}),)
  };
  add = (source=[]) => {
      this.setState(state => ({addVisible: !state.addVisible,source}),()=>this.calcXIRR())
  };
  showDemo = () => {
    this.setState({source: demo}, () => this.calcXIRR())
  };

  render() {
    const {columns, dataSource, source, addVisible} = this.state;
    const content = (
      <div>
        <Table columns={sourceCol} dataSource={source} pagination={false} size={'small'}/>
      </div>
    );
    return (
      <div className={styles.normal}>
        <Row className={styles.row}>
          <Popover content={content} title="">
            <Button type="primary">源数据</Button>
          </Popover>
          <Button type={'primary'} onClick={this.toggleAddVisible}>编辑数据</Button>
          <Button type={'primary'} onClick={this.showDemo}>Demo</Button>
        </Row>
        <Table columns={columns} dataSource={dataSource} pagination={false} bordered={true} size={'small'} className={styles.table}/>
        {addVisible && <Modal visible={addVisible} onCancel={this.toggleAddVisible} footer={null}>
          <EditableTable dataSource={source} onOk={this.add}/>
        </Modal>}
      </div>
    );
  }
}
