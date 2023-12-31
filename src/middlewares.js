import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isRender = process.env.NODE_ENV === "production";

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "gntube/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "gntube/videos",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "gn-tube";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isRender = isRender;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Login first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
  storage: isRender ? s3ImageUploader : undefined,
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 100000000,
  },
  storage: isRender ? s3VideoUploader : undefined,
});

// export const notFoundMiddleware = (req, res, next) => {
//   res.status(404).render("404", { pageTitle: "Page not found." });
// };
