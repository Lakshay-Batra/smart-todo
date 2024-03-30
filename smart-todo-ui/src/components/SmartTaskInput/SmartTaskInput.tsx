import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useTodoContext } from "../../contexts/todoContext";
import axios from "axios";
import CreateSmartListModal from "../CreateSmartListModal/CreateSmartListModal";

function SmartTaskInput() {
  const { state: lists } = useTodoContext();
  const [smartTaskInput, setSmartTaskInput] = useState("");
  const [listSuggestion, setListSuggestion] = useState<{
    listName: string;
    isNewList: boolean;
  }>({ listName: "", isNewList: false });
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateSmartListModal, setShowCreateSmartListModal] =
    useState(false);

  const handleSmartTaskInput = async () => {
    if (!smartTaskInput) return;
    setIsLoading(true);
    setShowCreateSmartListModal(true);
    try {
      const response = await axios.post(
        "https://smart-todo-13pi.onrender.com/api/ai/list-suggestion",
        {
          task: smartTaskInput,
          lists: lists.map(({ name }) => name),
        }
      );
      const { listName, isNewList } = await response.data;
      setListSuggestion({ listName, isNewList });
    } catch (error) {
      console.error(error);
      setShowCreateSmartListModal(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseModal = () => {
    setShowCreateSmartListModal(false);
    setSmartTaskInput("");
  };
  return (
    <>
      <InputGroup className="py-4">
        <Form.Control
          placeholder="Add task with the help of AI companion"
          aria-label="Add task with the help of AI companion"
          aria-describedby="basic-addon2"
          value={smartTaskInput}
          onChange={(e) => setSmartTaskInput(e.target.value)}
        />
        <Button
          variant="primary"
          id="button-addon2"
          onClick={handleSmartTaskInput}
        >
          Add
        </Button>
      </InputGroup>
      <CreateSmartListModal
        show={showCreateSmartListModal}
        handleClose={handleCloseModal}
        isLoading={isLoading}
        listSuggestion={listSuggestion}
        inputTask={smartTaskInput}
      />
    </>
  );
}

export default SmartTaskInput;
