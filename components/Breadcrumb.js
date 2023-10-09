import Link from 'next/link'

export default function Breadcrumb({ props }) {
    return (
        <div className='px-7 rounded-sm md:mt-4'>
            <div className='text-md dark:text-mainText'>
                {props ?
                    props?.map((prop, i) =>
                        <span key={i}>
                            {prop?.header ?
                                <span>
                                    &nbsp;
                                    {i !== props.length - 1 ?
                                        <Link href={`/${prop.link}`}>
                                            <span className="hover:underline cursor-pointer text-blue-900 dark:text-blue-500 text-lg">
                                                {prop.header}
                                            </span>/
                                        </Link>
                                        :
                                        <span className="opacity-60 text-lg">
                                            {prop.header}
                                        </span>
                                    }
                                </span>
                                :
                                <></>
                            }
                        </span>
                    )
                    :
                    <></>
                }
            </div>
        </div>
    );
}
