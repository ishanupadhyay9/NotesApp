
const router = require('express').Router();
const { addnote, editnote, getallnotes, deleteNote, updatepinned, search } = require('../contollers/notescontrollers');
const {signup,login, getuser} = require("../contollers/signup");
const { authenticateToke } = require('../utils');

router.post('/Signup',signup);
router.post('/Login',login);
router.post('/add-note',authenticateToke,addnote);
router.put('/edit-note/:noteId',authenticateToke,editnote);
router.get('/get-all',authenticateToke,getallnotes);
router.delete('/delete-note/:noteId',authenticateToke,deleteNote);
router.put('/pinned/:noteId',authenticateToke,updatepinned);
router.get('/get-user',authenticateToke,getuser);
router.get('/search-notes/',authenticateToke,search);
module.exports= router;