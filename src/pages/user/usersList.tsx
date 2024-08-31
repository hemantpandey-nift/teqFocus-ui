import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./User.module.css";
import { useNavigate } from "react-router";
import ButtonComponent from "../../components/buttonComponent";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { fetchUserList, resetUserData } from "../../store/userSlice";
import Loader from "../../components/loader/Loader";

export default function UserList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  const userState = useSelector((state: RootState) => state.user);

  const loading = userState.loading;
  let userList = userState.userList;
  userList = userList.map((el: any) => ({ ...el, dateOfBirth: el.dateOfBirth ? dayjs(el.dateOfBirth).format("DD-MMM-YYYY") : "" }));

  const imageBodyTemplate = (product: any) => {
    return (
      <div className="preview">
        <img src={product.profilePicture} alt="Profile Preview" />
      </div>
    );
  };

  const header = (
    <div className={styles.tableHeader}>
      <div className="text-xl text-900 font-bold">Users</div>
      <ButtonComponent
        type="button"
        disabled={false}
        title="Add New User +"
        onClick={() => {
          dispatch(resetUserData());
          navigate("/user/register");
        }}
      />
    </div>
  );

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div>
        <VisibilityIcon
          className={styles.viewIcon}
          onClick={() => {
            navigate(`/user/view/${rowData.userId}`);
          }}
        />
        <EditIcon
          className={styles.viewIcon}
          onClick={() => {
            navigate(`/user/edit/${rowData.userId}`);
          }}
        />
      </div>
    );
  };

  return (
    <div className={styles.card}>
      {loading && <Loader />}
      <DataTable
        dataKey="userId"
        value={userList}
        header={header}
        paginator
        rowsPerPageOptions={[5, 10, 25, 50]}
        rows={10}
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
      >
        <Column header="profilePicture" body={imageBodyTemplate}></Column>
        <Column field="userId" sortable header="User Id" />
        <Column field="firstName" sortable header="First Name" />
        <Column field="middleName" sortable header="Middle Name" />
        <Column field="lastName" sortable header="Last Name" />
        <Column field="userEmail" sortable header="User Email" />
        <Column field="contactNumber" sortable header="Contact Number" />
        <Column field="dateOfBirth" sortable header="Date Of Birth" />
        <Column header="actions" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
}
