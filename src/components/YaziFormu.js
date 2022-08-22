import { api } from "./api";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";


const YaziFormu = (props) => {
  const [yazi, setYazi] = useState({ title: "", content: "" });
  const [hata, setHata] = useState("");

  const {id}=useParams()
  const history = useHistory()
  const onInputChange = (event) => {
    setYazi({ ...yazi, [event.target.name]: event.target.value });
    console.log(yazi);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setHata("");

    if (props.yazi?.title) {
      api()
        .put(`/posts/${id}`,yazi)
        .then((response) => {
          console.log(response);
         history.push(`/posts/${id}`);
        })
        .catch((error) => {
          setHata(error.response.data.errorMessage);
          console.log(hata);
        });
    } else {
      api()
        .post(`/posts/`, yazi)
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          setHata(error.response.data.errorMessage);
          console.log(hata);
        });
    }
  };

  useEffect(() => {
    if (props.yazi?.title && props.yazi.content) setYazi(props.yazi);
  }, [props.yazi]);

  return (
    <div>
      {hata && (
        <div className="ui error message">
          <div className="header">HATA</div>
          <p>{hata}</p>
        </div>
      )}

      <div className="ui form">
        <div className="field">
          <label>Yazı Başlığı</label>

          <input
            type="text"
            value={yazi.title}
            name="title"
            onChange={onInputChange}
          />
        </div>
        <div className="field">
          <label>Yazı içeriği</label>
          <textarea
            value={yazi.content}
            name="content"
            onChange={onInputChange}
          ></textarea>
        </div>
        <div className="ui primary submit button" onClick={onFormSubmit}>
          Gönder
        </div>
        <Link className="ui submit button" to="/">AnaSayfaya Dön</Link>
      </div>
    </div>
  );
};

export default YaziFormu;
