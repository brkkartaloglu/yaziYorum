import { Link, useHistory } from "react-router-dom";
import SilModulYorum from "./SilModulYorum";



const YorumListesi = (props) => {
  console.log("yaziid in yorum listei", props.yaziid);

  return (
    <>
      <h3>Yorumlar</h3>
      {props.yorumlar.map((yorum) => {
        return (
          <div className="ui relaxed list" key={yorum.id}>
            <div className="item">
              <img
                className="ui avatar image"
                src="https://semantic-ui.com/images/avatar2/small/matthew.png"
              ></img>
              <div className="content">
                <span className="header">{yorum.display_name}</span>
                <div className="description">{yorum.body}</div>
              </div>
            </div>
            <div className="ui buttons">
              <Link
                className="ui  blue basic button"
                to={{
                  pathname: `/posts/${props.yaziid}/comments/${yorum.id}/edit`,
                  state: {
                    yorum: yorum.body,
                    name: yorum.display_name,
                    post: props.yaziid,
                  },
                }}
              >
                Düzenle
              </Link>
 
              <SilModulYorum open={props.open} hata={props.hata} show={props.show} close={props.close} handleDelete={props.handleDelete} yorum={yorum} post={props.yaziid} ></SilModulYorum>
            </div>
            {/* {duzenleAlani?(<div className="field">
    <textarea
      name="body"
      //placeholder="Yorumunuz..."
      onChange={handleOnChange}
      value={yorum.body}
    ></textarea>
    <br></br>
    <button className="ui  black basic button">Gönder</button>
  </div>):" "} */}
          </div>
        );
      })}
    </>
  );
};

export default YorumListesi;
