import React, { useEffect, useState } from "react";
import {api} from "./api";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const YaziListesi = (props) => {
  const [yaziListesi, setYaziListesi] = useState([]);

  useEffect(() => {
    api()
      .get("/posts")
      .then((Response) => {
        setYaziListesi(Response.data);
      });
  }, []);

  return (
    <>
    <div>
    <i className="tr flag"></i>    <i className="book icon"></i>
<h3 align="center">Türkçe Yazı Yorum Uygulaması</h3>

    </div>

    <div>
     <Link to="/yaziekle"> <b>Yazı Ekle</b></Link>
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
              <div className="description">{yazi.created_at}</div>
            </div>
          </div>
        );
      })}
    </div>
    </>
   
  );
};

export default YaziListesi;
