import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";

import "./ListModal.css";
import { useTodoContext } from "../../contexts/todoContext";
import { List } from "../../types/listTypeStore";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

type ListModalProps = {
  show: boolean;
  handleClose: () => void;
  list: List | undefined;
};

function ListModal({ show, handleClose, list }: ListModalProps) {
  const { state: listsState, dispatch: listsDispatch } = useTodoContext();
  const [taskInput, setTaskInput] = useState("");
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideData, setGuideData] = useState("");
  const [guideDataLoading, setGuideDataLoading] = useState(false);

  const handleAddTask = () => {
    if (!taskInput || !list) return;
    listsDispatch({
      type: "ADD_TASK",
      listId: list.id,
      task: {
        id: uuidv4(),
        timestamp: +new Date(),
        title: taskInput,
        completed: false,
      },
    });
    setTaskInput("");
  };
  const handleCheckboxChange = (taskId: string) => {
    if (list) listsDispatch({ type: "TOGGLE_TASK", listId: list.id, taskId });
  };
  const handleDeleteTask = (taskId: string) => {
    if (list) listsDispatch({ type: "DELETE_TASK", listId: list.id, taskId });
  };

  const fetchGuideData = async () => {
    if (!listsState.filter((listState) => listState.id === list?.id)[0]?.tasks)
      return;
    try {
      const response = await axios.post(
        "https://smart-todo-13pi.onrender.com/api/ai/list-guide",
        {
          tasks: listsState
            .filter((listState) => listState.id === list?.id)[0]
            .tasks.map(({ title }) => title),
          listName: list?.name,
        }
      );
      setGuideData(response.data.guideData);
    } catch (error) {
      console.error(error);
      setGuideData("An error occurred while processing your request.");
    } finally {
      setGuideDataLoading(false);
    }
  };

  const handleAiAssistanceClick = () => {
    setGuideDataLoading(true);
    setShowGuideModal(true);
    fetchGuideData();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{list && list.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="task-container">
            <InputGroup className="p-1">
              <Form.Control
                value={taskInput}
                placeholder="Add a task to the list"
                aria-label="Add a task to the list"
                aria-describedby="basic-addon2"
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <Button
                variant="primary"
                id="button-addon2"
                onClick={handleAddTask}
              >
                Add
              </Button>
            </InputGroup>
            <div className="p-3">
              {listsState
                .filter((listState) => listState.id === list?.id)[0]
                ?.tasks.slice()
                .reverse()
                .map(({ id, title, timestamp, completed }) => (
                  <div
                    className={`task-tile ${completed ? "completed" : ""}`}
                    key={id}
                  >
                    <div className="task-info">
                      <h5>{title}</h5>
                      <p>{new Date(timestamp).toDateString()}</p>
                    </div>
                    <div className="task-actions">
                      <Form.Check
                        type="checkbox"
                        id={`task-checkbox-${id}`}
                        label=""
                        checked={completed}
                        onChange={() => handleCheckboxChange(id)}
                        className="custom-checkbox"
                      />
                      <i
                        className="bi bi-trash-fill text-danger delete-btn"
                        onClick={() => handleDeleteTask(id)}
                      ></i>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="ai-assistance-btn"
            onClick={handleAiAssistanceClick}
            disabled={
              !listsState.filter((listState) => listState.id === list?.id)[0]
                ?.tasks.length
            }
          >
            <i className="bi bi-magic magic-icon"></i>
            <span className="magic-btn-text ms-1">AI Assitance</span>
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showGuideModal}
        onHide={() => setShowGuideModal(false)}
        centered
      >
        <Modal.Header className="bg-secondary text-light">
          <Modal.Title>Task Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body className="guide-body">
          {guideDataLoading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="guide-data">{guideData}</div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ListModal;
