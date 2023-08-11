import React from "react";
import { useState } from "react";  
import ItemList from "./ItemList";

const Generator = ({ invoiceData, onInvoiceDataChange, addItem, removeItem })=>{
    const { items } = invoiceData;

    return(
        <div>
          
            <ItemList
                items={items}
                onItemChange={(index, field, value) => onInvoiceDataChange(index, field, value)}
                onRemoveItem={removeItem}
                addItem={addItem}
            />

        </div>
    );
}

export default Generator;