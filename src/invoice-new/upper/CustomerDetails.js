import { useState } from 'react';
import React from 'react';
import './CustomerDetails.css';

function CustomerDetails({ customer, onCustomerChange }) {
    const [heading, setHeading] = useState('INVOICE');
    return (
        <div className="customer-details align-right">

            <div className='heading-container'>
                <input
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className="heading-input"
                />
            </div>
            <div className="input-group align-right">
                <div className="input-with-symbol align-right">
                    <span className="symbol-box">#</span>
                    <input
                        type="text"
                        value={customer.invoiceNumber}
                        onChange={(e) => onCustomerChange({ ...customer, invoiceNumber: e.target.value })}
                        placeholder="Invoice Number"
                    />
                </div>
            </div>
           
            <div className='input-group'>
                <label contentEditable="true">Date</label>
                <div className="input-group-all align-right">

                    <input
                        type="date"
                        value={customer.date}
                        onChange={(e) => onCustomerChange({ ...customer, date: e.target.value })}
                        placeholder="Date"
                    />
                </div>
            </div>
          
            <div className='input-group'>
                <label contentEditable="true">Payment Terms:</label>
                <div className="input-group-all align-right">
                    <input type="text" value={customer.paymentTerms} onChange={(e) => onCustomerChange({ ...customer, paymentTerms: e.target.value })} />
                </div>
            </div>
            
            <div className='input-group'>
                <label contentEditable="true">Due Date:</label>
                <div className="input-group-all align-right">
                    <input type="date" value={customer.dueDate} onChange={(e) => onCustomerChange({ ...customer, dueDate: e.target.value })} />
                </div>
            </div>
           
            <div className='input-group'>
                <label contentEditable="true">PO Number:</label>
                <div className="input-group-all align-right">
                    <input type="text" value={customer.poNumber} onChange={(e) => onCustomerChange({ ...customer, poNumber: e.target.value })} />
                </div>
            </div>
            
        </div>
    );
}

export default CustomerDetails;
