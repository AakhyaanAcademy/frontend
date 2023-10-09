import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

function Topics({ courseId, subjectId, chapterId, topics, setChaptersPanelMode, setErrorMessage }) {
    const router = useRouter()
    let topicId = ""
    const splittedLoc = router.asPath.split('/')
    if (splittedLoc.length === 6) {
        topicId = splittedLoc[splittedLoc.length - 1]
    }
    useEffect(() => {
        if (topicId) router.replace(`/programmes/${courseId}/${subjectId}/${chapterId}/${topicId}`)
        else if (topics[0]?._id) router.replace(`/programmes/${courseId}/${subjectId}/${chapterId}/${topics[0]?._id}`)
        else setErrorMessage("There are no topics available at the moment.")
    }, [courseId, subjectId, chapterId, topicId, topics, router, setErrorMessage])

    return (
        <div className="flex flex-col divide-y-[0.5px] divide-blue-200">
            {topics?.map((topic, i) =>
                <span className={`${topicId.split('/')[topicId.split('/').length - 1] === topic?._id ? "dark:bg-slate-600 bg-blue-600" : ""} text-mainText/90 text-lg text-center hover:underline hover:cursor-pointer flex flex-col items-center justify-center py-1`} onClick={(e) => {
                    e.preventDefault()
                    setChaptersPanelMode(true)
                    router.push(`/programmes/${courseId}/${subjectId}/${chapterId}/${topic?._id}`)
                }} key={i}>
                    <Link
                        href={`/programmes/${courseId}/${subjectId}/${chapterId}/${topic?._id}`}
                        legacyBehavior>
                        {topic?.title}
                    </Link>
                </span>
            )}
        </div>
    );
}

export default Topics;