import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(` ${req.method} ${req.url}`);
    next();
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }
    console.log("Allowed, you may continue.")
    next();
}

const handleHome = (req, res) => {
    return res.send("<h1>I still love you.</h1>");
}

const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge.");
}

app.use(logger);
app.use(privateMiddleware);

app.get("/",handleHome);
app.get("/protected", handleProtected);



const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening);


// 사용자가 무언가를 요청하는 것을 알기 위해 사용, listen()에는 콜백이 있음. 
// callback은 기본적으로 서버가 시작될 때 작동하는 함수이다. 

// app.listen(4000, () => console.log("Server listening on port 4000 🚀"));
// 3줄만으로 서버 열기