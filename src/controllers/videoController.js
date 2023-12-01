import Video from "../models/video";

/* callback 방식, 
console.log("start");
Video.find({}, (error, videos) => {
    return res.render("home.pug", {pageTitle: "Home", videos: []});
});
console.log("finished");
아래는 promise 방식과 try catch를 통한 에러 검출
*/
export const home = async (req, res) => {
    try{
        console.log("Start");
        const videos = await Video.find({});
        console.log(videos);
        console.log("finished");
        return res.render("home", { pageTitle: "Home", videos });
    } catch(error) {
        console.log("Error", error);
        return res.render("server-error");
    }
};
export const watch = (req, res) => {
    const { id } = req.params;
    res.render("watch", {pageTitle: `Watching ${video.title}`, video });
}
export const getEdit = (req,res) => {
    const { id } = req.params;
    res.render("edit", {pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
}

export const postUpload = (req, res) => {
    const {title} = req.body;
    videos.push(newVideo);
    return res.redirect("/");
}