import React, { useEffect, useState, useRef } from 'react'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { IoMdCall, IoMdClose } from 'react-icons/io'
import { MdOutlineEmail } from 'react-icons/md'
import useSWR, { useSWRConfig, mutate } from 'swr'
import { getProfile, editProfile, changePP } from '../../api/Profile'
import { getSolvedMcqs } from '../../api/Mcq'
import { sendEmailVerification } from '../../api/User'
import { BiEditAlt } from 'react-icons/bi'
import { ImCamera } from 'react-icons/im'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Head from 'next/head'
import moment from 'moment'
import { HiOutlineExternalLink } from 'react-icons/hi'

export default function Profile() {
    const router = useRouter()

    const editPanel = useRef(null)
    const editButton = useRef(null)
    const picFile = useRef(null)
    const [editMode, setEditMode] = useState(false)
    const [active, setActive] = useState("Profile")
    const [profilePicture, setProfilePicture] = useState(null)
    const [verification, setVerification] = useState("")
    const [editWarning, setEditWarning] = useState("")
    const [profile, setProfile] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        age: "",
        email: "",
        phone: "",
        college: "",
        address: "",
        profilePicture: "",
    });
    const [editingProfile, setEditingProfile] = useState(profile)
    const { mutate } = useSWRConfig()
    const { data, error } = useSWR(process.env.BACKEND + "/user/profile", async url => await getProfile(url), { revalidateOnFocus: false, revalidateOnReconnect: true })

    useEffect(() => {
        if (typeof data !== typeof undefined) {
            if (data.success) {
                setProfile(data?.data)
                setProfilePicture(data?.data?.profilePicture)
            }
            else {
                router.replace('/login?redirect_uri=profile')
            }
        }
        else if (error) {
            router.replace('/login?redirect_uri=profile')
        }
        if(router.query?.active) setActive(router.query.active)
    }, [data, profile, error, router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingProfile === profile) {
            setEditWarning("You haven't made any changes, please make some changes before submitting.")
        } else {
            setEditMode(false)
            setEditWarning("")
            editPanel.current.classList.remove("animate-moveLeft")
            editPanel.current.classList.add("animate-vanishRight")
            setTimeout(() => {
                editPanel.current.classList.add("invisible")
            }, 500);
            await editProfile(process.env.BACKEND + "/user/profile", editingProfile)
            mutate(process.env.BACKEND + '/user/profile')
        }
    }
    const inputPic = (e) => {
        e.preventDefault()
        picFile.current.click()
    }


    const changePic = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('picture', picFile.current.files[0])
        const data = await changePP(process.env.BACKEND + '/user/changepp', formData)
        mutate(process.env.BACKEND + '/user/profile')
    }


    const changeMode = (e) => {
        e.preventDefault()
        if (editMode) {
            setEditMode(false)
            editPanel.current.classList.remove("animate-moveLeft")
            editPanel.current.classList.add("animate-vanishRight")
            setTimeout(() => {
                editPanel.current.classList.add("invisible")
            }, 500);
        }
        else {
            editPanel.current.classList.remove("invisible")
            editPanel.current.classList.remove("animate-vanishRight")
            editPanel.current.classList.add("animate-moveLeft")
            setEditingProfile(profile)
            setEditMode(true)
        }
    }

    const disableMode = () => {
        if (editMode) {
            setEditMode(false)
            setEditWarning("")
            editPanel.current?.classList.remove("animate-moveLeft")
            editPanel.current?.classList.add("animate-vanishRight")
            setTimeout(() => {
                editPanel.current?.classList.add("invisible")
            }, 500);
        }
    }

    const verifyEmail = async () => {
        const data = await sendEmailVerification(process.env.BACKEND + "/user/email/verify")
        if (typeof data !== typeof undefined) {
            setVerification(data.message)
        }
    }

    if (typeof window !== 'undefined') {
        window.addEventListener("click", (e) => {
            if (!editPanel.current?.contains(e.target)) {
                if (!editButton.current?.contains(e.target)) disableMode()
            }
        })
    }

    return (
        <div className={`w-full h-screen bg-back dark:bg-background`}>
            <Head>
                <title>Profile | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="Check your profile and edit your documents if you want."
                />
                <meta name="keywords" content="Profile" />
                <meta property="og:title" content="Profile | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="Check your profile and edit your documents if you want." key="ogdesc" />
            </Head>
            <Header page="profile" />
            <div className={`w-full h-full flex pt-[60px] md:pt-[80px] dark:bg-background`}>
                <div className={`relative w-full h-full flex items-center justify-center gap-20`}>
                    <div className={`flex flex-col w-full h-full dark:bg-background dark:text-mainText`}>
                        <div className={`flex flex-col gap-10 p-24 pl-10 pr-10 font-sans tracking-wide w-full dark:bg-background`}>
                            <div className='flex-col flex md:flex-row items-center gap-10'>
                                <div onClick={inputPic} className='hover:cursor-pointer hover:opacity-60 rounded-sm flex justify-center items-center text-center relative'>
                                    <span>
                                        <Avatar src={profilePicture} alt='' sx={{ width: 80, height: 80 }}></Avatar>
                                    </span>
                                    <span className='rounded-full bg-pink-100 absolute bottom-0 right-0 p-1 opacity-90 hover:opacity-40'>
                                        <ImCamera color='black' />
                                    </span>
                                </div>
                                <input onChange={changePic} type='file' accept='.png, .jpg, .jpeg' name="" ref={picFile} hidden />
                                <div className='flex flex-col items-center md:items-start gap-2'>
                                    <div className='gap-0 flex flex-col items-center md:items-start'>
                                        <span className='text-lg'>{profile?.firstName ? profile.firstName + " " + profile.lastName : "Unknown"}</span>
                                        <span className='italic'>{profile?.type}</span>
                                    </div>
                                    <div className='flex items-center md:items-start flex-col text-blue-500 text-sm'>
                                        <div className='flex flex-col md:flex-row items-center md:gap-2'>
                                            <div className='flex items-center gap-1'>
                                                <MdOutlineEmail />
                                                <span>{profile?.email ? profile.email : "Unknown"}</span>
                                            </div>
                                            <div onClick={verifyEmail} className='mb-2 md:mb-0 text-red-500 hover:cursor-pointer hover:underline'>{profile?.isVerified ? "" : "Verify email"}</div>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <IoMdCall />
                                            <span>{profile?.phone ? profile.phone : "Unknown"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button ref={editButton} onClick={changeMode} className="md:ml-20 flex items-center transition duration-200 outline-2 text-primary outline font-sans outline-blue-400 rounded-lg  hover:bg-blue-500 hover:text-white px-3 py-1 text-xl">
                                        <span>Edit</span>
                                        <BiEditAlt />
                                    </button>
                                </div>
                            </div>
                            <div className='text-center text-red-600 md:text-left md:ml-28'>
                                {verification}
                            </div>
                        </div>
                        <div className='flex flex-col dark:bg-slate-500 dark:text-white'>
                            <div className='flex items-center gap-5 border-b-2 font-sans w-full py-2'>
                                <span className={`${active === "Profile" ? "text-blue-900 -translate-y-[2px] text-lg" : "text-md"} ml-5 hover:cursor-pointer`} onClick={() => {
                                    router.push({ query: { ...router.query, active: 'Profile' } });
                                    setActive("Profile")
                                }}>Profile</span>
                                <span className={`${active === "SolvedMcqs" ? "text-blue-900 -translate-y-[2px] text-xl" : "text-md "} hover:cursor-pointer`} onClick={() => {
                                    router.push({ query: { ...router.query, active: 'SolvedMcqs' } });
                                    setActive("SolvedMcqs")
                                }}>Solved Mcqs</span>
                            </div>
                        </div>
                        <div className={`p-5 dark:bg-background bg-back dark:text-mainText pt-10`}>
                            {active === "Profile" ? <ProfileUser profile={profile} /> : null}
                            {active === "SolvedMcqs" ? <SolvedMcqs profile={profile} /> : null}
                        </div>

                        <Footer />

                    </div>
                    <div ref={editPanel} className={`invisible flex flex-col gap-5 p-10 mt-[60px] md:mt-[80px] fixed right-0 rounded-lg w-[350px] bg-footer shadow-lg dark:bg-formBox h-full overflow-y-auto z-50 pb-20 md:pb-0`}>
                        <div>
                            <span className='float-right hover:cursor-pointer hover:translate-y-0.5 hover:translate-x-0.5'><IoMdClose size={30} color="white" onClick={() => {
                                disableMode()
                            }} /></span>
                        </div>
                        <div className='text-mainText text-2xl text-center font-semibold font-sans'>Edit Profile</div>
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <div className="flex flex-col md:flex-row  md:gap-3">
                                <div className='flex flex-col mb-4'>
                                    <label className="block text-mainText font-sans text-lg mb-2" htmlFor="email">
                                        FirstName
                                    </label>
                                    <input className="font-sans shadow appearance-none border focus:outline-blue-600 focus:shadow-none rounded w-full py-2 px-3 text-gray-700 leading-tight" type="text" placeholder="First Name"
                                        value={editingProfile.firstName}
                                        onChange={(e) =>
                                            setEditingProfile((prev) => {
                                                return { ...prev, firstName: e.target.value };
                                            })} />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className="block text-mainText font-sans text-lg mb-2" htmlFor="email">
                                        LastName
                                    </label>
                                    <input className="font-sans shadow appearance-none border focus:outline-blue-600 focus:shadow-none rounded w-full py-2 px-3 text-gray-700 leading-tight" type="text" placeholder="Last Name"
                                        value={editingProfile.lastName}
                                        onChange={(e) =>
                                            setEditingProfile((prev) => {
                                                return { ...prev, lastName: e.target.value };
                                            })} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="block text-mainText font-sans text-lg mb-2" htmlFor="email">
                                        College
                                    </label>
                                    <input className="font-sans shadow appearance-none border focus:outline-blue-600 focus:shadow-none rounded w-full py-2 px-3 text-gray-700 leading-tight" type="text" placeholder="College"
                                        value={editingProfile.college}
                                        onChange={(e) =>
                                            setEditingProfile((prev) => {
                                                return { ...prev, college: e.target.value };
                                            })} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="block text-mainText font-sans text-lg mb-2" htmlFor="email">
                                        Age
                                    </label>
                                    <input className="font-sans shadow appearance-none border focus:outline-blue-600 focus:shadow-none rounded w-full py-2 px-3 text-gray-700 leading-tight" type="text" placeholder="Age"
                                        value={editingProfile.age}
                                        onChange={(e) =>
                                            setEditingProfile((prev) => {
                                                return { ...prev, age: Number(e.target.value) };
                                            })} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="block text-mainText font-sans text-lg mb-2" htmlFor="email">
                                        Address
                                    </label>
                                    <input className="font-sans shadow appearance-none border rounded focus:outline-blue-600 focus:shadow-none w-full py-2 px-3 text-gray-700 leading-tight" type="text" placeholder="Address"
                                        value={editingProfile.address}
                                        onChange={(e) =>
                                            setEditingProfile((prev) => {
                                                return { ...prev, address: e.target.value };
                                            })} />
                                </div>
                            </div>
                            <div className="mb-6">
                                <div>
                                    <label className="block text-mainText font-sans text-lg mb-2" htmlFor="email">
                                        Phone
                                    </label>
                                    <input className="mb-3 font-sans shadow appearance-none border rounded focus:outline-blue-600 focus:shadow-none w-full py-2 px-3 text-gray-700 leading-tight" type="text" placeholder="Phone No"
                                        value={editingProfile.phone}
                                        onChange={(e) =>
                                            setEditingProfile((prev) => {
                                                return { ...prev, phone: e.target.value };
                                            })} />
                                    <div className='text-center text-red-300'>{editWarning}</div>
                                </div>
                            </div>
                            <div className='mb-24'>
                                <button className="font-sans float-right text-lg hover:translate-y-0.5 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}


const ProfileUser = ({ profile }) => {
    return (
        <div className={`grid md:grid-cols-2 gap-20 font-sans dark:bg-background w-full min-h-[500px]`}>
            <div className='flex flex-col gap-5'>
                <div className='border-b-2 text-xl font-medium'>
                    Personal Information
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <span className='text-lg text-faintText'>Age</span>
                        <span className="font-light ">{profile?.age ? profile.age : "Unknown"}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-lg text-faintText'>College</span>
                        <span className="font-light ">{profile?.college ? profile.college : "Unknown"}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='border-b-2 text-xl font-medium'>
                    Location
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <span className='text-lg text-faintText'>Country</span>
                        <span className="font-light ">Nepal</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-lg text-faintText'>Address</span>
                        <span className="font-light ">{profile?.address ? profile.address : "Unknown"}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='border-b-2 text-xl font-medium'>
                    Contact Information
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <span className='text-lg text-faintText'>Phone</span>
                        <span className="font-light ">{profile?.phone ? profile.phone : "Unknown"}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-lg text-faintText'>Email</span>
                        <span className="font-light ">{profile?.email ? profile.email : "Unknown"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


const SolvedMcqs = ({ profile }) => {
    // const { data, error } = useSWR(process.env.BACKEND + "/mcq/submissions", async url => await getSolvedMcqs(url), { revalidateOnFocus: false, revalidateOnReconnect: true })
    // const showSize = 5
    // const submissions = data?.data ? [...data?.data]?.reverse() : []
    return (
        <div className={`gap-5 dark:bg-background text-lg w-full min-h-[500px] overflow-auto`}>
            <div className='mb-2'>Go to the respective test section to see your submisssions.</div>
            <div className='flex'>
                1.&nbsp;<span className='hover:underline'><Link href="/profile/submissions/mock-test">Mock Test</Link></span>&nbsp;&nbsp;
                <Link href="/profile/submissions/mock-test">
                    <span>
                        <HiOutlineExternalLink size={20} />
                    </span>
                </Link>
            </div>
            <div className='flex'>
                2.&nbsp;<span className='hover:underline'><Link href="/profile/submissions/chapterwise-test">Chapterwise Test</Link></span>&nbsp;&nbsp;
                <Link href="/profile/submissions/chapterwise-test">
                    <span>
                        <HiOutlineExternalLink size={20} />
                    </span>
                </Link>
            </div>
        </div>
    );
}