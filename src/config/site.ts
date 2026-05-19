// Central place for site-wide links and constants
export const REPO_URL = "https://atomgit.com/mindspore/mindquantum";
export const GITHUB_URL = "https://github.com/mindspore-ai/mindquantum";
export const GITEE_URL = "https://gitee.com/mindspore/mindquantum";
export const MINDSPORE_URL = "https://www.mindspore.cn/";
export const EVANGELISTS_URL = "https://www.mindspore.cn/developers";

export const KOUSHARE_URL = "https://www.koushare.com/space/333626/home";
export const BILIBILI_URL = "https://space.bilibili.com/526894060/lists/4218299";

export const CONTRIBUTION_URL = "https://www.mindspore.cn/contribution";
export const INTERNSHIP_URL = "https://www.mindspore.cn/internship";
export const HACKATHON_URL =
  "https://mp.weixin.qq.com/mp/homepage?__biz=MzI3NjAzMjA0NA%3D%3D&hid=6&sn=0b6a38402c2fbb8683826376cf7f05d2&scene=126#wechat_redirect";
export const PAPER_LECTURE_URL =
  "https://mp.weixin.qq.com/mp/homepage?__biz=MzI3NjAzMjA0NA%3D%3D&hid=9&sn=6d6d53b39b5d128ae4bb0bf2c9e88962&scene=126#wechat_redirect";

export type CodeMirrorId = "atomgit" | "github" | "gitee";
export type CodeMirror = { id: CodeMirrorId; label: string; href: string };

export const CODE_MIRRORS: CodeMirror[] = [
  { id: "atomgit", label: "AtomGit", href: REPO_URL },
  { id: "github", label: "GitHub", href: GITHUB_URL },
  { id: "gitee", label: "Gitee", href: GITEE_URL },
];
