import React, { useEffect, useState } from 'react'

function LazyImage({url, alt}) {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState('opacity-0');

  useEffect(()=>{
    isLoading? setOpacity('opacity-0') : setOpacity('opacity-100');
  },[isLoading])

  return (
    <>
      {isLoading && (
        <div className="absolute h-full z-10 w-full flex items-center justify-center">
          ...loading
        </div>
      )}
      <img src={url} alt={alt} width='50%' height='auto' className={` oject-contain ${opacity}`} loading='lazy' onLoad={()=>{setIsLoading(false)}}/>
    </>
  )
}

export default LazyImage