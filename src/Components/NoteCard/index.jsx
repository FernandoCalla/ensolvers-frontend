import { Card } from "@mui/material"
import "./styles.css"
import NoteIcon from '@mui/icons-material/Note';

const NoteCard=({title="Titulo",content="Contenido",children})=>{
    return <Card elevation={5} className="card">
        <div className="icon"><NoteIcon sx={{"fontSize":"80px"}}/></div>
        <div className="content">
            <h3>
                <b>{title}</b>
            </h3>
            <p>Lost edited: {content}</p>
        </div>
        <div className="icons">{children}</div>  
    </Card>
}

export default NoteCard