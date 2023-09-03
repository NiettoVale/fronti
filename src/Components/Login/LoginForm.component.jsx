import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "../firebase/LoginFacebook";
import GoogleLogin from "../firebase/LoginGoogle";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://ecommerflipante.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (response.status === 200) {
        alert(responseData.message);
        navigate("/home");
      } else if (response.status === 404) {
        alert(responseData.error);
      } else if (response.status === 401) {
        alert(responseData.error);
      } else if (response.status === 500) {
        alert(responseData.error);
      }
    } catch (error) {
      alert("Algo salió mal.");
      console.log(error.message);
    }
  };

  return (
    <div className={styles.loginView}>
      <div className={styles.imageContainer}></div>

      <div className={styles.loginContainer}>
        <h2>¡Bienvenido de vuelta!</h2>
        <h4>Ingresa tus datos</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre de Usuario</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="nombre de usuario o email"
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
            />
          </div>

          <div className={styles.internalLogin}>
            <button type="submit">Iniciar Sesión</button>
          </div>
        </form>
        <div className={styles.externalLogin}>
          <p>Tambien puedes:</p>
          <GoogleLogin />
          <FacebookLogin />
        </div>
        <p className={styles.registrate}>
          ¿No tienes una cuenta?
          <Link to="/register">
            <button>¡Regístrate!</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
