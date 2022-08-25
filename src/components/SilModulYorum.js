import React, { useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { api } from "./api";

const SilModulYorum = ({ yorum, open, hata, show, close, handleDelete }) => {
  // const [open, setOpen] = useState(false);
  // const [hata, setHata] = useState("");
  // const show = () => setOpen(true);
  // const close = () => setOpen(false);

  // const handleDeletem=(id)=>{
  //   api()
  //   .delete(`/posts/${post}/comments/${id}`)
  //   .then(()=>{
  //       setHata("")
  //       //modal close
  //       close();
  //       //push
  //       console.log(`pushla: /posts/${post}`)
  //      // history.push(`/posts/`) //aşağıdaki durumu engellemek için anasayfadan döndürdüm
  //       history.push(`/posts/${post}`) //doğrudan buraya pushlayınca state değişmeden yansıttığından silinen yorum gözüküyor sayfayı yenileyince gidiyor
  //   })
  //   .catch(()=>{
  //       setHata("Yorumu silme işleminde hata oluştu")
  //   })
  // }

  return (
    <React.Fragment>
      <Button className="ui  red basic button" onClick={show}>
        Sil
      </Button>

      <Modal size="mini" open={open} onClose={close}>
        <Modal.Header>Yorumu Sil</Modal.Header>
        <Modal.Content>
          <p>Yorumu silmek istiyor musunuz?</p>
          {hata && <p>{hata}</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>
            <Icon name="remove" /> İptal Et
          </Button>
          <Button positive onClick={() => handleDelete(yorum.id)}>
            <Icon name="checkmark" /> Sil
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default SilModulYorum;
