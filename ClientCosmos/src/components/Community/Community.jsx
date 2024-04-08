import React from "react";

function Community() {
  return (
    <>
      <div className="flex">
        <div className="w-1/4 h-screen shadow-xl py-7">
          <div className=" px-10 ">
            <input
              placeholder="Search here"
              className="w-full h-10  border rounded-md bg-white text-black outline-none borde pl-3"
              type="text"
            />
          </div>
          <div className="w-full pt-10">
            <div className="flex items-center border-b-2 cursor-pointer p-5 gap-3 hover:shadow-lg duration-500">
              <img
                className="w-10 h-10 rounded-full"
                src="https://pm1.narvii.com/6051/df6890296e8c3a8db7583b74c1a5dfbcc31cf43b_hq.jpg"
                alt=""
              />
              <div className="">
                <h2 className="text-xl font-semibold">HYDRA</h2>
                <p className="line-clamp-1 text-gray-700">
                  John : It is the first constellation discovered by nasa
                </p>
              </div>
            </div>
            <div className="flex bg-gray-200 items-center border-b-2 cursor-pointer p-5 gap-3 hover:shadow-lg duration-500">
              <img
                className="w-10 h-10 rounded-full"
                src="https://tse1.mm.bing.net/th?id=OIP.zjkRpue82uCwWxshD08dxQHaEK&pid=Api&P=0&h=220"
                alt=""
              />
              <div className="">
                <h2 className="text-xl font-semibold">SPACE X</h2>
                <p className="line-clamp-1 text-gray-700">Mark : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
                  illum cumque quaerat veritatis. Illo fuga quis, at quo sit
                  soluta expedita odit temporibus, id est adipisci! Esse culpa
                  debitis accusantium!</p>
              </div>
            </div>
            <div className="flex items-center border-b-2 cursor-pointer p-5 gap-3 hover:shadow-lg duration-500">
              <img
                className="w-10 h-10 rounded-full"
                src="https://tse4.mm.bing.net/th?id=OIP.VJoP-wUbVsfhxfeeFSHJBwHaGR&pid=Api&P=0&h=220"
                alt=""
              />
              <div className="">
                <h2 className="text-xl font-semibold">GANYMEDE</h2>
                <p className="line-clamp-1 text-gray-700">
                  Alex : It is the first constellation
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 px-6 h-screen">
          <nav className="px-10 py-6 border-b-2">
            <div className="flex items-center gap-5 ">
              <img
                className="w-14 rounded-full h-14"
                src="https://tse1.mm.bing.net/th?id=OIP.zjkRpue82uCwWxshD08dxQHaEK&pid=Api&P=0&h=220"
                alt=""
              />
              <h2 className="text-2xl font-semibold"> SPACE X</h2>
             
            </div>
            <img src="" alt="" />
          </nav>
          <div className="h-3/4 myPosts pb-7 overflow-auto">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=600"
                  />
                </div>
              </div>
              <div className="chat-bubble  bg-white text-black shadow-lg py-4">
                <p className="text-black font-semibold">Antonio</p>
                <p className="text-gray-700">
                  It was said that you would, destroy the Sith, not join them.
                </p>
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    className="rounded-full"
                    alt="Tailwind CSS chat bubble component"
                    src="https://tse2.mm.bing.net/th?id=OIP.2FWfeiou-GAT-I5FZsRXkAHaJ4&pid=Api&P=0&h=220"
                  />
                </div>
              </div>
              <div className="chat-bubble  bg-white text-black shadow-lg py-4 w-2/4">
                <p className="text-black font-semibold">Mark</p>
                <p className="text-gray-700">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
                  illum cumque quaerat veritatis. Illo fuga quis, at quo sit
                  soluta expedita odit temporibus, id est adipisci! Esse culpa
                  debitis accusantium!
                </p>
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=600"
                  />
                </div>
              </div>
              <div className="chat-bubble  bg-white text-black shadow-lg py-4 w-2/4">
                <p className="font-semibold">Antonio</p>
                <img
                  src="https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  className="rounded-lg mt-2"
                />
                <div className="text-gray-700 pt-2">
                  Lorem ipsum dolor sit amet consectetur adipisici tenetur natus
                  quos aperiam cumque quia nobis? Aliquid sint aliquam quo
                  similique.
                </div>
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    className="rounded-full"
                    alt="Tailwind CSS chat bubble component"
                    src="https://tse2.mm.bing.net/th?id=OIP.2FWfeiou-GAT-I5FZsRXkAHaJ4&pid=Api&P=0&h=220"
                  />
                </div>
              </div>
              <div className="chat-bubble  bg-white text-black shadow-lg py-4 w-2/4">
                <p className="text-black font-semibold">Mark</p>
                <p className="text-gray-700">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
                  illum cumque quaerat veritatis. Illo fuga quis, at quo sit
                  soluta expedita odit temporibus, id est adipisci! Esse culpa
                  debitis accusantium!
                </p>
              </div>
            </div>
          </div>

          <div className="messageBox  border py-5 px-10 flex justify-around">
            <div className="fileUploadWrapper">
              <label htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 337 337"
                >
                  <circle
                    strokeWidth="20"
                    stroke="#6c6c6c"
                    fill="none"
                    r="158.5"
                    cy="168.5"
                    cx="168.5"
                  ></circle>
                  <path
                    strokeLinecap="round"
                    strokeWidth="25"
                    stroke="#6c6c6c"
                    d="M167.759 79V259"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeWidth="25"
                    stroke="#6c6c6c"
                    d="M79 167.138H259"
                  ></path>
                </svg>
                <span className="tooltip">Add an image</span>
              </label>
              <input type="file" id="file" name="file" />
            </div>
            <input
              required
              placeholder="Type here.."
              type="text"
              id="messageInput"
              className="w-11/12 h-full bg-transparent pl-3 outline-none"
            />
            <button id="sendButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 664 663"
              >
                <path
                  fill="none"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="33.67"
                  stroke="#6c6c6c"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
