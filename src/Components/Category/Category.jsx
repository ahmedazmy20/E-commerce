import React from 'react'

export default function Category({categorie}) {
    return (<>
        <div  className="max-w-2xl hover:shadow-lg  hover:shadow-green-500 duration-500  border-2 rounded-lg">
            <div className="bg-white shadow-md  rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 text-center">
                <div>
                    <img className="rounded-t-lg p-8 md:h-[300px] lg:h-[350px] h-[200px] w-full " src={categorie.image} alt="category image" />
                </div>
                <div className="px-5 pb-5">
                    <h3 className=" text-green-700 text-3xl font-semibold  dark:text-white line-clamp-1">{categorie.name}</h3>
                </div>
            </div>
        </div>
    </>
    )
}
