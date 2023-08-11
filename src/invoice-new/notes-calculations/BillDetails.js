import React, { useState } from 'react';
import './BillDetails.css';

function BillDetails({ calculateSubtotal,
    calculateDiscountAmount,
    calculateSubtotalAfterDiscount,
    calculateTaxAmount,
    calculateTotal,
    calculateBalanceDue,
    discountPercentage,
    setDiscountPercentage,
    taxPercentage,
    setTaxPercentage,
    shippingCharges,
    setShippingCharges,
    amountPaid,
    setAmountPaid, showDiscountInput,
    handleCancelDiscount,
    handleAddDiscount, showTaxInput,
    handleCancelTax,
    handleAddTax,
    showShippingInput,
    handleCancelShipping,
    handleAddShipping }) {
    
    
    return (
        <div className="right-side bill-details">

            <div className='subtotal'>
                <span contentEditable="true">Subtotal: ${calculateSubtotal()}</span>
            </div>
            {showDiscountInput ? (
                <div className="input-container">
                    <div className="input-right">
                        <label contentEditable="true">Discount (%):</label>
                        <input className='input-group-all'
                            type="number"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                        />
                    </div>
                    <span className="cancel-button" onClick={handleCancelDiscount}>
                        X
                    </span>
                </div>
            ) : (
                <button className="add-button" onClick={handleAddDiscount}>
                    + Discount
                </button>
            )}



            {showTaxInput ? (
                <div className="input-container">
                    <div className="input-right">
                        <label>Tax (%):</label>
                        <input className='input-group-all'
                            type="number"
                            value={taxPercentage}
                            onChange={(e) => setTaxPercentage(e.target.value)}
                        />
                    </div>
                    <span className="cancel-button" onClick={handleCancelTax}>
                        X
                    </span>
                </div>
            ) : (
                <button className="add-button" onClick={handleAddTax}>
                    + Tax
                </button>
            )}

            {showShippingInput ? (
                <div className="input-container">
                    <div className="input-right">
                        <label>Shipping Charges:</label>
                        <input className='input-group-all'
                            type="number"
                            value={shippingCharges}
                            onChange={(e) => setShippingCharges(parseFloat(e.target.value))}
                        />
                    </div>
                    <span className="cancel-button" onClick={handleCancelShipping}>
                        X
                    </span>
                </div>
            ) : (
                <button className="add-button" onClick={handleAddShipping}>
                    + Shipping
                </button>
            )}

            <div className="total-container">
                <span contentEditable="true">Total:</span> ${calculateTotal()}
            </div>
            <div className="input-container">
                <div className="input-right">
                    <label contentEditable="true">Amount Paid : </label>
                    <input className='input-group-all'
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
                    />
                </div>
            </div>
            <div className="balance-container">
                <span contentEditable="true">Balance Due:</span> ${calculateBalanceDue()}
            </div>
        </div>
    );
}

export default BillDetails;
