import React, {useState} from 'react';
import './attribute_dropdown.css';
import {Accordion, Form, FormGroup} from "react-bootstrap";

export default function AttributeDropdown(props) {

    const [customAttributes, setCustomAttributes] = useState(
        ["creation date", "culture", "collection", "type", "technique"]
    );

    const handleChange = (attr) => {
        if (customAttributes.includes(attr)) {
            let copy = customAttributes;
            copy.splice(copy.indexOf(attr), 1);
            setCustomAttributes(copy);
        } else {
            let copy = customAttributes;
            copy.push(attr);
            setCustomAttributes(copy);
        }
        props.attributeHandler(customAttributes);
    }

    return (
        <Accordion>
            <Accordion.Item eventKey={0}>
                <Accordion.Header> Clustering Attributes </Accordion.Header>
                <Accordion.Body>
                    <FormGroup>
                        <Form.Check
                            label={"Creation Date"}
                            defaultChecked={customAttributes.includes("creation date")}
                            onChange={() => handleChange("creation date")}
                        />
                        <Form.Check
                            label={"Culture"}
                            defaultChecked={customAttributes.includes("culture")}
                            onChange={() => handleChange("culture")}
                        />
                        <Form.Check
                            label={"Collection"}
                            defaultChecked={customAttributes.includes("collection")}
                            onChange={() => handleChange("collection")}
                        />
                        <Form.Check
                            label={"Type"}
                            defaultChecked={customAttributes.includes("type")}
                            onChange={() => handleChange("type")}
                        />
                        <Form.Check
                            label={"Technique"}
                            defaultChecked={customAttributes.includes("technique")}
                            onChange={() => handleChange("technique")}
                        />
                    </FormGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}