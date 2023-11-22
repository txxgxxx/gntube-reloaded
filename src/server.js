import express from "express";

const PORT = 4000;

const app = express();

const gossipMiddleware = (req, res, next) => {
    console.log(`Someone is going to ${req.url}`);
    next();
}

const handleHome = (req, res) => {
    return res.send("<h1>I still love you.</h1>");
}


app.get("/", gossipMiddleware, handleHome);



const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening);


// 사용자가 무언가를 요청하는 것을 알기 위해 사용, listen()에는 콜백이 있음. 
// callback은 기본적으로 서버가 시작될 때 작동하는 함수이다. 

// app.listen(4000, () => console.log("Server listening on port 4000 🚀"));
// 3줄만으로 서버 열기