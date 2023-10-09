// import { useState, useEffect } from "react"
// import { useRouter } from 'next/router'

export default function Paginate({ nextLabel, previousLabel, pageCount, onPageChange, containerClassName, previousLinkClassName, nextLinkClassName, pageClassName, activeClassName, disabledClassName, activePage, setActivePage }) {
    // const router = useRouter()
    const upperRange = 2
    const lowerRange = 2 + 1

    return (
        <>
            {pageCount > 1 ?
                <div className={containerClassName}>
                    <div onClick={() => {
                        if (activePage - 1 !== 0) {
                            onPageChange({ selected: activePage - 1 })
                            setActivePage(activePage - 1)
                            // router.push({ query: { ...router.query, active: activePage - 1 } });
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            })
                        }
                    }} className={previousLinkClassName}>{previousLabel}</div>
                    {
                        [...Array(pageCount)].map((e, i) => {
                            if ((i < activePage + upperRange && i > activePage - lowerRange) || (i === activePage + upperRange && i === pageCount - 1) || (i === activePage - lowerRange && i === 0)) {
                                return (
                                    <div onClick={() => {
                                        onPageChange({ selected: i + 1 })
                                        if (activePage !== i + 1) {
                                            setActivePage(i + 1)
                                            // router.push({ query: { ...router.query, active: i + 1 } });
                                        }
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        })
                                    }} key={i + 1} className={`${activePage === i + 1 ? activeClassName : disabledClassName} ${pageClassName}`}>{i + 1}</div>
                                )
                            } else if (i === pageCount - 1 && activePage < pageCount - upperRange) {
                                return (
                                    < >
                                        ....
                                        <div onClick={() => {
                                            onPageChange({ selected: i + 1 })
                                            if (activePage !== i + 1) {
                                                setActivePage(i + 1)
                                                // router.push({ query: { ...router.query, active: i + 1 } });
                                            }
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth'
                                            })
                                        }} key={i + 1} className={`${activePage === i + 1 ? activeClassName : disabledClassName} ${pageClassName}`}>{i + 1}</div>
                                    </>
                                )
                            } else if (i === 0 && activePage > lowerRange - 1) {
                                return (
                                    < >
                                        <div onClick={() => {
                                            onPageChange({ selected: i + 1 })
                                            if (activePage !== i + 1) {
                                                setActivePage(i + 1)
                                                // router.push({ query: { ...router.query, active: i + 1 } });
                                            }
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth'
                                            })
                                        }} key={i + 1} className={`${activePage === i + 1 ? activeClassName : disabledClassName} ${pageClassName}`}>{i + 1}</div>
                                        ....
                                    </>
                                )
                            }
                        })
                    }
                    <div onClick={() => {
                        if (activePage + 1 <= pageCount) {
                            onPageChange({ selected: activePage + 1 })
                            setActivePage(activePage + 1)
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            })
                            // router.push({ query: { ...router.query, active: activePage + 1 } });
                        }
                    }} className={nextLinkClassName}>{nextLabel}</div>
                </div>
                :
                <></>
            }
        </>
    )
}
