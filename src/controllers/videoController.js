import Video from "../models/video";

export const home = (req, res) => {
    console.log("Start");
    Video.find({}, (error, videos) => {
        console.log("errors", error);
        console.log("videos", videos); 
        return res.render("home.pug", {pageTitle: "Home", videos: []});
    });
    console.log("I finish first");
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