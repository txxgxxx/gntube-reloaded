import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/gntube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

// error는 여러번 일어날 수 있으니 on으로, 커넥팅은 한 번만 되니까 once로.
db.on("error", handleError);
db.once("open", handleOpen);
