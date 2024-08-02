import { Checkbox, TableCell } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MyCheckBox({handleChange,fId, pId , checkedd, edit, add }) {
       
    const [isChecked, setIsChecked] = useState(false)
    
    const { featureId } = useParams()
  
    useEffect(()=>{
           
        if (!isChecked && checkedd) {
            setIsChecked(checkedd)
        }  
    },[featureId])


    return (
        <TableCell>
            <Checkbox checked={isChecked} disabled ={add || edit} onClick={(e) => {
                let ch = e.target.checked
                  setIsChecked(!isChecked)
                handleChange(fId, pId, ch )
            }} />
        </TableCell>
    )
}




