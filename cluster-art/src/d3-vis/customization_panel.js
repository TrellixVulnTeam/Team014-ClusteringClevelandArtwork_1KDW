import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './customizational_panel.css';

export default function CustomizationPanel(props) {

    return (
        <div>
            <Card id={"panel-container"}>
                <Card.Body>
                    <Form>

                        <Card.Title>
                            Customize Parameters
                        </Card.Title>
                        <Card.Subtitle>
                            Number of Artworks (Cleveland Museum of Art)
                        </Card.Subtitle>
                        <Card.Subtitle>
                            Number of clusters (k)
                        </Card.Subtitle>
                        <Card.Subtitle>
                            Clustering attributes
                        </Card.Subtitle>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    )

}