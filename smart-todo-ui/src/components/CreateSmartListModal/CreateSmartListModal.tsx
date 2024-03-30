import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./CreateSmartListModal.css";
import { useTodoContext } from "../../contexts/todoContext";
import { List } from "../../types/listTypeStore";
import ListModal from "../ListModal/ListModal";
import { Spinner } from "react-bootstrap";

type CreateSmartListModalProps = {
  show: boolean;
  handleClose: () => void;
  inputTask: string;
  listSuggestion: { listName: string; isNewList: boolean };
  isLoading: boolean;
};

function CreateSmartListModal(props: CreateSmartListModalProps) {
  const { state: listsState, dispatch: listsDispatch } = useTodoContext();
  const [listNameInput, setListNameInput] = useState("");
  const [existingListsWithInputKeyword, setExistingListsWithInputKeyword] =
    useState<List[]>([]);
  const [listToBeShown, setListToBeShown] = useState<List>();
  const [showListModal, setShowListModal] = useState(false);

  useEffect(() => {
    if (
      props.listSuggestion &&
      props.listSuggestion.listName &&
      props.listSuggestion.isNewList
    ) {
      setListNameInput(props.listSuggestion.listName);
    }
  }, [props.listSuggestion]);

  const resetStates = () => {
    setListNameInput("");
    setExistingListsWithInputKeyword([]);
  };
  const handleClose = () => {
    resetStates();
    props.handleClose();
  };
  const handleListInputChange = (listName: string) => {
    setListNameInput(listName);
    if (!listName) {
      setExistingListsWithInputKeyword([]);
      return;
    }
    if (listName === props.listSuggestion.listName && props) return;
    else
      setExistingListsWithInputKeyword(
        listsState.filter(({ name }) =>
          name.toLowerCase().includes(listName.toLowerCase())
        )
      );
  };
  const addToExistingList = (list: List) => {
    setListToBeShown(list);
    listsDispatch({
      type: "ADD_TASK",
      listId: list.id,
      task: {
        id: uuidv4(),
        title: props.inputTask,
        timestamp: +new Date(),
        completed: false,
      },
    });
    setShowListModal(true);
    handleClose();
  };
  const createList = (listName: string) => {
    const newList = {
      id: uuidv4(),
      name: listName,
      tasks: [
        {
          id: uuidv4(),
          title: props.inputTask,
          timestamp: +new Date(),
          completed: false,
        },
      ],
    };
    listsDispatch({
      type: "ADD_LIST",
      list: newList,
    });
    setListToBeShown(newList);
    setShowListModal(true);
    handleClose();
  };
  const handleAddToList = () => {
    if (props.isLoading) return;
    if (!props.listSuggestion.isNewList) {
      const listName = listNameInput || props.listSuggestion.listName;
      addToExistingList(listsState.filter(({ name }) => name === listName)[0]);
    } else {
      createList(listNameInput || props.listSuggestion.listName);
    }
  };
  return (
    <>
      <Modal show={props.show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add to List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!props.isLoading ? (
            <>
              <div className="ai-suggestion-container">
                <div style={{ marginBottom: "10px" }}>
                  <span className="text-uppercase fw-bold">
                    System suggests:
                  </span>{" "}
                  existing list{" "}
                  <span className="suggested-list-name">
                    {props.listSuggestion.listName}
                  </span>{" "}
                  for task
                </div>
                <div className="input-task">{props.inputTask}</div>
              </div>

              <Form.Control
                placeholder="Use this space to create or select a different list"
                aria-label="Use this space to create or select a different list"
                aria-describedby="basic-addon2"
                value={listNameInput}
                onChange={(e) => handleListInputChange(e.target.value)}
              />
              <div className="position-relative">
                {existingListsWithInputKeyword.length ? (
                  <div className="list-search-results-container">
                    <div className="btn-close-list-search-results">
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setExistingListsWithInputKeyword([])}
                      ></button>
                    </div>
                    {existingListsWithInputKeyword.map((list) => (
                      <div
                        className="list-search-result-item"
                        onClick={() => addToExistingList(list)}
                        key={list.id}
                      >
                        <span className="text-truncate">{list.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddToList}>
            Add
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

export default CreateSmartListModal;
