import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { DialogContentText, IconButton, Tooltip } from '@mui/material';
import '../style.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAlertMessage } from '../../../Context/Notifications';
import axios from "axios"
import LoadingButton from '@mui/lab/LoadingButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteNote=({note={},actualizarData,setActualizarData})=> {
  const [open, setOpen] = useState(false);
  const baseURL="https://ensolvers-challenge-fernando-c.herokuapp.com"
  const {showSuccess,showError}=useAlertMessage()
  const [loading, setloading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit=async ()=>{
    setloading(true)    
      await axios.delete(`${baseURL}/notes/${note.id}`,{
        archived:true
      }).then(res=>{        
        setActualizarData(!actualizarData)
        handleClose()
        showSuccess("Note archived.")
        setloading(false)
      }).catch(()=>{
        handleClose()
        showError("Note not archived.")
        setloading(false)
      })
   
  }

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton color="primary" onClick={handleClickOpen}>
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={"md"}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete note</DialogTitle>
        <DialogContent className='main-content'>
            <DialogContentText>Are you sure you want to delete this note?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton 
            loading={loading}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="outlined"
            onClick={submit}
          >
            Yes
          </LoadingButton>
          <Button variant="outlined" onClick={handleClose}>No</Button>
        </DialogActions>
        </Dialog>
    </div>
  );
}

export default DeleteNote
