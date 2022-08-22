import React, { useState } from "react";
import { Link } from "react-router-dom";

const YORUM_INITIAL = {
    display_name: "",
    body: "",
  }

const YorumFormu = (props) => {
    const [commentBody, setCommentBody] = useState(YORUM_INITIAL);
    const handleOnChange = (event) => {
        setCommentBody({ ...commentBody, [event.target.name]: event.target.value });
      };

  return (
    <>
      <h3>Yorum Yaz</h3>
      <form className="ui form" onSubmit={(event)=>
      {props.handleCommentSubmit(event,commentBody);
        setCommentBody(YORUM_INITIAL)
      }}>
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
        <Link
          className="ui black button"
          to="/"
        >
          AnaSayfaya Dön
        </Link>
      </form>
    </>
  );
};
export default YorumFormu;
