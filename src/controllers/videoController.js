import Video from "../models/video";

/* callback 방식, 
console.log("start");
Video.find({}, (error, videos) => {
    return res.render("home.pug", {pageTitle: "Home", videos: []});
});
console.log("finished");
*/
export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
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
    const { title, description, hashtags } = req.body;
    const video = new Video({
        title,
        description,
        hashtags: hashtags.split(",").map((word) => !word.trim().startsWith("#") ? `#${word}` : word.trim()),
        createdAt: Date.now(),
        meta: {
            views: 0,
            rating: 0,
        },
    })
    console.log(video);
    return res.redirect("/");
}