import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import useFetch from '../hooks/useFetch';
const AllNewsPage = () => {
    const [newsCount, setNewsCount] = useState(16)
    let { data, loading, error, refetch: postsRefetch } = useFetch('https://jsonplaceholder.typicode.com/posts');

    if (loading) {
        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item, index) => (
                    <article key={index} className='shadow rounded-md  p-3'>
                        <div className='bg-gray-200 animate animate-pulse h-6 w-full'></div>
                    </article>
                ))
                }
            </div>
        )
    }
    if (error) {
        return (
            <div>Error occured: {error}</div>
        )
    }
    return (
        <>
            {/* <button onClick={postsRefetch}>Refetch</button> */}
            {data.length > 0 ?
                <>
                    <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5'>
                        {data.slice(0, newsCount).map((newsItem, idx) => (
                            <Link key={idx} to={`/news-details/${newsItem.id}`}>
                                <article className='shadow hover:border-gray-300 border border-transparent  rounded-md min-h-20  p-3'>
                                    <h3 className='line-clamp-2'>{newsItem.title}</h3>
                                </article>
                            </Link>
                        ))}
                    </div>

                    {newsCount < 99 &&

                        <div className='flex justify-center my-10'>
                            <button onClick={() => setNewsCount(newsCount + 16)} className='bg-green-500 text-white p-3 px-5 rounded-md'>Load More News</button>
                        </div>
                    }
                </>
                :
                <div>
                    There is no news items
                </div>
            }
        </>
    )
}

export default AllNewsPage