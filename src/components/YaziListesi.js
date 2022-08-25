import React, { useEffect, useState } from "react";
import { api } from "./api";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaGithub } from "react-icons/fa";

const YaziListesi = (props) => {
  const [yaziListesi, setYaziListesi] = useState([]);

  useEffect(() => {
    api()
      .get("/posts")
      .then((Response) => {
        setYaziListesi(Response.data);
      });
  }, []);

  const handleDelete = (yaziListesi) => {
    let login = prompt("Please enter password");

    if (login === "bk") {
      for (let yazi in yaziListesi) {
        api()
          .delete(`/posts/${yaziListesi[yazi].id}`)
          .then(() => {
            setYaziListesi([]);
          })
          .catch(() => {
            console.log("Yazıları silme işleminde hata oluştu");
          });
      }
    } else {
      alert("wrong password");
    }
  };
  return (
    <>
      <div>
        <i className="tr flag"></i> <i className="book icon"></i>
        <Link to={"/about"} className="header">
          <FaGithub></FaGithub>
        </Link>
        <h3 align="center">Türkçe Yazı Yorum Uygulaması</h3>
      </div>
      <div>
        <Link to="/yaziekle">
          {" "}
          <b>Yazı Ekle</b>
        </Link>
      </div>
      <div className="ui relaxed divided list">
        {yaziListesi.map((yazi) => {
          return (
            <div className="item" key={yazi.id}>
              <i className="large github middle aligned icon"></i>
              <div className="content">
                <Link to={`/posts/${yazi.id}`} className="header">
                  {yazi.title}
                </Link>
                <div className="description">
                  {moment(yazi.created_at).format("MMM Do YY")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br></br>
      <button
        className="ui  red basic button"
        onClick={() => handleDelete(yaziListesi)}
      >
        Tüm Yazıları Sil
      </button>
    </>
  );
};

export default YaziListesi;
