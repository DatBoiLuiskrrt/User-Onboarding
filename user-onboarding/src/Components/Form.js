import React, { useState,  useEffect } from "react";
  import {
    withFormik,
    Form,
    Field
  } from "formik";
  import * as Yup from "yup";
  import axios from "axios";

  const UserForm = ({
      values,
      errors,
      touched,
      status
  }) => {
      const [users, setUsers] = useState([]);
      useEffect(() => {
          console.log(
              "status has changed",
              status
          );
          status &&
          setUsers(users => [
              ...users,
              status
          ]);
      }, [status]);
      return (
          <>
          <Form>
              <label>
                  Name:
                  <Field
                  id="name"
                  type="text"
                  name="name"
                  />
              </label>
              {touched.name && errors.name (
                  <p>{errors.name}</p>
              )}
              <label>
                  Email: 
                  <Field
                  id="email"
                  type="email"
                  name="email"
                  />
              </label>
              {touched.email && errors.email (
                  <p>{errors.email}</p>
              )}
              <label>
                  Password:
                  <Field
                  id="password"
                  type="password"
                  name="password"
                  />
              </label>
              {touched.password && errors.password (
                  <p>{errors.password}</p>
              )}
              <label>
                  Es zoofilico?
                  <Field
                  id="zoo"
                  type="checkbox"
                  name="zoo"
                  />
              </label>
              <button type="submit">Submit !</button>

          </Form>
          {users.map(user => (
              <ul key={user.id}>
                  <li>Name : {user.name}</li>
                  <li>Email: {user.email}</li>
                  <li>Password: {user.password}</li>
                  <li>Es Zoofilico? {user.zoo}</li>
              </ul>
          ))}
          </>
      );
  };

  const FormikUserForm = withFormik({
      mapPropsToValues({
          name,
          email,
          password,
          zoo
      }) {
          return {
              name: "",
              email: "",
              password: "",
              zoo: "" || false,
          };
      },
      validationSchema: Yup.object().shape({
          name: Yup.string().required("Necesita poner su nombre no sea gei"),
          email: Yup.string().required(),
          password: Yup.string().required(),
        
      }),
      handleSubmit(
          values,
          { setStatus, resetForm }
      ) {
          console.log("submitting", values);
          axios
          .post(
              "https://reqres.in/api/users",
              values
          )
          .then(response => {
              console.log("succeso", response);
              setStatus(response.data);
              resetForm();
          })
          .catch(err => 
            console.log(err.response)
            );
      }
  })(UserForm);

  export default FormikUserForm;

