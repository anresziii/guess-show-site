import React from 'react'
import data from '../../../movie.json'

const MyHint = () => {
    return (
        <div>
            {data?.results.map((result: any) =>
                <div>
                    {result.overview}
                </div>
            )}
        </div>
    )
}

export default MyHint
