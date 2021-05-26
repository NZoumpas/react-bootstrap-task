import React from "react";

import { Button } from "react-bootstrap";

export default function AddForm({ text, onClick }) {
  return (
    <>
      <div className="d-grid gap-2">
        <Button variant="outline-success" onClick={onClick}>
          {text}
        </Button>
      </div>
    </>
  );
}
