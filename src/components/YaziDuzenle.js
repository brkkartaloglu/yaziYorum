import { useEffect, useState } from "react";
import { api } from "./api";
import YaziFormu from "./YaziFormu"

const YaziDuzenle = (props)=>{
    const { id } = props.match.params;
    const [yazi,setYazi]=useState({});
    console.log(id)
    useEffect(()=>{
        api().get(`/posts/${id}`).then(response=>{
            setYazi({title:response.data.title, content:response.data.content})
        })
    },[])
    return(
        <div>
        <h3>YAZI DUZENLEME FORMU</h3>
            <YaziFormu yazi={yazi}></YaziFormu>
        </div>
    )
}

export default YaziDuzenle;