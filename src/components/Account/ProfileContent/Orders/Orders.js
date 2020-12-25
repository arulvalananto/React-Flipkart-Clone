import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [loading, setLoading] = useState(true);
    
    return (
        <div className="orders">
           {loading ? (
            "Loading Orders..."
         ) : (
            <>
               <h4>orders</h4>
            </>
         )}
        </div>
    )
}

export default Orders
