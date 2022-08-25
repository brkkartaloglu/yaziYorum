import React from "react";
import { FaGithub } from "react-icons/fa";
import { useHistory } from "react-router-dom";
export default function About() {
  const history = useHistory();
  return (
    <div>
      <br></br>
      <tooltip title="Github Repo">
        <button
          onClick={() =>
            window.open("https://github.com/brkkartaloglu/yaziYorum")
          }
          className="twt"
        >
          <FaGithub style={{ height: "35px", width: "35px" }} color="primary" />
        </button>
      </tooltip>
      <hr></hr>
      <button
        className="ui primary submit button"
        onClick={() => history.push("/")}
      >
        Go back to Main Page
      </button>
    </div>
  );
}
