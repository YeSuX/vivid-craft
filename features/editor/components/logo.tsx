import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href='/'>
        <div>
            <Image
                src='/logo.svg'
                fill
                alt="Image AI"
            
            />
        </div>
    </Link>
  )
}
export default Logo