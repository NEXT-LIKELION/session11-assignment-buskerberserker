import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box, Typography, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [todos, setTodos] = useState([
        { task: "Complete project documentation", priority: "high", isDone: false },
        { task: "Buy groceries", priority: "medium", isDone: false },
        { task: "Schedule dentist appointment", priority: "low", isDone: true },
        { task: "Review pull requests", priority: "high", isDone: false },
        { task: "Call mom", priority: "medium", isDone: true },
        { task: "Update resume", priority: "high", isDone: false },
        { task: "Clean garage", priority: "low", isDone: false },
        { task: "Pay utility bills", priority: "high", isDone: true },
    ]);
    const [priority, setPriority] = useState("medium");
    const [inputValue, setInputValue] = useState("");

    // Snackbar 관련 상태
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [latestTodo, setLatestTodo] = useState("");

    const handleInputChange = (e) => setInputValue(e.target.value);
    const handlePriorityChange = (e) => setPriority(e.target.value);

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            const newTodo = { task: inputValue, priority, isDone: false };
            setTodos([...todos, newTodo]);
            setLatestTodo(inputValue);
            setInputValue("");
        }
    };

    const handleToggleTodo = (index) => {
        setTodos(todos.map((todo, i) =>
            i === index ? { ...todo, isDone: !todo.isDone } : todo
        ));
    };

    // ✅ Todo 추가 시 snackbar 띄우기
    useEffect(() => {
        if (latestTodo) {
          console.log("스낵바 띄우기:", latestTodo);
          setSnackbarOpen(true);
          const timer = setTimeout(() => {
            setSnackbarOpen(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [latestTodo]);
      
    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        py: 4,
                        width: "60%",
                        minWidth: "800px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "0 auto",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        align="center"
                        fontWeight="bold"
                    >
                        NEXT Todo App
                    </Typography>

                    <TodoForm
                        inputValue={inputValue}
                        handleInputChange={handleInputChange}
                        handleAddTodo={handleAddTodo}
                        handlePriorityChange={handlePriorityChange}
                        priority={priority}
                    />

                    <TodoList
                        todos={todos}
                        handleToggleTodo={handleToggleTodo}
                    />

                    <Snackbar
                        open={snackbarOpen}
                        message={`할 일 추가됨: "${latestTodo}"`}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        sx={{
                            zIndex: 9999,}}
                    />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
