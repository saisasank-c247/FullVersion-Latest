import path from "path";

const fileDirectoryPath = {
  moduleUploadPath: path.join(__dirname, "../../", "public/uploads", "/module"),
  moduleThumbDestination: path.join(
    __dirname,
    "../../public/uploads",
    "/moduleThumb"
  ),
  testUploadPath: path.join(__dirname, "../../public/uploads", "/document"),
};

export { fileDirectoryPath };
