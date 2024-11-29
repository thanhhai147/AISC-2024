import React from "react";
import "../assets/css/featureIntro.css";
import tinhNang from '../assets/img/tinh-nang-noi-bat.png';


export default function FeatureIntro() {
    return (
        <div className="feature-container">
            <p className="title font-family-semibold primary-color">Tính năng nổi bật</p>
            <img src={tinhNang} alt="Tính năng nổi bật"/>
        </div>
    );
}
                
                
                
                
                