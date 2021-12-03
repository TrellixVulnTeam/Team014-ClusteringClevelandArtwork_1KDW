import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from "react-bootstrap/FormControl";
import AttributeDropdown from "./attribute_dropdown";
import {FormGroup} from "react-bootstrap";

import './customizational_panel.css';

export default function CustomizationPanel(props) {

    const [numArtworks, setNumArtworks] = useState(100);
    const [kValue, setkValue] = useState(5);
    const [customFeatures, setCustomFeatures] = useState(
        ["creation date", "culture", "collection", "type", "technique"]
    );

    return (
        <div>
            <Card id={"panel-container"}>
                <Card.Body>
                    <FormGroup onSubmit={() => {
                        props.numArtHandler(numArtworks);
                        props.kHandler(kValue);
                        props.attributesHandler(customFeatures);
                    }}>
                        <Card.Title>
                            Customize Parameters
                        </Card.Title>
                        <Card.Subtitle>
                            Number of Artworks (Cleveland Museum of Art)
                        </Card.Subtitle>
                        <InputGroup size={"sm"} id={"num-artworks-input"}>
                            <FormControl
                                type={"number"}
                                onChange={
                                    (e) => props.numArtHandler(e.target.valueAsNumber)}
                                defaultValue={numArtworks}
                            />
                        </InputGroup>
                        <Card.Subtitle>
                            Number of clusters (k)
                        </Card.Subtitle>
                        <InputGroup size={"sm"} id={"num-artworks-input"}>
                            <FormControl
                                type={"number"}
                                onChange={(e) => props.kHandler(e.target.valueAsNumber)}
                                defaultValue={kValue}
                            />
                        </InputGroup>
                        <AttributeDropdown attributeHandler={props.attributesHandler}/>
                        <Button style={{float: "right"}} type={"submit"}>
                            Render
                        </Button>
                    </FormGroup>
                </Card.Body>
            </Card>
        </div>
    )
}