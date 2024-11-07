import React from "react";
import "../assets/css/premium.css"

import GoldPremiumIcon from "../assets/img/gold-premium.svg"
import Button from "./button.component.js"

export default function Premium({ period, price, shortDescription, longDescription, VAT }) {
    return (
        <>
            <div className="premium-container">
                <div className="premium-icon-container d-flex flex-row">
                    <img className="premium-icon" width={25} src={GoldPremiumIcon} alt="premium-icon" />
                    <div className="premium-icon-label font-family-regular premium-color">Premium</div>
                </div>
                <div className="premium-info-container">
                    <div className="premium-period font-family-semibold primary-color">{period}</div>
                    <div className="premium-brief-container">
                        <div className="premium-price font-family-semibold primary-color">{price}</div>
                        <div className="premium-short-description font-family-semibold black-color">{shortDescription}</div>
                        <div className="premium-vat font-family-regular black-color">{VAT}</div>
                    </div>
                    <hr className="premium-line black-color"  />
                    <div className="premium-detail-container">
                        <ul className="font-family-regular primary-color">
                            {
                                longDescription.map((element, index) => (
                                    <li key={index} className="premium-long-description">
                                        {element}
                                    </li>
                                ))
                            }   
                        </ul>
                    </div>
                    <div className="premium-button-container">
                        <Button size="small" type="premium" status="active">
                            Mua ngay
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}