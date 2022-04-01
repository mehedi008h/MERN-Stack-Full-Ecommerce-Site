import React from "react";
import "./Widget.scss";
import { AiOutlineArrowUp } from "react-icons/ai";

const Widget = ({ title, icon, link, total }) => {
    const diff = 20;
    return (
        <div className="widget">
            <div className="left">
                <span className="title">{title}</span>
                <span className="counter">{total}</span>
                <span className="link">{link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <AiOutlineArrowUp />
                    {diff} %
                </div>
                {icon}
            </div>
        </div>
    );
};

export default Widget;
