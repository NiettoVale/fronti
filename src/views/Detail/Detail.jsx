import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import NavBar from "../../Components/NavBar/navBar";
import axios from "axios";

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cardDetail, setCardDetail] = useState({});
  const [imageDetail, setImageDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ecommerflipante.onrender.com/detail/${id}`
        );

        const data = await response.json();

        if (response.status === 200) {
          setCardDetail(data);
          setImageDetail(data.images);
        } else if (response.status === 400) {
          alert(data.error);
        } else if (response.status === 500) {
          alert(data.error);
        }
      } catch (error) {
        alert("Algo salió mal!!!");
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://ecommerflipante.onrender.com/products/${cardDetail.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate("/home");
      } else {
        alert("Algo salió mal");
        console.log(response.statusText);
      }
    } catch (error) {
      alert("Algo salió mal");
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <Link to={"/home"}>
        <button className={styles.backButton}>⬅</button>
      </Link>

      <div className={styles.detailContainer}>
        <div className={styles.imgContainer}>
          {imageDetail.map((url, index) =>
            url ? (
              <img
                src={url}
                alt={cardDetail.name}
                className={index === 0 ? styles.mainImage : styles.thumbnail}
              />
            ) : null
          )}
        </div>

        <div className={styles.detailInfo}>
          <p className={styles.detailName}>{cardDetail.name}</p>

          <div className={styles.sizesButtons}>
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </div>

          <div>
            <p className={styles.detailDescription}>{cardDetail.description}</p>
            <p className={styles.detailGender}>Genero: {cardDetail.gender}</p>
            <p className={styles.detailCategory}>
              Categoria: {cardDetail.category}
            </p>
            <p className={styles.detailMaterial}>
              Material Principal: {cardDetail.mainMaterial}
            </p>
          </div>

          <p className={styles.detailPrice}>${cardDetail.price}</p>

          <div className={styles.detailButtons}>
            <button className={styles.favButton}>AGREGAR A FAVORITOS</button>
            <button className={styles.cartButton}>AGREGAR AL CARRITO</button>
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleDelete}>BORRAR PRENDA</button>
      </div>
    </div>
  );
}
