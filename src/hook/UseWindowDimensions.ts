import {useEffect, useState} from 'react'

const getWindowDimensions = (): {
    width: number
    height: number
} => {
    const {innerWidth: width, innerHeight: height} = window
    return {
        width,
        height
    }
}

export const useWindowDimensions = (): {
    width: number
    height: number
} => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        const handleResize = (): void => {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowDimensions
}
