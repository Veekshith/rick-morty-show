import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

const Filters = ({ filterOptions, onChangeHandler, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {filterOptions.map(({ name, options }) => (
          <Form.Group controlId="formBasicCheckbox" key={name}>
            <Form.Label>{name}</Form.Label>
            {options.map(({ option, isSelected }) => (
              <Form.Check
                type="checkbox"
                size
                label={option}
                name={option}
                checked={isSelected}
                onChange={e => onChangeHandler(e, name)}
                key={option}
              />
            ))}
          </Form.Group>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Filters;
