import { api } from "./api";
import React, { useEffect, useState } from "react";
import YaziYorumları from "./YaziYorumlari";
import { Link, useHistory, useParams } from "react-router-dom";
import SilModal from "./SilModal";
import alertify from "alertifyjs";
import moment from "moment";

const YaziDetayi = (props) => {
  //const { id } = props.match.params;
  const { id } = useParams();
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [yorumlar, setYorumlar] = useState([]);
  //const [display_name, setDisplay_name] = useState("");
  //const [body, setBody] = useState("");

  //yorum silmek için
  const [open, setOpen] = useState(false);
  const [hata, setHata] = useState("");
  const show = () => setOpen(true);
  const close = () => setOpen(false);

  const history = useHistory();

  const handleCommentSubmit = (event, commentBody) => {
    event.preventDefault();
    api()
      .post(`/posts/${id}/comments`, commentBody)
      .then((response) => {
        setYorumlar([...yorumlar, response.data]);
      })
      .catch((error) => {
        console.log(error);
        alertify.error(error.response.data.errorMessage);
      });
  };

  // yorum sil
  const handleDelete = (commentid) => {
    api()
      .delete(`/posts/${id}/comments/${commentid}`)
      .then(() => {
        console.log("yazı detayı içinde silme işlemi ve state güncellemesi");
        setHata("");
        //modal close
        close();
        //state güncelle
        api()
          .get(`/posts/${id}/comments`)
          .then((response) => {
            setYorumlar(response.data);
          });
        //push
        history.push(`/posts/${yaziDetayi.id}`);
      })
      .catch(() => {
        setHata("Yorumu silme işleminde hata oluştu");
      });
  };

  useEffect(() => {
    //axios.all veya Promise.all
    Promise.all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
      .then((responses) => {
        setYaziDetayi(responses[0].data);
        setYorumlar(responses[1].data);
      })
      .catch((error) => {
        console.log("gelen hata:", error);
      });

    // axios
    //   .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
    //   .then((response) => {
    //     setYaziDetayi(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("gelen hata:", error);
    //   });

    // axios
    //   .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
    //   .then((response) => {
    //     console.log("gelen yorum:", response.data);
    //     setYorumlar(response.data);
    //   });
  }, []);
  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{moment(yaziDetayi.created_at).format("MMM Do YY")}</p>
      <div className="ui buttons">
        <Link
          className="ui blue basic button"
          to={`/posts/${yaziDetayi.id}/edit`}
        >
          Düzenle
        </Link>
        {/* <button className="ui  red basic button">Sil</button> */}
        <SilModal yazi={yaziDetayi} push={history.push}></SilModal>
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumları
        open={open}
        hata={hata}
        show={show}
        close={close}
        handleDelete={handleDelete}
        yaziid={yaziDetayi.id}
        yorumlar={yorumlar}
        handleCommentSubmit={handleCommentSubmit}
      ></YaziYorumları>
      {/* <h3>Yorumlar</h3>
      {yorumlar.map((yorum) => {
        return (
          <div className="ui relaxed list" key={yorum.id}>
            <div className="item">
              <img
                className="ui avatar image"
                src="https://semantic-ui.com/images/avatar2/small/matthew.png"
              ></img>
              <div className="content">
                <a className="header">{yorum.display_name}</a>
                <div className="description">{yorum.body}</div>
              </div>
            </div>
          </div>
        );
      })} */}

      {/* <h3>Yorum Yaz</h3>
      <form
        className="ui form"
        onSubmit={ 
      
          handleCommentSubmit
        }
      >
        <div className="ui mini icon input">
          <input
            name="display_name"
            type="text"
            placeholder="Adınız..."
            onChange={handleOnChange}
            value={commentBody.display_name}
          />
        </div>
        <div className="field">
          <textarea
            name="body"
            placeholder="Yorumunuz..."
            onChange={handleOnChange}
            value={commentBody.body}
          ></textarea>
        </div>
        <button className="ui black button">Yorumu Gönder</button>
      </form> */}
    </React.Fragment>
  );
};

export default YaziDetayi;
