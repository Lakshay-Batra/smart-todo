import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useTodoContext } from "../../contexts/todoContext";
import { List } from "../../types/listTypeStore";
import ListModal from "../ListModal/ListModal";

type CreateListModalProps = {
  show: boolean;
  handleClose: () => void;
};

function CreateListModal(props: CreateListModalProps) {
  const { dispatch: listsDispatch } = useTodoContext();
  const [listNameInput, setListNameInput] = useState("");
  const [listToBeShown, setListToBeShown] = useState<List>();
  const [showListModal, setShowListModal] = useState(false);
  const handleClose = () => {
    setListNameInput("");
    props.handleClose();
  };
  const createList = () => {
    if (!listNameInput) return;
    const newList = { id: uuidv4(), name: listNameInput.trim(), tasks: [] };
    listsDispatch({
      type: "ADD_LIST",
      list: newList,
    });
    setListToBeShown(newList);
    setShowListModal(true);
    props.handleClose();
  };
  return (
    <>
      <Modal show={props.show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            autoFocus
            placeholder="Enter list name"
            aria-label="Enter list name"
            aria-describedby="basic-addon2"
            onChange={(e) => setListNameInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createList}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <ListModal
        show={showListModal}
        handleClose={() => setShowListModal(false)}
        list={listToBeShown}
      />
    </>
  );
}

export default CreateListModal;
