import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }
    onAdd({ text, day, reminder });

    setText("");
    setDay("");
    setReminder(false);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Task</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Day & Time</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Set Reminder</Form.Label>
        <Form.Check
          aria-label="option 1"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save Task
      </Button>
    </Form>
  );
}
