
import YorumFormu from "./YorumFormu";
import YorumListesi from "./YorumListesi";

const YaziYorumları = (props) => {
    console.log("yazı id",props.yaziid)
  return (
<>
    <YorumListesi open={props.open} hata={props.hata} show={props.show} close={props.close} handleDelete={props.handleDelete} yaziid={props.yaziid} yorumlar={props.yorumlar}></YorumListesi>
    <YorumFormu handleCommentSubmit={props.handleCommentSubmit} ></YorumFormu>
    </>
  )
};

export default YaziYorumları;
