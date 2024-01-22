const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');


const getContacts = asyncHandler( async (req, res)=>{
    const contacts = await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts);
});


const createContact = asyncHandler( async (req, res)=>{
    console.log(req.body);

    const {name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error ("Donnée manquant");
    }

    const contact =  await Contact.create({
        user_id: req.user.id,
        name,
        email,
        phone,
    })
    res.status(201).json(contact);
});


const getContact = asyncHandler( async (req, res)=>{

    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("contact non trouvé");
    }

    res.status(200).json(contact);
});


const updateContat = asyncHandler( async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact non trouvé");
    }

    if(contact.user_id.toString() !== req.user.id ){
        res.status(403);
        throw new Error("Non autoriser");
    }
    const update = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(update);
});

const deleteContat = asyncHandler( async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact non trouvé");
    }

    
    if(contact.user_id.toString() !== req.user.id ){
        res.status(403);
        throw new Error("Non autoriser");
    }

    const delet = await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(delet);
});

module.exports = {
    getContact,
    getContacts,
    createContact, 
    deleteContat,
    updateContat
}