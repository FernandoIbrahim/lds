import React, { useState } from 'react'
import { useUserContext } from '../../hooks/UserContext'
import { GrTransaction } from "react-icons/gr";


function ItemTransacao(transaction) {
    const {userId} = useUserContext();
    const [icon, setIcon] = useState(null)

    function iconTransction(transaction) {

        switch(transaction.tipo) {
            case "doacao":
                if (transaction.usuario1 === userId){
                    setIcon(<GrTransaction className="text-red-500 mr-3 text-lg" />)
                }else{
                    setIcon(<GrTransaction className="text-green-500 mr-3 text-lg" />)

                }
                
                break;

            case "compra":
                setIcon(<FaShoppingCart className="text-blue-500 mr-3 text-lg" />)


                break;

        }
    }

  return (
    icon  
)
}

export default ItemTransacao