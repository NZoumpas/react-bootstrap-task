import React from "react";
import AddForm from "./AddForm";
import { useLocation } from "react-router-dom";

export default function Submit({ onAdd, showAdd }) {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/" && (
        <AddForm
          text={showAdd ? "Close Task Tracker" : "Add Task Tracker"}
          onClick={onAdd}
        />
      )}
    </div>
  );
}
