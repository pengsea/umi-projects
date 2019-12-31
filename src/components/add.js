import {Table, Input, Button, Popconfirm, Form, Row, Col, Tag} from 'antd';
import * as React from "react";
import moment from "moment";
import {dateFormatIn} from "@/utils/table";
import styles from "@/pages/xirr/index.css";

const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {};


  save = e => {
    const {record, handleSave} = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      handleSave({...record, ...values});
    });
  };

  renderCell = form => {
    this.form = form;
    const {dataIndex, record, title} = this.props;
    return <Form.Item style={{margin: 0}}>
      {form.getFieldDecorator(dataIndex, {
        rules: [
          {
            required: true,
            message: `${title} is required.`,
          },
        ],
        initialValue: record[dataIndex],
      })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}/>)}
    </Form.Item>
      ;
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '数量',
        dataIndex: 'amount',
        editable: true,
      },
      {
        title: '日期',
        dataIndex: 'date',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
              <Tag>删除</Tag>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: props.dataSource,
      count: props.dataSource.length,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({dataSource: dataSource.filter(item => item.key !== key)});
  };

  handleAdd = () => {
    const {count, dataSource} = this.state;
    const newData = {
      key: count,
      amount: `0`,
      date: moment().format(dateFormatIn),
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleOk = () => {
    const {dataSource} = this.state;
    this.props.onOk(dataSource);
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({dataSource: newData});
  };

  render() {
    const {dataSource} = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <Row type={'flex'} justify={'center'}>
        <Col>
          <Table pagination={false}
                 components={components}
                 className={styles.addTable}
                 bordered
                 dataSource={dataSource}
                 columns={columns}
          />
        </Col>
        <Col className={styles.buttons} offset={1}>
          <Button onClick={this.handleAdd} type="primary"> 添加一行 </Button>
          <Button onClick={this.handleOk} type="primary"> 计算 </Button>
        </Col>
      </Row>
    );
  }
}
