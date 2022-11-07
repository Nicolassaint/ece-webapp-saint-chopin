import Link from 'next/link'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const NotFound = () => {
    const router = useRouter();
    console.log("Je suis pas dedans")
    useEffect(() =>{
    setTimeout(()=>{
        router.push('/')
    },3000)},
[])

return (
    <div className="notfound">
        <h1>Oooops</h1>
        <h2>That page cannot be found</h2>
        <p>go back to the <Link href="/about">Home</Link></p>
    </div>
);
}
export default NotFound;