import { Link } from "@mui/material";
import Header from "../../Components/Layout/Header";
import Main from "../../Components/Layout/Main";
import CreateEditNote from "./Components/CreateEditNote";
import './style.css'
import NoteCard from "../../Components/NoteCard";
import RestoreNote from "./Components/RestoreNote";
import DeleteNote from "./Components/DeleteNote";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAlertMessage } from "../../Context/Notifications";

const ArchivedNotes=()=>{
    const [notes, setnotes] = useState([])
    const [actualizarData,setActualizarData]=useState(false)
    const {showError}=useAlertMessage()
    const baseURL="https://ensolvers-challenge-fernando-c.herokuapp.com"
    let navigate=useNavigate()
    useEffect(() => {
      axios.get(`${baseURL}/notes/archived`).then(
        (res)=>{
            setnotes(res.data)
        }
      ).catch(e=>{ 
        showError(`Error: ${e.message}`)
      })
    },[actualizarData])
    return <>
    <Header title="Archived notes">
        <Link className="link" onClick={()=>navigate("/")}> {"< Go back to unarchived notes"}</Link>
    </Header>
    <Main >
        {notes.length!==0?notes.sort((a,b)=>a.id-b.id).filter((note)=>note.archived===true).map(
            (note,index)=>
            <NoteCard key={index} title={note.title} content={(note.updatedAt).split("T")[0]}>
                <RestoreNote setActualizarData={setActualizarData} actualizarData={actualizarData} note={note}/>
                <CreateEditNote setActualizarData={setActualizarData} actualizarData={actualizarData} edit note={note}/>
                <DeleteNote setActualizarData={setActualizarData} actualizarData={actualizarData} note={note}/>
            </NoteCard>):<h3>There are no notes in this section</h3>
        }
    </Main>
    </>
}

export default ArchivedNotes;