import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useTodoContext } from "../../contexts/todoContext";
import { List } from "../../types/listTypeStore";

type DeleteListModalProps = {
  show: boolean;
  handleClose: () => void;
  list: List | undefined;
};

function DeleteListModal(props: DeleteListModalProps) {
  const { dispatch: listsDispatch } = useTodoContext();
  const handleClose = () => {
    props.handleClose();
  };
  const deleteList = () => {
    if (props.list)
      listsDispatch({
        type: "DELETE_LIST",
        listId: props.list.id,
      });
    props.handleClose();
  };
  return (
    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete list{" "}
        <b>{props.list && props.list.name}</b>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteList}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteListModal;
