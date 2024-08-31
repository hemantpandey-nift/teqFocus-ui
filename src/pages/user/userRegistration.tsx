import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputComponent from "../../components/inputComponent";
import CONSTANTS from "../../constants/constants";
import { UserType } from "../../constants/types";
import { useLocation, useNavigate, useParams } from "react-router";
import ButtonComponent from "../../components/buttonComponent";
import { Calendar } from "primereact/calendar";
import styles from "./User.module.css";
import Loader from "../../components/loader/Loader";
import { RootState, useAppDispatch } from "../../store";
import { fetchUserData } from "../../store/userSlice";
import { useSelector } from "react-redux";

const UserRegistrationForm = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isView = location?.pathname?.split("/")?.includes("view") ?? true;

  useEffect(() => {
    dispatch(fetchUserData({ userId: params.userId }));
  }, [params.userId]);

  const userState = useSelector((state: RootState) => state.user);

  let selectedUser = userState.selectedUser;

  const minDate = new Date("12/31/2010");
  // Initial form values
  const initialValues: UserType = useMemo(() => {
    return selectedUser
      ? selectedUser
      : {
          firstName: "",
          middleName: "",
          lastName: "",
          userEmail: "",
          profilePicture: "",
          dateOfBirth: null,
          contactNumber: "",
        };
  }, [selectedUser]);

  const [base64IMG, setBase64IMG] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, `First Name ${CONSTANTS.MESSAGES.ERRORS.minCharError}`)
      .max(50, `First Name ${CONSTANTS.MESSAGES.ERRORS.maxCharError}`)
      .required(`First Name ${CONSTANTS.MESSAGES.ERRORS.requiredError}`),
    middleName: Yup.string()
      .min(3, `Middle Name ${CONSTANTS.MESSAGES.ERRORS.minCharError}`)
      .max(50, `Middle Name ${CONSTANTS.MESSAGES.ERRORS.maxCharError}`)
      .optional(),
    lastName: Yup.string()
      .min(3, `Last Name ${CONSTANTS.MESSAGES.ERRORS.minCharError}`)
      .max(50, `Last Name ${CONSTANTS.MESSAGES.ERRORS.maxCharError}`)
      .required(`Last Name ${CONSTANTS.MESSAGES.ERRORS.requiredError}`),
    userEmail: Yup.string().email(CONSTANTS.MESSAGES.ERRORS.invalidEmail).required(`Email ${CONSTANTS.MESSAGES.ERRORS.requiredError}`),
    dateOfBirth: Yup.date().label("Date of Birth").optional(),
    contactNumber: Yup.string()
      .label("Mobile Number")
      .optional()
      .min(10)
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Please Enter a valid Mobile Number"),
    profilePicture: Yup.string().required("A profile picture is required"),
  });

  const handleImageChange = (event: any, setFieldValue: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setBase64IMG(reader.result);
        setFieldValue("profilePicture", reader.result);
      };
    }
  };

  const updateUserData = async (values: any) => {
    let userList: any = localStorage.getItem("UserList") ? JSON.parse(localStorage?.getItem("UserList") ?? "") : [];
    if (!selectedUser) {
      userList.push({ userId: `USR_${userList.length + 1}`, ...values });
    } else {
      const userId = selectedUser.userId;
      userList = userList.map((el: any) => {
        return el.userId === userId ? values : el;
      });
    }

    return new Promise((res, rej) => {
      setTimeout(() => {
        res(userList);
      }, 1000);
    });
  };
  // Form submission handler
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setLoading(true);
      let userList: any = await updateUserData(values);
      localStorage.setItem("UserList", JSON.stringify(userList));
      setSubmitting(false);
      navigate("/user/list");
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  return (
    <div className="formContainer">
      <span className={styles.heading}>User Registration</span>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, getFieldMeta, getFieldProps }) => {
          return (
            <Form>
              {loading && <Loader />}
              <div className={styles.maindiv}>
                <div className={styles.subDiv}>
                  <label htmlFor="profilePicture" className="labelText">
                    Profile Picture
                  </label>
                  {(selectedUser?.profilePicture || base64IMG) && (
                    <div className="preview">
                      <img src={base64IMG ? base64IMG : selectedUser.profilePicture} alt="Profile Preview" />
                    </div>
                  )}
                  {!isView ? (
                    <div className="formGroup">
                      <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                        onChange={(event) => handleImageChange(event, setFieldValue)}
                      />
                      <ErrorMessage name="profilePicture" component="div" className="error" />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.subDiv}>
                  <div className={styles.detailsDiv}>
                    <div className={styles.detailsDivInner}>
                      <InputComponent
                        htmlFor="firstName"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your First name"
                        component="div"
                        title="First Name"
                        disabled={isView}
                      />

                      <InputComponent
                        htmlFor="middleName"
                        type="text"
                        id="middleName"
                        name="middleName"
                        placeholder="Enter your Middle Name"
                        component="div"
                        title="Middle Name"
                        disabled={isView}
                      />
                    </div>
                    <div className={styles.detailsDivInner}>
                      <InputComponent
                        htmlFor="lastName"
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your Last Name"
                        component="div"
                        title="Last Name"
                        disabled={isView}
                      />
                    </div>
                    <div className={styles.detailsDivInner}>
                      <InputComponent
                        htmlFor="userEmail"
                        type="text"
                        id="userEmail"
                        name="userEmail"
                        placeholder="Enter your email"
                        component="div"
                        title="Email"
                        disabled={isView}
                      />
                      <div>
                        <InputComponent
                          htmlFor="contactNumber"
                          type="text"
                          id="contactNumber"
                          name="contactNumber"
                          placeholder="Enter your Contact Number"
                          component="div"
                          title="Contact Number"
                          disabled={isView}
                        />
                      </div>
                    </div>
                    <div className={styles.detailsDivInner}>
                      <div className="formGroup">
                        <label htmlFor="buttondisplay" className="labelText">
                          Date of Birth
                        </label>
                        <Calendar
                          disabled={isView}
                          dateFormat="dd/M/yy"
                          minDate={minDate}
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={getFieldProps("dateOfBirth").value}
                          onChange={(e: any) => {
                            setFieldValue("dateOfBirth", e.value);
                          }}
                          showIcon
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isView ? (
                <></>
              ) : (
                <div className={styles.buttonDiv}>
                  <ButtonComponent
                    type="button"
                    disabled={isSubmitting}
                    title="Cancel"
                    onClick={() => {
                      navigate("/user/list");
                    }}
                  />
                  <ButtonComponent type="submit" disabled={isSubmitting} title={!selectedUser ? "Register" : "Edit User"} onClick={() => {}} />
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserRegistrationForm;
