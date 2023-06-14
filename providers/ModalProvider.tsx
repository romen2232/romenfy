"use client"

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isOpen, setIsOpen]=useState(false);

    //Como se hace server side rendffering nos aseguramos de que el modal se abra una vez se haya renderizado el componente en el cliente
    useEffect(()=>{
        setIsOpen(true);
    }, []);
    if(!isOpen) return null;

    return ( <>
        <AuthModal/>
        <UploadModal/>
    </>
        );
}
 
export default ModalProvider;