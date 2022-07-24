import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { IconButton, TextField, Tooltip } from '@mui/material';
import '../style.css'
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios"
import { useAlertMessage } from '../../../Context/Notifications';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateEditNote=({edit=false,note={},actualizarData,setActualizarData})=> {
  const baseURL="http://localhost:4000"
  const {showSuccess,showError}=useAlertMessage()
  const [loading, setloading] = useState(false)
  const [open, setOpen] = useState(false);
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");

  const handleClickOpen = () => {
    if(!edit){
      setTitle("")
      setContent("")
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(edit){
      setTitle(note.title)
      setContent(note.content)
    }
  },[note,edit])

  const submit=async ()=>{
    setloading(true)
    if(edit){
      await axios.put(`${baseURL}/notes/${note.id}`,{
        title,
        content
      }).then(res=>{        
        setActualizarData(!actualizarData)
        handleClose()
        showSuccess("Note updated.")
        setloading(false)
      }).catch(()=>{
        handleClose()
        showError("Note not updated.")
        setloading(false)
      })
    }else{
      await axios.post(`${baseURL}/notes`,{
        title,
        content
      }).then(res=>{
        console.log("1")
        setActualizarData(!actualizarData)
        console.log("2")
        handleClose()
        console.log("3")
        showSuccess("Note created.")
        console.log("4")
        setloading(false)
        console.log("5")
      }).catch(()=>{
        handleClose()
        showError("Note not created.")
        setloading(false)
      })
    }
  }
  

  return (
    <>
      {edit?
      <Tooltip title="Edit">
        <IconButton color="primary" onClick={handleClickOpen}>
          <EditIcon/>
        </IconButton>
      </Tooltip>:
      <Button sx={{"marginLeft":"1rem","marginRight":"1rem"}} size="small" variant="outlined" onClick={handleClickOpen}>
        Create note
      </Button>
      }      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={"md"}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{edit?"Edit note":"Create note"}</DialogTitle>
        <DialogContent className='main-content'>
            <div className='input'>
                <TextField
                id="title"
                fullWidth
                label="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className='input'>
            <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                fullWidth
                rows={4}
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                />
            </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            onClick={submit}
          >
            Save
          </LoadingButton>
        </DialogActions>
        </Dialog>
    </>
  );
}

export default CreateEditNote
