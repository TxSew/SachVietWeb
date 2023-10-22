import React from "react";
import { Link } from "react-router-dom";

function CartUser({ user }: any) {
  console.log(user);

  return (
    <div>
      {user?.orderDetail?.map((e: any) => {
        console.log(e);

        return (
          <div className="cart-item row p-3" key={e.id}>
            <div className="cart-item-checkbox c-2 l-1 m-1">
              <input type="checkbox" />
            </div>
            <div className="cart-item-image c-3 l-3 m-3">
              <img src={e?.product?.image} alt="ảnh" width={56} />
            </div>
            <div className="cart-item-title c-5 l-3 m-3">
              <h2>{e?.product?.title}</h2>
              <span>{e?.price}</span>
            </div>
            <div className="cart-item-quantity c-0 l-2 m-2">
              <p>{e.quantity} (Cái)</p>
            </div>
            <div className="cart-item-money c-0 l-2 m-2">
              <span>{e.quantity * e?.price}</span>
            </div>
            <div className="cart-item-status c-2 l-1 m-1">
              <span>Trạng thái</span>
            </div>
            <div className="cart-item-ct pt-3">
              <Link to="">Xem chi tiết</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CartUser;
