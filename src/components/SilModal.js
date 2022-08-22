import React, { useState } from "react";
import { Button, Icon, Modal } from 'semantic-ui-react'
import { api } from "./api";

const SilModal = ({yazi,push}) => {
  const [open, setOpen] = useState(false);
  const [hata, setHata] = useState("");
  const show =()=>setOpen(true);
  const close=()=>setOpen(false)

  console.log("control:",yazi)

  const handleDelete=(id)=>{
    api()
    .delete(`/posts/${id}`)
    .then(()=>{
        setHata("")
        //modal close
        close();
        //push
        push("/")
    })
    .catch(()=>{
        setHata("Yazıyı silme işleminde hata oluştu")
    })
  }

  return <React.Fragment>
  <Button className="ui  red basic button" onClick={show}>Sil</Button>

   <Modal
   size="mini"
   open={open}
   onClose={close}
   >
    <Modal.Header>Yazıyı Sil</Modal.Header>
    <Modal.Content>
        <p>
        <b>{yazi.title}</b>
        Bu yazıyı silmek istiyor musunuz?</p>
        {hata&&<p>{hata}</p>}
    </Modal.Content>
    <Modal.Actions>
    <Button negative onClick={close}>
    <Icon name='remove' /> İptal Et
          </Button>
          <Button positive onClick={()=>handleDelete(yazi.id)}>
          <Icon name='checkmark' /> Sil
          </Button>
    </Modal.Actions>

   </Modal>
   </React.Fragment>;
};

export default SilModal;
