import "./WelcomeContainer.css";

function WelcomeContainer() {
  return (
    <div className="welcome-container">
      <h1>
        Welcome to{" "}
        <span style={{ color: "#52bea1", fontWeight: "bolder" }}>
          Smart TODO
        </span>
      </h1>
      <p>
        your intelligent task manager{" "}
        <span className="text-primary">powered by OpenAI</span>. Easily organize
        your work projects, personal errands, and daily routines with our
        intuitive app.
      </p>
      <hr />
      <h3>How to Use:</h3>
      <ol>
        <li>
          <b>Add Tasks:</b> Type your task in the input box above and hit add
          button.
        </li>
        <li>
          <b>Smart Suggestions:</b> Let Smart TODO analyze your tasks and
          suggest the best list. Confirm or choose an existing list.
        </li>
        <li>
          <b>Custom Lists:</b>Create specialized lists with the plus button in
          the bottom right corner. Tailor your experience to fit your needs.
        </li>
      </ol>
    </div>
  );
}

export default WelcomeContainer;
