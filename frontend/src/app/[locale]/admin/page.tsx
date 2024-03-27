"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef } from "antd";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Table,
  Tabs,
  message,
} from "antd";
import { TabsProps } from "antd/lib";
import FormItem from "antd/es/form/FormItem";
import { AdminStore } from "@/store/admin store/adminstore.store";

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const App: React.FC = () => {
  //state
  const [dataSource, setDataSource] = useState<any>([]);
  const [form] = Form.useForm();
  const [tab_key, setTabKey] = useState<string>("1");
  const [repeat_data, setRepeatData] = useState<any>([]);
  const [scrap_data, setScrapData] = useState<any>([]);
  const [repeat_ng_data, setRepeatNgData] = useState<any>([]);


  const repeatAPI = [
    {
    key: '1',
    mode: "1",
    target_by_item: "2",
    category:"Repeat"
  },
  {
    key: '2',
    mode: "2",
    target_by_item: "29",
    category:"Repeat"
  },
  {
    key: '3',
    mode: "3",
    target_by_item: "22",
    category:"Repeat"
  },
];

  const scrapAPI = [
    {
    key: '1',
    mode: "X",
    target_by_item: "2",
    category:"Scrap"
  },
  {
    key: '2',
    mode: "Y",
    target_by_item: "12",
    category:"Scrap"
  },
  {
    key: '3',
    mode: "Z",
    target_by_item: "20",
    category:"Scrap"
  },
  ];

  const repeatNGAPI = [
    {
    key: '1',
    mode: "A",
    target_by_item: "2",
    category:"Repeat NG"
  },
  {
    key: '2',
    mode: "B",
    target_by_item: "0",
    category:"Repeat NG"
  },
  {
    key: '3',
    mode: "C",
    target_by_item: "3",
    category:"Repeat NG"
  },
  ];

  //store
  const setAdminData = AdminStore((state) => state.setdata);
  const admin_data_store = AdminStore((state) => state.data);

  //delete data in row
  const handleDelete = (key: React.Key) => {
    let currentData;
    if (tab_key === "1") {
      // if tab_key = 1
      currentData = [...repeat_data]; //recieve data clone use spread
    } else if (tab_key === "2") {
      currentData = [...scrap_data];
    } else if (tab_key === "3") {
      currentData = [...repeat_ng_data];
    } else {
      return;
    }
    //filter data not combine with data that you delete
    const updatedData = currentData.filter((item: any) => item.key !== key);
    if (tab_key === "1") {
      setRepeatData(updatedData);
      console.log("repeat_data");
    } else if (tab_key === "2") {
      setScrapData(updatedData);
      console.log("scrap_data");
    } else if (tab_key === "3") {
      setRepeatNgData(updatedData);
      console.log("repeat_ng_data");
    }
  };

  //table structure
  const defaultColumns = [
    {
      title: "Mode",
      dataIndex: "mode",
      width: "30%",
      editable: true,
    },
    {
      title: "Target by item",
      dataIndex: "target_by_item",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: { key: React.Key }) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  //body componets on table
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // stucture of tabs item 1 , 2 , 3
  const tab_items: TabsProps["items"] = [
    {
      key: "1",
      label: "Repeat",
      children: (
        <Table
          className="Repeat"
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={repeat_data}
          columns={columns as ColumnTypes}
          onRow={(record) => ({
            onClick: async () => {
              console.log(record);
            },
          })}
        />
      ),
    },
    {
      key: "2",
      label: "Scrap",
      children: (
        <Table
          className="Scrap"
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={scrap_data}
          columns={columns as ColumnTypes}
        />
      ),
    },
    {
      key: "3",
      label: "Repeat ng.",
      children: (
        <Table
          className="Repeat ng."
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={repeat_ng_data}
          columns={columns as ColumnTypes}
        />
      ),
    },
    
  ];

  //add row
  const add_row = () => {
    const newData: DataType = {
      key: String(repeatAPI.length + dataSource.length + 1),
      mode: "0",
      target_by_item: "0",
    };
    if (tab_key === "1") {
      setRepeatData([...repeat_data, newData]);
      // console.log("repeat_data");
    }
    if (tab_key === "2") {
      setScrapData([...scrap_data, newData]);
      // console.log("scrap_data");
    }
    if (tab_key === "3") {
      setRepeatNgData([...repeat_ng_data, newData]);
      // console.log("repeat_ng_data");
    }
    setDataSource([...dataSource, newData]);
  };

  //set format data to other form
  const data_json = () => {
    const line_id = form.getFieldValue("LineId");
    const part_no = form.getFieldValue("PartNo");
    const modeData = [repeat_data, scrap_data, repeat_ng_data].flatMap(
      (innerArray) => innerArray
    );

    const data_format = {
      line_id: line_id,
      part_no: part_no,
      mode_data: modeData,
    };
    setAdminData([data_format]);
    console.log("ModeData :", modeData);
    console.log("data_format :", data_format);
    console.log("data admin store", admin_data_store);
  };

  //save
  const onSaveButtonClick = () => {
    data_json();
    message.success("Save successfully");
    // console.log(repeat_data);
    // console.log(scrap_data);
    // console.log(repeat_ng_data);
  };

  const onSearchClick =()=>{
    setRepeatData(repeatAPI)
    setScrapData(scrapAPI)
    setRepeatNgData(repeatNGAPI)
  }

  //change tab
  const onTabChange = (key: string) => {
    setTabKey(key);
  };

  //when you edit data on table, it will auto save on row.
  const handleSave = (row: DataType) => {
    const newData = [...dataSource]; //spread operator (...) คัดลอก array ต้นฉบับมาเก็บไว้ใน newData
    const index = newData.findIndex((item) => row.key === item.key); //findIndex รับ newData มาทำการวน array เพื่อหาค่าแรกใน array และreturn
    const updatedItem = { ...newData[index], ...row }; //ผสมคุณสมบัติarray (newData[index]) และ row ใช้เขียนทับคุณสมบัติที่มีอยู่เพื่ออัพเดท
    newData.splice(index, 1, updatedItem); // splice method , index=เริ่มต้นต้องการแทนที่, 1=จำนวนองค์ประกอบที่จะถูกลบ, updatedItem=แทนที่
    if (tab_key === "1") {
      const updatedRepeatData = repeat_data.map(
        (
          item: any //map ค่าจาก repeat_data มาใส่ใน function แล้ว return เป็น array
        ) =>
          item.key === row.key ? { ...updatedItem, category: "Repeat" } : item
      );
      setRepeatData(updatedRepeatData);
      console.log("repeat_data", updatedRepeatData);
    } else if (tab_key === "2") {
      const updatedScrapData = scrap_data.map((item: any) =>
        item.key === row.key ? { ...updatedItem, category: "Scrap" } : item
      );
      setScrapData(updatedScrapData);
      console.log("scrap_data");
    } else if (tab_key === "3") {
      const updatedRepeatNgData = repeat_ng_data.map((item: any) =>
        item.key === row.key ? { ...updatedItem, category: "Repeat NG" } : item
      );
      setRepeatNgData(updatedRepeatNgData);
      console.log("repeat_ng_data");
    }
  };

  return (
    <div style={{ padding: "0.5rem" }}>
      <span style={{ fontSize: 40, display: "flex", justifyContent: "center" }}>
        Admin
      </span>
      <Form
        form={form}
        layout="inline"
        style={{ justifyContent: "center", margin: "10px" }}
      >
        <FormItem
          name="LineId"
          rules={[{ required: true, message: "Line id is required" }]}
          style={{ width: "30%" }}
          label={
            <span className="line id" style={{ fontSize: 25 }}>
              Line id
            </span>
          }
        >
          <Select
            showSearch
            placeholder="Select a Line ID"
            style={{ width: 300 }}
            options={[
              { value: "ASSEMBLY", label: <span>ASSEMBLY</span> },
              { value: "PRODUCTION1", label: <span>PRODUCTION1</span> },
              { value: "PRODUCTION2", label: <span>PRODUCTION2</span> },
            ]}
          >
            {" "}
          </Select>
        </FormItem>

        <FormItem
          name="PartNo"
          rules={[{ required: true, message: "Part no is required" }]}
          style={{ width: "30%" }}
          label={
            <span className="part no" style={{ fontSize: 25 }}>
              Part no
            </span>
          }
        >
          <Select
            showSearch
            placeholder="Select a Part No"
            style={{ width: 300 }}
            options={[
              { value: "123", label: <span>123</span> },
              { value: "456", label: <span>456</span> },
              { value: "789", label: <span>789</span> },
            ]}
          >
            {" "}
          </Select>
        </FormItem>

        <Button onClick={onSearchClick} type="primary">
          Search
        </Button>
      </Form>
      <Button onClick={add_row} type="primary" style={{ marginBottom: 16 }}>Add</Button>
        <Tabs
          style={{ paddingTop: "0.5rem" }}
          defaultActiveKey="1"
          type="card"
          items={tab_items}
          onChange={onTabChange}
        ></Tabs>
        

      <FormItem style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onSaveButtonClick} type="primary">
          Save
        </Button>
      </FormItem>
    </div>
  );
};

export default App;
