import React, { useState } from "react";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Please enter value for searching.");
    } else {
      props.history.push(`/search/name/${name}`);
    }
  };
  return (
    <form id="search" className="search" onSubmit={submitHandler}>
      <div>
        <input
          type="search"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="fn btn btn-primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
