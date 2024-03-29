import { Button } from "flowbite-react";


export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500
    justify-center items-center rounded-tl-3xl rounded-br-3xl
    text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">
                Want to learn more about Leetcode?
            </h2>
            <p className="text-gray-500 my-2">
                Checkout these resources with 500 practices questions
            </p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl
            rounded-bl-none">
                <a href="https://www.leetcode.com" target="_blank" rel='noopener noreferrer'> 
                  500 Practice Questions
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://miro.medium.com/v2/resize:fit:990/1*2i9TlQ8_EFSs3T741jrmig.png" />
        </div>
    </div>
  )
}
