import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const securityPolicyMiddleware = (req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org 'unsafe-eval'; object-src 'self'"
  );
  next();
};

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  // passport에서 user object를 요청에 보내줌
  res.locals.loggedUser = req.user || null;
  // 유저가 존재한다면 req.user를 존재하지 않는 다면 null
  next();
};

export const onlyPublic = (req, res, next) => {
  // 로그인 되어있다면
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

// singgle 오직 하나의 파일만 업로드
export const uploadVideo = multerVideo.single("videoFile");
// form data에서 받아올 이름
export const uploadAvatar = multerAvatar.single("avatar");
