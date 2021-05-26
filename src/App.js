import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTask";
import Submit from "./components/Submit";
import Footer from "./components/Footer";
import About from "./components/About";
import { Card, Col, Container, Row } from "react-bootstrap";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //fetch data Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  //fetch data Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };
  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //delete Task function
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <Router>
      <Container>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Card
              border="primary"
              className="container text-center p-3"
              style={{
                minHeight: "60vh",

                boxShadow: "2px 2px 5px 6px #ccc",
              }}
            >
              <Card.Header style={{ backgroundColor: "lightblue" }}>
                Featured
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Header />
                </Card.Title>
                <Submit
                  onAdd={() => setShowAddTask(!showAddTask)}
                  showAdd={showAddTask}
                />
              </Card.Body>
              <Route
                path="/"
                exact
                render={(props) => (
                  <>
                    {showAddTask && <AddTasks onAdd={addTask} />}
                    <div>
                      {tasks.length > 0 ? (
                        <Tasks
                          tasks={tasks}
                          onDelete={deleteTask}
                          onToggle={toggleReminder}
                        />
                      ) : (
                        "No Tasks To Show"
                      )}
                    </div>
                  </>
                )}
              />
              <Route path="/about" component={About} />

              <Card.Footer
                className="text-muted"
                style={{
                  backgroundColor: "lightblue",
                  padding: "10px",
                  margin: "1px",
                }}
              >
                <Footer />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
//npm run server
//npm start
