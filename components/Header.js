import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { Avatar } from "@mui/material";
import { getProfile } from "../api/Profile";
import { getProgrammes } from "../api/Courses";
import { getMcqs } from "../api/Mcq";
import { logoutUser } from "../api/User";
import { MdDarkMode } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/legacy/image";

const Header = ({ page }) => {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(true);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      setVisible(moving > 300);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  });

  const [menuOpen, setMenuOpen] = useState(false); //for menu dropdown
  const [programmesMenuOpen, setProgrammesMenuOpen] = useState(false); //for programmes dropdown
  const [mcqMenuOpen, setMcqMenuOpen] = useState(false); //for mcq dropdown
  const [mainOpen, setMainOpen] = useState(false); //for the header dropdown
  const menuDropdown = useRef(null);
  const programmesMenuDropdown = useRef(null);
  const mcqMenuDropdown = useRef(null);
  const menu = useRef(null);
  const programmesMenu = useRef(null);
  const mcqMenu = useRef(null);
  const dropdown = useRef(null);
  const mainDropdown = useRef(null);
  const mainDropdownRef = useRef(null);
  const [avatar, setAvatar] = useState("");

  if (typeof window !== "undefined") {
    window.addEventListener("click", (e) => {
      if (
        mainDropdownRef &&
        mainDropdown &&
        !mainDropdownRef.current?.contains(e.target) &&
        mainOpen &&
        !mainDropdown.current?.contains(e.target)
      ) {
        setMainOpen(false);
      }

      if (
        dropdown &&
        menu &&
        !menu.current?.contains(e.target) &&
        !dropdown.current?.contains(e.target) &&
        menuOpen
      ) {
        menuDropdown.current?.classList.remove("rotate-180");
        setMenuOpen(false);
      }

      if (
        programmesMenu &&
        !programmesMenuDropdown.current?.contains(e.target) &&
        programmesMenuOpen
      ) {
        programmesMenuDropdown.current?.classList.remove("rotate-180");
        setProgrammesMenuOpen(false);
      }

      if (
        mcqMenu &&
        !mcqMenuDropdown.current?.contains(e.target) &&
        mcqMenuOpen
      ) {
        mcqMenuDropdown.current?.classList.remove("rotate-180");
        setMcqMenuOpen(false);
      }
    });
  }

  const { data: profileData, error: profileError } = useSWR(
    process.env.BACKEND + "/user/profile",
    async (url) => await getProfile(url), { revalidateOnFocus: false, revalidateOnReconnect: true }
  );
  const { data: coursesData, error: coursesError } = useSWR(
    process.env.BACKEND + `/program/list`,
    async (url) => await getProgrammes(url), { revalidateOnFocus: false, revalidateOnReconnect: true }
  );
  const [logged, setLogged] = useState(profileData?.success); //for hiding or showing logged user profile

  const menuOpenToggle = () => {
    if (!menuOpen) {
      menuDropdown.current.classList.add("rotate-180");
      setMenuOpen(true);
    } else {
      menuDropdown.current.classList.remove("rotate-180");
      setMenuOpen(false);
    }
  };

  const programmesMenuOpenToggle = () => {
    if (!programmesMenuOpen) {
      programmesMenuDropdown.current.classList.add("rotate-180");
      setProgrammesMenuOpen(true);
    } else {
      programmesMenuDropdown.current.classList.remove("rotate-180");
      setProgrammesMenuOpen(false);
    }
  };

  const mcqMenuOpenToggle = () => {
    if (!mcqMenuOpen) {
      mcqMenuDropdown.current.classList.add("rotate-180");
      setMcqMenuOpen(true);
    } else {
      mcqMenuDropdown.current.classList.remove("rotate-180");
      setMcqMenuOpen(false);
    }
  };

  const mainOpenToggle = () => {
    if (!mainOpen) {
      setMainOpen(true);
    } else {
      setMainOpen(false);
    }
  };

  const logout = async () => {
    await logoutUser(process.env.BACKEND + "/user/logout/");
    router.reload();
  };

  const changeDarkMode = (e) => {
    e.preventDefault();
    const root = window.document.documentElement;
    if (darkMode) {
      localStorage.setItem("md", false);
      root.classList.remove("dark");
      setDarkMode(false);
    } else {
      localStorage.setItem("md", true);
      root.classList.add("dark");
      setDarkMode(true);
    }
  };

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem("md")) !== null
      ? JSON.parse(localStorage.getItem("md"))
      : true)

    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (typeof profileData !== typeof undefined) {
      if (profileData?.success) {
        setLogged(true);
        setAvatar(profileData?.data?.profilePicture);
      } else {
        setLogged(false);
      }
    } else if (profileError) {
      setLogged(false);
    }
  }, [profileData, darkMode, profileError]);

  return (
    <div
      className={`${visible ? "bg-back dark:bg-secondBackground shadow-md fixed animate-moveDown" : "absolute"} dark:text-mainText/80 z-30 top-0 w-full h-[62px] md:h-[80px] transition-colors duration-200 flex justify-between items-center select-none `}
    >
      <div className="flex items-center gap-3 lg:gap-10 ml-1">
        <Link href="/" legacyBehavior>
          <a className="dark:hidden">
            <Image width={165} height={65} layout="fixed"
              alt="Aakhyaan Logo"
              src="/logo.png"
            />
          </a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className="dark:flex hidden">
            <Image width={165} height={65} layout="fixed"
              alt="Aakhyaan Logo"
              src="/logo2.png"
            />
          </a>
        </Link>
        <span className={`hover:text-blue-600 hover:translate-x-0.5 hover:translate-y-0.5 transition-all hidden md:flex hover:cursor-pointer font-sans text-lg items-center`}>
          <Link
            href="/"
          >
            Home
          </Link>
        </span>
        <div
          ref={programmesMenu}
          className={`mr-4 hidden md:flex w-[100px] hover:text-blue-600 hover:cursor-pointer font-sans text-lg items-center relative`}
        >
          <span className={`hover:text-blue-600 hover:translate-x-0.5 hover:translate-y-0.5 hidden md:flex hover:cursor-pointer font-sans text-lg items-center`}>
            <Link
              href="/programmes"
            >
              Programmes
            </Link>
          </span>
          <span onClick={programmesMenuOpenToggle} ref={programmesMenuDropdown}>
            <IoMdArrowDropdown size={25} />
          </span>

          <div
            className={` absolute ${!programmesMenuOpen ? "hidden" : null
              } dark:bg-slate-800/20 dark:text-white backdrop-blur-sm transition dark:duration-1000 text-gray-700 top-[55px] shadow-md bg-back/20 w-fit -right-6`}
          >
            {!coursesData && !coursesError ? (
              <>
                <div className="py-1 px-4 w-28 block">
                  <Skeleton baseColor="gray" />
                </div>
                <div className="py-1 px-4 w-28 block">
                  <Skeleton baseColor="gray" />
                </div>
              </>
            ) : (
              coursesData?.data?.map((course, i) => (
                <span key={i}>
                  <Link href={`/programmes/details/${course._id}?program=${course.title}&programId=${course._id}`} legacyBehavior>
                    <span className="rounded-b hover:bg-blue-400 hover:text-white py-2 px-4 block whitespace-nowrap">
                      {course?.title}
                    </span>
                  </Link>
                </span>
              ))
            )}
          </div>
        </div>

        {/* mcq dropdown */}
        <div
          ref={mcqMenu}
          className={`hidden md:flex hover:text-blue-600 hover:cursor-pointer font-sans text-lg items-center relative`}
        >
          <span className={`whitespace-nowrap hover:text-blue-600 hover:translate-x-0.5 hover:translate-y-0.5 hidden md:flex hover:cursor-pointer font-sans text-lg items-center`}>
            <Link
              href="/mcqs"
            >
              Test
            </Link>
          </span>
          <span onClick={mcqMenuOpenToggle} ref={mcqMenuDropdown}>
            <IoMdArrowDropdown size={25} />
          </span>

          <div
            className={` absolute ${!mcqMenuOpen ? "hidden" : null
              } dark:bg-slate-800/20 dark:text-white backdrop-blur-sm transition dark:duration-1000 text-gray-700 top-[55px] shadow-md bg-back/20 w-fit -right-6`}
          >
            {!coursesData && !coursesError ? (
              <>
                <div className="py-1 px-4 w-28 block">
                  <Skeleton baseColor="gray" />
                </div>
                <div className="py-1 px-4 w-28 block">
                  <Skeleton baseColor="gray" />
                </div>
              </>
            ) : (
              coursesData?.data?.map((course, i) => (
                <span key={i}>
                  <Link href={`/mcqs/${course?.courseId}?program=${course.title}&programId=${course._id}`} legacyBehavior>
                    <span className="rounded-b hover:bg-blue-400 hover:text-white py-2 px-4 block whitespace-nowrap">
                      {course?.title}
                    </span>
                  </Link>
                </span>
              ))
            )}
          </div>
        </div>

        <span className={`hover:text-blue-600 hover:translate-x-0.5 hover:translate-y-0.5 hidden md:flex hover:cursor-pointer font-sans text-lg items-center`}>
          <Link
            href="/about-us"
          >
            About
          </Link>
        </span>
        <div
          onClick={changeDarkMode}
          className="hover:cursor-pointer dark:bg-slate-700 flex dark:justify-end transition-all border-2 w-10 rounded-xl px-0.5 items-center gap-1"
        >
          <MdDarkMode color="" />
        </div>
      </div>
      <span ref={mainDropdown} className="mr-5">
        <GiHamburgerMenu
          onClick={mainOpenToggle}
          className="z-50 md:hidden hover:cursor-pointer"
          size={25}
        />
      </span>
      {!profileData && !profileError ? (
        <div className="mr-[2vw] md:flex items-center hidden">
          <div>
            <Skeleton baseColor="gray" height={45} width={45} circle />
          </div>
        </div>
      ) : typeof logged !== typeof undefined ? (
        <div
          className={`w-1/2 h-full justify-end gap-[2vw] mr-[2vw] items-center text-lg md:flex hidden`}
        >
          <div className={`${!logged ? "md:flex gap-[2vw]" : "hidden"}`}>
            <Link href="/signup" legacyBehavior>
              <span className={`transition cursor-pointer duration-200 font-medium bg-footer hover:bg-white hover:text-black text-white py-2 px-4 rounded-xl text-xl`}>
                Sign Up
              </span>
            </Link>
            <span className={`transition text-black dark:text-white duration-200 font-medium font-sans rounded-lg px-4 hover:translate-x-[0.5px] hover:translate-y-[0.5px] py-2 text-xl`}>
              {router.asPath !== "/" ?
                <Link
                  href={`/login?redirect_uri=${router.asPath}`}
                >
                  Login
                </Link>
                :
                <Link
                  href="/login"
                >
                  Login
                </Link>
              }
            </span>
          </div>
          <div
            ref={menu}
            className={`${logged ? "md:flex" : "hidden"
              } w-[100px] hover:text-blue-600 hover:cursor-pointer font-sans text-lg items-center relative`}
            onClick={menuOpenToggle}
          >
            <span>
              <Avatar alt="" src={avatar} />
            </span>
            <span ref={menuDropdown}>
              <IoMdArrowDropdown size={25} />
            </span>

            <div
              ref={dropdown}
              className={` absolute ${!menuOpen ? "hidden" : null
                } dark:bg-slate-800/40 dark:text-white backdrop-blur-sm transition dark:duration-1000 text-gray-700 pt-1 top-[60px] shadow-md bg-blue-50 w-full right-8`}
            >
              <Link href="/profile" legacyBehavior>
                <span className="rounded-b hover:bg-blue-400 hover:text-white py-2 px-4 block whitespace-nowrap">
                  Profile
                </span>
              </Link>
              <Link href="/" legacyBehavior>
                <span className="hover:bg-blue-400 hover:text-white py-2 px-4 block whitespace-nowrap" onClick={logout}>
                  Log Out
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div
        ref={mainDropdownRef}
        className={`absolute ${!mainOpen ? "hidden" : "animate-moveHeaderDown"
          } md:animate-none flex flex-col dark:bg-background/90 dark:text-white backdrop-blur-lg md:hidden dark:border-slate-800/40 border-t-2 text-gray-700 text-center text-lg font-medium rounded-lg bg-white/90 top-[60px] shadow-lg z-50 w-full`}
      >
        <Link href="/" legacyBehavior>
          <div className="rounded-t hover:bg-blue-500 hover:text-white py-2 px-4 cursor-pointer">
            Home
          </div>
        </Link>
        <Link href="/profile" legacyBehavior>
          <div className={`${!logged ? "hidden" : "null"
            } hover:text-white hover:bg-blue-600 py-2 px-4 cursor-pointer`}>
            Profile
          </div>
        </Link>
        <Link href="/programmes" legacyBehavior>
          <div className="rounded-t hover:bg-blue-600 hover:text-white py-2 px-4 cursor-pointer">
            Programmes
          </div>
        </Link>
        <Link href="/mcqs" legacyBehavior>
          <div className="rounded-t hover:bg-blue-600 hover:text-white py-2 px-4 cursor-pointer">
            Mock Test
          </div>
        </Link>
        <Link href="/about-us" legacyBehavior>
          <div className="rounded-t hover:bg-blue-600 hover:text-white py-2 px-4 cursor-pointer">
            About
          </div>
        </Link>
        <Link href="/signup" legacyBehavior>
          <div className={`${logged ? "hidden" : "null"
            } cursor-pointer rounded-b hover:text-white hover:bg-blue-600 py-2 px-4`}>
            Sign Up
          </div>
        </Link>
        <Link href="/login" legacyBehavior>
          <div className={`${logged ? "hidden" : "null"
            } hover:text-white hover:bg-blue-600 py-2 px-4 cursor-pointer`}>
            Login
          </div>
        </Link>
        <Link href="/" legacyBehavior>
          <div className={`${!logged ? "hidden" : "null"
            } hover:text-white hover:bg-blue-600 py-2 px-4 cursor-pointer`} onClick={logout}>
            Log Out
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;