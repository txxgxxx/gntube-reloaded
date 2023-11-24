import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const home = (req, res) => {
    console.log("I will respond.");
    return res.send("hello");
};
const login = (req, res) => {
    return res.send("login");
};

app.use(logger);
app.get("/", home);
app.get("/login", login); 

const handleListening = () => 
console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening);


// 사용자가 무언가를 요청하는 것을 알기 위해 사용, listen()에는 콜백이 있음. 
// callback은 기본적으로 서버가 시작될 때 작동하는 함수이다. 

// app.listen(4000, () => console.log("Server listening on port 4000 🚀"));
// 3줄만으로 서버 열기