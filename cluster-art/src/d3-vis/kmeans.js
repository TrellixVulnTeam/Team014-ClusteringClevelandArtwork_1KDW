import React, {useState} from 'react';
import CustomizationPanel from "./components/customization_panel";
import './kmeans.css';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function KMeans() {

    const [status, setStatus] = useState(0);
    const errorMessages = [
        "",
        "Please enter a valid number of art works (2-30000).",
        "Please enter a valid number of clusters (2-30).",
        "Please choose at least 2 attributes for clustering."
    ]

    return (
        <div>
            <CustomizationPanel
                id={"panel-wrapper"}
                statusHandler={setStatus}
            />

            <Modal show={status !== 0} onHide={() => setStatus(0)}>
                <Modal.Header closeButton={true}>
                    <Modal.Title> Invalid input. </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessages[status]}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setStatus(0)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}