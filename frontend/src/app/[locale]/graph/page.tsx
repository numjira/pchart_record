"use client";
import React, { useState, useRef } from "react";
import "./table_css.css";
import type { DatePickerProps, TableProps } from "antd";
import {
  Button,
  Form,
  Select,
  DatePicker,
  Switch,
  Space,
  Table,
  Radio,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import Modalshow from "@/components/modal/modal";
import { AdminStore } from "@/store/admin store/adminstore.store";
import { DualPchart } from "@/components/pchart/DualMultiline";
import { DualParetoChart } from "@/components/pareto/DualPareto";
import html2canvas from "html2canvas";

const Gpage: React.FC = () => {
  // Data from store
  const admin_data_store = AdminStore((state) => state.data);

  // Initial state is true for P-Chart, false for Pareto
  const [ChartChange, setChartChange] = useState(true);

  // Set chart change
  const handleSwitchChange = (checked: any) => {
    setChartChange(checked);
  };

  // reference to a <div> element in the HTML (chart)
  const chartRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  interface DataType {
    key: React.Key;
    // defectiveitem: string;
    // 1: string;
    // 2: string;
    category: string;
    item: string;
    target_by_item: string;
    mode: string;
    total: number;
  }

  // on change date picker when you select the new date
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  // day 1 - 31 on table cloumn
  const dateColumns = [];
  for (let i: number = 1; i <= 31; i++) {
    dateColumns.push({
      title: `${i}`,
      dataIndex: `${i}`,
      width: 60,
      key: "date",
      render: (text: any, record: any) => {
        //click ได้แค่ใน category
        if (
          record.category === "Repeat" ||
          record.category === "Scrap" ||
          record.category === "Repeat NG"
        ) {
          return <a onClick={showModal}>{text}</a>;
        } else {
          return text;
        }
      },
    });
  }

  //UCL data exam ใช้ data เหล่านี้สำหรับเป็นตัวทดลองส่ง props เข้าไปยัง chart ซึ่งโครงสร้าง data จะเป็นแบบนี้
  const dataUCL = [
    {
      date: "Wed, Nov 01, 2023",
      type: "UCL",
      value: 0.545,
    },
    {
      date: "Wed, Nov 01, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 02, 2023",
      type: "UCL",
      value: 2.171,
    },
    {
      date: "Thu, Nov 02, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 03, 2023",
      type: "UCL",
      value: 0.593,
    },
    {
      date: "Fri, Nov 03, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 04, 2023",
      type: "UCL",
      value: 0.138,
    },
    {
      date: "Sat, Nov 04, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 05, 2023",
      type: "UCL",
      value: 0.138,
    },
    {
      date: "Sun, Nov 05, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 06, 2023",
      type: "UCL",
      value: 0.554,
    },
    {
      date: "Mon, Nov 06, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 07, 2023",
      type: "UCL",
      value: 0.557,
    },
    {
      date: "Tue, Nov 07, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 08, 2023",
      type: "UCL",
      value: 0.138,
    },
    {
      date: "Wed, Nov 08, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 09, 2023",
      type: "UCL",
      value: 0.537,
    },
    {
      date: "Thu, Nov 09, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 10, 2023",
      type: "UCL",
      value: 0.565,
    },
    {
      date: "Fri, Nov 10, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 11, 2023",
      type: "UCL",
      value: 0.613,
    },
    {
      date: "Sat, Nov 11, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 12, 2023",
      type: "UCL",
      value: 0.138,
    },
    {
      date: "Sun, Nov 12, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 13, 2023",
      type: "UCL",
      value: 0.63,
    },
    {
      date: "Mon, Nov 13, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 14, 2023",
      type: "UCL",
      value: 0.555,
    },
    {
      date: "Tue, Nov 14, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 15, 2023",
      type: "UCL",
      value: 0.829,
    },
    {
      date: "Wed, Nov 15, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 16, 2023",
      type: "UCL",
      value: 0.563,
    },
    {
      date: "Thu, Nov 16, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 17, 2023",
      type: "UCL",
      value: 1.1,
    },
    {
      date: "Fri, Nov 17, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 18, 2023",
      type: "UCL",
      value: 0.543,
    },
    {
      date: "Sat, Nov 18, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 19, 2023",
      type: "UCL",
      value: 0.138,
    },
    {
      date: "Sun, Nov 19, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 20, 2023",
      type: "UCL",
      value: 0.555,
    },
    {
      date: "Mon, Nov 20, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 21, 2023",
      type: "UCL",
      value: 0.575,
    },
    {
      date: "Tue, Nov 21, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 22, 2023",
      type: "UCL",
      value: 0.559,
    },
    {
      date: "Wed, Nov 22, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 23, 2023",
      type: "UCL",
      value: 0.781,
    },
    {
      date: "Thu, Nov 23, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 24, 2023",
      type: "UCL",
      value: 0.781,
    },
    {
      date: "Fri, Nov 24, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 25, 2023",
      type: "UCL",
      value: 0.636,
    },
    {
      date: "Sat, Nov 25, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 26, 2023",
      type: "UCL",
      value: 0.138,
    },
    {
      date: "Sun, Nov 26, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 27, 2023",
      type: "UCL",
      value: 0.688,
    },
    {
      date: "Mon, Nov 27, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 28, 2023",
      type: "UCL",
      value: 1.03,
    },
    {
      date: "Tue, Nov 28, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 29, 2023",
      type: "UCL",
      value: 0.138,
    },
    {
      date: "Wed, Nov 29, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 30, 2023",
      type: "UCL",
      value: 0.138,
    },
    {
      date: "Thu, Nov 30, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
  ];

  //Pbar data exam
  const dataPbar = [
    {
      date: "Wed, Nov 01, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Wed, Nov 01, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 02, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Thu, Nov 02, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 03, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Fri, Nov 03, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 04, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Sat, Nov 04, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 05, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Sun, Nov 05, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 06, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Mon, Nov 06, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 07, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Tue, Nov 07, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 08, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Wed, Nov 08, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 09, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Thu, Nov 09, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 10, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Fri, Nov 10, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 11, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Sat, Nov 11, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 12, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Sun, Nov 12, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 13, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Mon, Nov 13, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 14, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Tue, Nov 14, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 15, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Wed, Nov 15, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 16, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Thu, Nov 16, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 17, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Fri, Nov 17, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 18, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Sat, Nov 18, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 19, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Sun, Nov 19, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 20, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Mon, Nov 20, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 21, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Tue, Nov 21, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 22, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Wed, Nov 22, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 23, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Thu, Nov 23, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 24, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Fri, Nov 24, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 25, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Sat, Nov 25, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 26, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Sun, Nov 26, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 27, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Mon, Nov 27, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 28, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Tue, Nov 28, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 29, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Wed, Nov 29, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 30, 2023",
      type: "Pbar",
      value: 0.138,
    },
    {
      date: "Thu, Nov 30, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
  ];

  //data defect ratio exam
  const dataDefectRatio = [
    {
      date: "Wed, Nov 01, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Wed, Nov 01, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 02, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Thu, Nov 02, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 03, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Fri, Nov 03, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 04, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Sat, Nov 04, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 05, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Sun, Nov 05, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 06, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Mon, Nov 06, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 07, 2023",
      type: "DefectRatio",
      value: 0.567,
    },
    {
      date: "Tue, Nov 07, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 08, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Wed, Nov 08, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 09, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Thu, Nov 09, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 10, 2023",
      type: "DefectRatio",
      value: 0.588,
    },
    {
      date: "Fri, Nov 10, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 11, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Sat, Nov 11, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 12, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Sun, Nov 12, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 13, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Mon, Nov 13, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 14, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Tue, Nov 14, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 15, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Wed, Nov 15, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 16, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Thu, Nov 16, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 17, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Fri, Nov 17, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 18, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Sat, Nov 18, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 19, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Sun, Nov 19, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 20, 2023",
      type: "DefectRatio",
      value: 0.28,
    },
    {
      date: "Mon, Nov 20, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 21, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Tue, Nov 21, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 22, 2023",
      type: "DefectRatio",
      value: 0.286,
    },
    {
      date: "Wed, Nov 22, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 23, 2023",
      type: "DefectRatio",
      value: 0.667,
    },
    {
      date: "Thu, Nov 23, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Fri, Nov 24, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Fri, Nov 24, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sat, Nov 25, 2023",
      type: "DefectRatio",
      value: 0.4,
    },
    {
      date: "Sat, Nov 25, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Sun, Nov 26, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Sun, Nov 26, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Mon, Nov 27, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Mon, Nov 27, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Tue, Nov 28, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Tue, Nov 28, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Wed, Nov 29, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Wed, Nov 29, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
    {
      date: "Thu, Nov 30, 2023",
      type: "DefectRatio",
      value: 0,
    },
    {
      date: "Thu, Nov 30, 2023",
      type: "1_BaseLine",
      value: 2.714,
    },
  ];

  //data defect exam
  const dataDF = [
    {
      date: "Wed, Nov 01, 2023",
      type: "Defect_Part",
      value1: 1,
    },
    {
      date: "Thu, Nov 02, 2023",
      type: "Defect_Part",
      value1: 2,
    },
    {
      date: "Fri, Nov 03, 2023",
      type: "Defect_Part",
      value1: 3,
    },
    {
      date: "Sat, Nov 04, 2023",
      type: "Defect_Part",
      value1: 10,
    },
    {
      date: "Sun, Nov 05, 2023",
      type: "Defect_Part",
      value1: 9,
    },
    {
      date: "Mon, Nov 06, 2023",
      type: "Defect_Part",
      value1: 8,
    },
    {
      date: "Tue, Nov 07, 2023",
      type: "Defect_Part",
      value1: 7,
    },
    {
      date: "Wed, Nov 08, 2023",
      type: "Defect_Part",
      value1: 8,
    },
    {
      date: "Thu, Nov 09, 2023",
      type: "Defect_Part",
      value1: 0,
    },
    {
      date: "Fri, Nov 10, 2023",
      type: "Defect_Part",
      value1: 0,
    },
    {
      date: "Sat, Nov 11, 2023",
      type: "Defect_Part",
      value1: 0,
    },
    {
      date: "Sun, Nov 12, 2023",
      type: "Defect_Part",
      value1: 1,
    },
    {
      date: "Mon, Nov 13, 2023",
      type: "Defect_Part",
      value1: 6,
    },
    {
      date: "Tue, Nov 14, 2023",
      type: "Defect_Part",
      value1: 5,
    },
    {
      date: "Wed, Nov 15, 2023",
      type: "Defect_Part",
      value1: 9,
    },
    {
      date: "Thu, Nov 16, 2023",
      type: "Defect_Part",
      value1: 6,
    },
    {
      date: "Fri, Nov 17, 2023",
      type: "Defect_Part",
      value1: 1,
    },
    {
      date: "Sat, Nov 18, 2023",
      type: "Defect_Part",
      value1: 3,
    },
    {
      date: "Sun, Nov 19, 2023",
      type: "Defect_Part",
      value1: 8,
    },
    {
      date: "Mon, Nov 20, 2023",
      type: "Defect_Part",
      value1: 0,
    },
    {
      date: "Tue, Nov 21, 2023",
      type: "Defect_Part",
      value1: 5,
    },
    {
      date: "Wed, Nov 22, 2023",
      type: "Defect_Part",
      value1: 9,
    },
    {
      date: "Thu, Nov 23, 2023",
      type: "Defect_Part",
      value1: 1,
    },
    {
      date: "Fri, Nov 24, 2023",
      type: "Defect_Part",
      value1: 1,
    },
    {
      date: "Sat, Nov 25, 2023",
      type: "Defect_Part",
      value1: 6,
    },
    {
      date: "Sun, Nov 26, 2023",
      type: "Defect_Part",
      value1: 8,
    },
    {
      date: "Mon, Nov 27, 2023",
      type: "Defect_Part",
      value1: 8,
    },
    {
      date: "Tue, Nov 28, 2023",
      type: "Defect_Part",
      value1: 3,
    },
    {
      date: "Wed, Nov 29, 2023",
      type: "Defect_Part",
      value1: 8,
    },
    {
      date: "Thu, Nov 30, 2023",
      type: "Defect_Part",
      value1: 0,
    },
  ];

  //data for create pareto chart
  const paretoData = [
    {
      Mode: "Plus Diode Press Ng.",
      Qty: 49,
    },
    {
      Mode: "IR NG",
      Qty: 32,
    },
    {
      Mode: "Terminal& Plus Fin Press Mold แตก",
      Qty: 27,
    },
    {
      Mode: "Minus Diode & RR. Frame Press Ng.",
      Qty: 13,
    },
    {
      Mode: "Delta VZ NG",
      Qty: 9,
    },
    {
      Mode: "Nut Runner Torque Ng.",
      Qty: 3,
    },
  ];

  //data structure
  interface DataObject {
    key: string;
    category: string;
    mode: string;
    target_by_item: string;
    [key: string]: string; // Index signature for dynamic properties
  }


  const repeatCount = admin_data_store[0]?.mode_data.filter(
    (item) => item.category === "Repeat"
  ).length;
  const scrapCount = admin_data_store[0]?.mode_data.filter(
    (item) => item.category === "Scrap"
  ).length;
  const repeatNGCount = admin_data_store[0]?.mode_data.filter(
    (item) => item.category === "Repeat NG"
  ).length;

  const categoryCount = admin_data_store[0]?.mode_data.filter(
    (item) => item.category
  ).length;

  const categoryCount_click = () => {
    console.log('repeatCount',repeatCount);
    console.log('scrapCount',scrapCount);
    console.log('repeatNGCount',repeatNGCount);
    console.log('categoryCount',categoryCount);
  };



  const repeatData = admin_data_store[0]?.mode_data.filter(
    (item) => item.category === "Repeat"
  );
  const scrapData = admin_data_store[0]?.mode_data.filter(
    (item) => item.category === "Scrap"
  );
  const repeatNGData = admin_data_store[0]?.mode_data.filter(
    (item) => item.category === "Repeat NG"
  );



  const data: DataObject[] = [
    {
      key: "1",
      category: "Prod. QTY(n)",
      mode: "",
      target_by_item: "",
    },
    {
      key: "2",
      category: "Defect QTY(np)",
      mode: "",
      target_by_item: "",
    },
    {
      key: "3",
      category: "Defect Ratio",
      mode: "",
      target_by_item: "",
    },

    ...(repeatData && repeatData.length > 0
      ? repeatData.map((item, index) => ({
          key: (index + 4).toString(), // Adjusting the key to ensure uniqueness
          category: item.category,
          mode: item.mode || "",
          target_by_item: item.target_by_item || "",
        }))
      : [
          {
            key: "97",
            category: "Repeat",
            mode: [],
            target_by_item: [],
          },
        ]),

    ...(scrapData && scrapData.length > 0
      ? scrapData.map((item, index) => ({
          key: (index + 5).toString(), // Adjusting the key to ensure uniqueness
          category: item.category,
          mode: item.mode || "",
          target_by_item: item.target_by_item || "",
        }))
      : [
          {
            key: "98",
            category: "Scrap",
            mode: [],
            target_by_item: [],
          },
        ]),

    ...(repeatNGData && repeatNGData.length > 0
      ? repeatNGData.map((item, index) => ({
          key: (index + 6).toString(), // Adjusting the key to ensure uniqueness
          category: item.category,
          mode: item.mode || "",
          target_by_item: item.target_by_item || "",
        }))
      : [
          {
            key: "99",
            category: "Repeat NG",
            mode: [],
            target_by_item: [],
          },
        ]),

    {
      key: "100",
      category: "MC Set Up",
      mode: "",
      target_by_item: "",
    },
    {
      key: "101",
      category: "Quality Test",
      mode: "",
      target_by_item: "",
    },
    {
      key: "102",
      category: "Record by: LL & TL",
      mode: "",
      target_by_item: "",
    },
    {
      key: "103",
      category: "Review by: TL",
      mode: "",
      target_by_item: "",
    },
    {
      key: "104",
      category: "Review by: AM-Mgr",
      mode: "",
      target_by_item: "",
    },
    {
      key: "105",
      category: "Review by: AGM-GM",
      mode: "",
      target_by_item: "",
    },
  ];

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    // Add properties "1" to "31" with the value "0"
    for (let j = 1; j <= 31; j++) {
      obj[j.toString()] = "0";
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Category",
      dataIndex: "category",
      key: "catogory",
      rowScope: "row",
      fixed: "left",
      width: "100px",
      colSpan: 0,
      onCell: (_, index) => {
        let indexColspan = Array(3).fill(4); // Default colSpan value of 4 for the first 3 columns
        if (categoryCount > 1) {
            indexColspan = indexColspan.concat(Array(categoryCount < 3 ? 3 : categoryCount).fill(2)).concat(Array(6).fill(4));
        } else {
            indexColspan = indexColspan.concat(Array(3).fill(2)).concat(Array(6).fill(4));
        }


        return { colSpan: indexColspan[index as number] };
    },
    },
    {
      title: "Defective Item",
      dataIndex: "item",
      key: "item",
      fixed: "left",
      width: "250px",
      colSpan: 2,
      // onCell: (_, index) => {
      //   const indexColspan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      //   return { colSpan: indexColspan[index as number] };
      // },
      onCell: (_, index) => {
        let indexColspan = Array(3).fill(0); // Default colSpan value of 4 for the first 3 columns
        if (categoryCount > 1) {
            indexColspan = indexColspan.concat(Array(categoryCount < 3 ? 3 : categoryCount).fill(0)).concat(Array(6).fill(0));
        } else {
            indexColspan = indexColspan.concat(Array(3).fill(0)).concat(Array(6).fill(0));
        }
        return { colSpan: indexColspan[index as number] };
    },
    },

    {
      title: "Defect Mode",
      dataIndex: "mode",
      key: "mode",
      fixed: "left",
      width: "100px",
      colSpan: 2,
      // onCell: (_, index) => {
      //   const indexColspan = [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0];
      //   return { colSpan: indexColspan[index as number] };
      // },
      onCell: (_, index) => {
        let indexColspan = Array(3).fill(0); // Default colSpan value of 4 for the first 3 columns
        if (categoryCount > 1) {
            indexColspan = indexColspan.concat(Array(categoryCount < 3 ? 3 : categoryCount).fill(1)).concat(Array(6).fill(0));
        } else {
            indexColspan = indexColspan.concat(Array(3).fill(1)).concat(Array(6).fill(0));
        }
        return { colSpan: indexColspan[index as number] };
    },
    },
    {
      title: "Target",
      dataIndex: "target_by_item",
      key: "target_by_item",
      fixed: "left",
      width: "100px",
      colSpan: 0,
      // onCell: (_, index) => {
      //   const indexColspan = [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0];
      //   return { colSpan: indexColspan[index as number] };
      // },
      onCell: (_, index) => {
        let indexColspan = Array(3).fill(0); // Default colSpan value of 4 for the first 3 columns
        if (categoryCount > 1) {
            indexColspan = indexColspan.concat(Array(categoryCount < 3 ? 3 : categoryCount).fill(1)).concat(Array(6).fill(0));
        } else {
            indexColspan = indexColspan.concat(Array(3).fill(1)).concat(Array(6).fill(0));
        }
        return { colSpan: indexColspan[index as number] };
    },
    },
    ...dateColumns,
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "80px",
      // onCell: (_, index) => {
      //   if (index === 8) {
      //     return { colSpan: 0 };
      //   } else if (index === 9) {
      //     return { colSpan: 0 };
      //   } else if (index === 10) {
      //     return { colSpan: 0 };
      //   } else if (index === 11) {
      //     return { colSpan: 0 };
      //   } else {
      //     return { colSpan: 1 };
      //   }
      // },
      onCell: (_, index) => {
        let indexColspan = Array(3).fill(1); // Default colSpan value of 4 for the first 3 columns
        if (categoryCount > 1) {
            indexColspan = indexColspan.concat(Array(categoryCount < 3 ? 3 : categoryCount).fill(1)).concat(Array(2).fill(1)).concat(Array(4).fill(0));
        } else {
            indexColspan = indexColspan.concat(Array(3).fill(1)).concat(Array(2).fill(1)).concat(Array(4).fill(0));
        }
        return { colSpan: indexColspan[index as number] };
    },
    },
  ];

  // function call for download chart image .jpg
  const downloadChart = async () => {
    if (chartRef.current) {
      try {
        // Capture the content of the chart using html2canvas
        const canvas = await html2canvas(chartRef.current);
        // Convert the canvas data to a data URL (JPEG format in this case)
        const dataUrl = canvas.toDataURL("image/jpeg");
        //  Create an anchor element to trigger the download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "chart_image.jpg";
        link.click();
        await navigator.clipboard.writeText(dataUrl);
        console.log("Chart saved as JPEG!");
      } catch (error) {
        console.error("Error saving chart:", error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <div>
        <hr className="hr" />
      </div>
      <div className="selector">
        <Form layout="inline" style={{justifyContent:"center",margin:"10px"}}>
          <FormItem label={<span className="span1">Date</span>}>
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
            </Space>
          </FormItem>
        
          <FormItem
            name="LineName"
            rules={[{ required: true, message: "LineName is required" }]}
            label={<span className="span1">Line Name</span>}
          >
            <Select
              showSearch
              placeholder="Select a LineName"
              style={{ width: 200 }}
              options={[
                { value: "ASSEMBLY", label: <span>ASSEMBLY</span> },
                { value: "PRODUCTION1", label: <span>PRODUCTION1</span> },
                { value: "PRODUCTION2", label: <span>PRODUCTION2</span> },
              ]}
            />
          </FormItem>
        
          <FormItem
            name="Shift"
            rules={[{ required: true, message: "Shift is required" }]}
            label={<span className="span1">Shift</span>}
          >
            <Select
              showSearch
              placeholder="A RO B"
              style={{ width: 100 }}
              options={[
                { value: "A", label: <span>A</span> },
                { value: "B", label: <span>B</span> },
              ]}
            />
          </FormItem>
        
          <FormItem
            name="Partnumber"
            rules={[{ required: true, message: "Partnumber is required" }]}
            label={<span className="span1">Part Number</span>}
          >
            <Select
              showSearch
              placeholder="Select a Partnumber"
              style={{ width: 200 }}
              options={[
                { value: "TG028200-79000", label: <span>TG028200-79000</span> },
                { value: "TG028200-80000", label: <span>TG028200-80000</span> },
                { value: "TG028200-81000", label: <span>TG028200-81000</span> },
              ]}
            />
            <Button type="primary" htmlType="submit" className="button1">
              Search
            </Button>
          </FormItem>
        </Form>
      </div>

      <div style={{ marginLeft: "500px", marginBottom: "10px" ,display:"flex", justifyContent:"right"}}>

        <Radio.Group
          defaultValue={ChartChange}
          style={{ width: "200px", height: "25px" }}
          onChange={(e) => handleSwitchChange(e.target.value)}
        >
          <Radio.Button value={true}>P-Chart</Radio.Button>
          <Radio.Button value={false}>Pareto</Radio.Button>
        </Radio.Group>

      </div>

      {ChartChange ? (
        <div ref={chartRef}>
          <DualPchart
            data1={dataUCL}
            data2={dataPbar}
            data3={dataDefectRatio}
            data4={dataDF}
          />
        </div>
      ) : (
        <div ref={chartRef}>
          <DualParetoChart dataDFM={paretoData} />
        </div>
      )}

      <div className="devbutton1" style={{margin:"10px"}}>
        <Button
          type="primary"
          onClick={downloadChart}
          className="button2"
          style={{ width: "10rem" }}
        >
          Dowload Image
        </Button>
      </div>

      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 500 }}
        style={{ marginBottom: "4rem" }}
        onRow={(record) => ({
          onClick: async () => {
            console.log(record);
          },
        })}
      />
      {/* <Button onClick={categoryCount_click} type="primary">
        show
      </Button> */}
      <Modalshow isOpen={isModalOpen} onClose={handleModalClose} />

      {/* <Record /> */}
    </div>
  );
};

export default Gpage;
