import "./Lists.css";
import { useTodoContext } from "../../contexts/todoContext";
import { useState } from "react";
import { List } from "../../types/listTypeStore";
import DeleteListModal from "../DeleteListModal/DeleteListModal";
import ListModal from "../ListModal/ListModal";

function Lists() {
  const { state: lists } = useTodoContext();
  const [listToBeDeleted, setListToBeDeleted] = useState<List>();
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);
  const [listToBeShown, setListToBeShown] = useState<List>();
  const [showListModal, setShowListModal] = useState(false);

  const openList = (list: List) => {
    setListToBeShown(list);
    setShowListModal(true);
  };

  const initiateDelete = (e: React.MouseEvent<HTMLElement>, list: List) => {
    e.stopPropagation();
    setListToBeDeleted(list);
    setShowDeleteListModal(true);
  };
  const handleCloseDeleteListModal = () => {
    setShowDeleteListModal(false);
  };

  return (
    <div className="list-container">
      {lists.map((list) => (
        <div key={list.id} className="list-card" onClick={() => openList(list)}>
          <div className="text-truncate">
            {list.name}
            <hr className="m-0"></hr>
          </div>
          <i
            className="bi bi-trash-fill text-danger delete-btn"
            onClick={(e) => initiateDelete(e, list)}
          ></i>
        </div>
      ))}
      <ListModal
        show={showListModal}
        handleClose={() => setShowListModal(false)}
        list={listToBeShown}
      />
      <DeleteListModal
        show={showDeleteListModal}
        handleClose={handleCloseDeleteListModal}
        list={listToBeDeleted}
      />
    </div>
  );
}

export default Lists;
