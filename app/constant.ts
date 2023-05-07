export const OWNER = "ibaozi-cn";
export const REPO = "ChatGPT-Next-Web";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const BAGUTREE_URL = `http://bagutree.cn`;
export const BILIBILI_URL = `https://space.bilibili.com/546582430?spm_id_from=333.1007.0.0`;
export const YUQUE_URL = `https://www.yuque.com/bagutree/nr9fzs/ldhfqc`;
export const XINGQIU_URL = `https://wx.zsxq.com/dweb2/index/group/15528115411512`;
export const GITHUB_URL = `https://github.com/orgs/bagutree`;
export const UPDATE_URL = `${REPO_URL}#%E4%BF%9D%E6%8C%81%E6%9B%B4%E6%96%B0-keep-updated`;
export const FETCH_COMMIT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=1`;
export const FETCH_TAG_URL = `https://api.github.com/repos/${OWNER}/${REPO}/tags?per_page=1`;
// export const RUNTIME_CONFIG_DOM = "danger-runtime-config";

export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
}

export enum SlotID {
  AppBody = "app-body",
}

export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
}

export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "ak-";
