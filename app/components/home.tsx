"use client";

require("../polyfill");

import { useState, useEffect } from "react";

import styles from "./home.module.scss";

import SettingsIcon from "../icons/settings.svg";
import GithubIcon from "../icons/github.svg";
import BilibiliIcon from "../icons/bilibili.svg";
import XingQiuIcon from "../icons/xingqiu.svg";
import YuqueIcon from "../icons/yuque.svg";
import LogoIcon from "../icons/tree.svg";
import ChatGptIcon from "../icons/chatgpt.svg";
import SendWhiteIcon from "../icons/send-white.svg";
import BrainIcon from "../icons/brain.svg";
import ExportIcon from "../icons/export.svg";
import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";

import { getCSSVar, useMobileScreen } from "../utils";

import dynamic from "next/dynamic";
import { Path, SlotID } from "../constant";
import { ErrorBoundary } from "./error";

import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { SideBar } from "./sidebar";
import { useAppConfig } from "../store/config";

import {
  BAGUTREE_URL,
  BILIBILI_URL,
  GITHUB_URL,
  REPO_URL,
  XINGQIU_URL,
  YUQUE_URL,
} from "../constant";
import { ControllerPool } from "../requests";
import { Prompt, usePromptStore } from "../store/prompt";
import Image from "next/image";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Settings = dynamic(async () => (await import("./settings")).Settings, {
  loading: () => <Loading noLogo />,
});

const Chat = dynamic(async () => (await import("./chat")).Chat, {
  loading: () => <Loading noLogo />,
});

const NewChat = dynamic(async () => (await import("./new-chat")).NewChat, {
  loading: () => <Loading noLogo />,
});

const MaskPage = dynamic(async () => (await import("./mask")).MaskPage, {
  loading: () => <Loading noLogo />,
});

export function useSwitchTheme() {
  const config = useAppConfig();

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (config.theme === "dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "light") {
      document.body.classList.add("light");
    }

    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media]',
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"]:not([media])',
    );

    if (config.theme === "auto") {
      metaDescriptionDark?.setAttribute("content", "#151515");
      metaDescriptionLight?.setAttribute("content", "#fafafa");
    } else {
      const themeColor = getCSSVar("--themeColor");
      metaDescriptionDark?.setAttribute("content", themeColor);
      metaDescriptionLight?.setAttribute("content", themeColor);
    }
  }, [config.theme]);
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

function Screen() {
  const config = useAppConfig();
  const location = useLocation();
  const isHome = location.pathname === Path.Home;
  const isMobileScreen = useMobileScreen();

  return (
    <div
      className={
        styles.container +
        ` ${
          config.tightBorder && !isMobileScreen
            ? styles["tight-container"]
            : styles.container
        }`
      }
    >
      <SideBar className={isHome ? styles["sidebar-show"] : ""} />

      <div>
        <a href={BAGUTREE_URL} target="_blank">
          <img
              className={styles["rounded-img"]}
              src={"/bagutree-logo.jpg"}
              alt="My Image"
          />
        </a>
        <div className={styles["sidebar-title"]}>Bagutree 组织</div>
        <div className={styles["sidebar-sub-title"]}>
          1、想拥有自己专属的Chatgpt站点？想体验Gpt-4？请加微信：bagutree。
        </div>
        <div className={styles["sidebar-sub-title"]}>
          2、另外我们正在组织合伙制体验Chatgpt Plus计划，欢迎骚扰。
        </div>
        <div className={styles["sidebar-sub-title"]}>
          3、也欢迎关注我们官网，一个免费分享一线互联网大厂深度技术的组织，点击上方LOGO图标，或者自己浏览器中输入
          bagutree.cn。
        </div>
      </div>

      <div className={styles["window-content"]} id={SlotID.AppBody}>
        <Routes>
          <Route path={Path.Home} element={<Chat />} />
          <Route path={Path.NewChat} element={<NewChat />} />
          <Route path={Path.Masks} element={<MaskPage />} />
          <Route path={Path.Chat} element={<Chat />} />
          <Route path={Path.Settings} element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export function Home() {
  useSwitchTheme();

  if (!useHasHydrated()) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Screen />
      </Router>
    </ErrorBoundary>
  );
}
