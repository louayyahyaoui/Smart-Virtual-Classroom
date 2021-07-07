import React, { useEffect, useState } from "react";
import { Table, Space  } from "antd";
import reactDom from "react-dom";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchuserdata,
  selectuserdata,
} from "../../redux/slices/userdataslice";
import { Link } from "react-router-dom";
const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: {
      compare: (a, b) => a.email - b.email,
      multiple: 3,
    },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    sorter: {
      compare: (a, b) => a.phone - b.phone,
      multiple: 2,
    },
  },
  {
    title: "Adress",
    dataIndex: "address",
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 1,
    },
  },
  {
    title: 'Action',
    dataIndex: '_id',
    key: 'x',
    render: (dataIndex) => <Link to={`/updateProfile/${dataIndex}`}>View</Link>,
  },
];

function Dash() {
  const [data, setdata] = useState([]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [dataa] = useSelector(selectuserdata);

  const dispatch = useDispatch();
 /* useEffect(() => {
    dispatch(fetchuserdata());
  }, [dispatch]);

  useEffect(() => {
    let array = [];
    dataa?.map((userinfo) => array.push(userinfo.idUser));
    setdata(array);
  }, [dataa]);
*/

  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange}  expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }} />

     
      
    </div>
  );
}

export default Dash;
