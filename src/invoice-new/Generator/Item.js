import React from 'react';
import './Item.css';

function Item({ item, onItemChange, onRemoveItem }) {
    return (
        <div className="item">
            <input
                type="text"
                placeholder="Description"
                className="name"
                value={item.description}
                onChange={(e) => onItemChange('description', e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                className="quantity" // Apply common input field style
                value={item.quantity}
                onChange={(e) => onItemChange('quantity', parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Rate"
                className="unit-cost" // Apply common input field style
                value={item.rate}
                onChange={(e) => onItemChange('rate', parseFloat(e.target.value))}
            />
            <input
                type="number"
                placeholder="Amount"
                className="amount" // Apply common input field style
                value={item.amount}
                readOnly
            />
            <span onClick={onRemoveItem} className="remove-button">✖</span>
        </div>
    );
}

export default Item;
