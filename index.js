const fs = require("fs");
const path = require("path");
const less = require("less");
const config =require("./theme.config");
const outPutPath =config.outPutPath;
const themeList =config.themeList;
const platformList=config.platform

const themeVas =config.redthemeVas;

const log = (...msg) => {
  console.log("project-gen-theme: ", ...msg);
};
// 其他变量文件夹
const dir = path.join(__dirname, "css");

const generateTheme = (platform, theme) => {
  log(theme);
  try {
    const cssData = fs.readFileSync(
      path.join(__dirname, "css/index.mudle.less"),
      "utf-8"
    );
    // const rootDataBuffer =Buffer.from(rootData);
    // const totalLength = rootDataBuffer.length + cssData.length ;
    // const newBuffer =Buffer.concat([rootDataBuffer, cssData],totalLength)
    less.parse(
      cssData,
      {
        paths: [dir],
        modifyVars: themeVas,
        javascriptEnabled: true,
        compress: true,
        javascriptEnabled: true,
        rootpath: "http://www.cnd.com", //url替换路径
      },
      (err, root, imports, options) => {
        if (!err) {
          const parseTree = new less.ParseTree(root, imports);
          const result = parseTree.toCSS(options);
          const outPut = path.join(__dirname, platform, outPutPath);
          fs.mkdirSync(outPut, { recursive: true });
        const str =  Object.keys(themeVas).map((key)=>{
            return `${key.replace("@","--")}: ${themeVas[key]}`
          })
          const rootData = `:root{${str.join(";")}}\n`;
          fs.writeFileSync(path.join(outPut, `${theme}.css`), `${rootData} ${result.css}` );
        } else {
        }
      }
    );
  } catch (e) {
    console.log(e, "ee");
  }
};

const genTheme = (platform) => {
  themeList.map((key) => {
    const theme = key;
    return generateTheme(platform, theme);
  });
};
platformList.forEach((platform)=>{
  genTheme(platform);
})
