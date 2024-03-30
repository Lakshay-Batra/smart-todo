import { useEffect, useState } from "react";
import "./App.css";
import CreateListModal from "./components/CreateListModal/CreateListModal";
import Header from "./components/Header/Header";
import SmartTaskInput from "./components/SmartTaskInput/SmartTaskInput";
import { useTodoContext } from "./contexts/todoContext";
import WelcomeContainer from "./components/WelcomeContainer/WelcomeContainer";
import Lists from "./components/Lists/Lists";
import Footer from "./components/Footer/Footer";
import { Spinner } from "react-bootstrap";

function App() {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [locallyStoredDataLoading, setLocallyStoredDataLoading] =
    useState(true);
  const { state: lists, dispatch: listsDispatch } = useTodoContext();
  useEffect(() => {
    const storedData = localStorage.getItem("todoData");
    console.log(storedData);
    if (storedData) {
      listsDispatch({
        type: "LOAD_DATA",
        locallyStoredData: JSON.parse(storedData),
      });
    }
    const timeoutReference = setTimeout(() => {
      setLocallyStoredDataLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeoutReference);
    };
  }, [listsDispatch]);
  return (
    <div>
      <Header />
      {locallyStoredDataLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="row m-0 main-container">
            <div className="col-md-8 mx-auto">
              <SmartTaskInput />
              {!lists.length && <WelcomeContainer />}
            </div>
            {lists.length ? (
              <div className="col-md-10 mx-auto">
                <Lists />
              </div>
            ) : (
              <></>
            )}
          </div>
          <button
            className="plus-button"
            onClick={() => setShowCreateListModal(true)}
          >
            <i className="bi bi-plus plus-icon"></i>
            <span className="plus-btn-text ms-1">Add List</span>
          </button>
        </>
      )}
      <CreateListModal
        show={showCreateListModal}
        handleClose={() => {
          setShowCreateListModal(false);
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
