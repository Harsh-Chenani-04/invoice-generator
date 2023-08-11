import React, { useState } from 'react';
// import Item from '../Item/Item';
import './ItemList.css';
import Item from './Item';
function ItemList({ items, onItemChange, onRemoveItem, addItem }) {
    const [Name, setName] = useState('Name');
    const [Quantityb, setQuantityb] = useState('Quantity');
    const [unit, setunit] = useState('Unit cost');
    const [Amountx, setAmountx] = useState('Amount');
    return (

        <div>
            <div className="items-table-header">
                <div className="name">

                    <input
                        type="text"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-label"
                    />
                </div>
                <div className="quantity">
                    <input
                        type="text"
                        value={Quantityb}
                        onChange={(e) => setQuantityb(e.target.value)}
                        className="input-label"
                    />
                </div>
                <div className="unit_cost">
                    <input
                        type="text"
                        value={unit}
                        onChange={(e) => setunit(e.target.value)}
                        className="input-label"
                        required=""
                    />
                </div>
                <div className="amount">
                    <input
                        type="text"
                        value={Amountx}
                        onChange={(e) => setAmountx(e.target.value)}
                        className="input-label"
                    />
                </div>


            </div>
            {items.map((item, index) => (
                <Item
                    key={index}
                    item={item}
                    onItemChange={(field, value) => onItemChange(index, field, value)}
                    onRemoveItem={() => onRemoveItem(index)}
                />
            ))}

            <button onClick={addItem} className="add-item-button">+ Line Item</button>
        </div>
    );
}

export default ItemList;
