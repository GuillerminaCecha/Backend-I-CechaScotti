import path from "path";

const ROOT_PATH = path.resolve();

const paths = {
    root: ROOT_PATH,
    env: {
        dev: path.join(path.dirname(""), ".env.dev"),
        prod: path.join(path.dirname(""), ".env.prod"),
    },
    src: path.join(ROOT_PATH, "src"),
    public: path.join(ROOT_PATH, "src", "public"),
    views: path.join(ROOT_PATH, "src", "views"),
    files: path.join(ROOT_PATH, "src", "files"),
};

export default paths;