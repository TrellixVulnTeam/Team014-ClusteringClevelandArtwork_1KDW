import React, {useState, useEffect} from 'react';
import CustomizationPanel from "./customization_panel";
import './kmeans.css';

export default function KMeans() {

    const [numArtworks, setNumArtworks] = useState(100);
    const [kVal, setkVal] = useState(5);
    const [customFeatures, setCustomFeatures] = useState(["creation date", "culture", "collection", "type", "technique"]);

    return (
        <div>
            <CustomizationPanel id={"panel-wrapper"} numArtHandler={setNumArtworks} kHandler={setkVal} attributesHandler={setCustomFeatures}/>
        </div>
    )

}