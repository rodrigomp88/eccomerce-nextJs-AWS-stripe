import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateNameApi } from "../../../api/user";

export default function ChangeNameForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname, user.username),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateNameApi(user.id, formData, logout);
      if (!response) {
        toast.error("Error al actualizar los datos");
      } else {
        setReloadUser(true);
        toast.success("Datos actualizados correctamente");
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Actualizá tus datos</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Tu nuevo nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Tus nuevos apellidos"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
          <Form.Input
            name="username"
            placeholder="Tu nuevo nombre de usuario"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.errors.username}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues(name, lastname, username) {
  return {
    name: name || "",
    lastname: lastname || "",
    username: username || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
  };
}
