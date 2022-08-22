import {  useState } from "react";
import { api } from "./api";
import { Link, Redirect } from "react-router-dom";
import alertify from 'alertifyjs'

const YorumDuzenle = (props) => {
  const { id } = props.match.params;
  const path = props.location.pathname.substring(
    0,
    props.location.pathname.length - 4
  );
  const YORUM_INITIAL = {
    display_name: props.location.state.name,
    body: props.location.state.yorum,
  };
  const [commentBody, setCommentBody] = useState(YORUM_INITIAL);
  const [direct, setDirect] = useState(false);

  const handleOnChange = (event) => {
    setCommentBody({ ...commentBody, [event.target.name]: event.target.value });
  };

  const handleCommentSubmit = (event, commentBody) => {
    event.preventDefault();
    api()
      .put(`${path}`, commentBody)
      .then((response) => {
        console.log("res",response);
        props.history.push(`/posts/${props.location.state.post}`);
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
        alertify.error(error.response.data.errorMessage);
      });
    //setDirect(true)
  };

  const direction = () => {
      console.log("direct olmuyor")
    return <Redirect to={`/posts/${props.location.state.post}`} />;
  };
  console.log("direk:", direct);
  return (
    <div>
    <h3>YORUM DUZENLEME FORMU</h3>
      <form
        className="ui form"
        onSubmit={(event) => {
          handleCommentSubmit(event, commentBody);
        }}
      >
        <div className="ui mini icon input">
          <input
            disabled
            name="display_name"
            type="text"
            value={commentBody.display_name}
          />
        </div>
        <div className="field">
          <textarea
            name="body"
            placeholder={commentBody.body}
            onChange={handleOnChange}
            value={commentBody.body}
          ></textarea>
        </div>
        <button className="ui black button" onClick={() => direction()}>
          Yorumu Gönder
        </button>
        <Link
          className="ui black button"
          to={`/posts/${props.location.state.post}`}
        >
          Yorumlara Dön
        </Link>
      </form>
    </div>
  );
};

export default YorumDuzenle;
