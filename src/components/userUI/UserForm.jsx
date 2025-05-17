'use client'

import { useState } from "react"
import BtnSolid from "../commonUI/BtnSolid"

const UserForm = () => {

  const lang = 'uk'

  const content = {
    uk: {
      title: "Заповніть дані",
      item_0: "Прізвище",
      item_1: "Ім'я",
      item_2: "Ел. пошта",
      item_3: "Повідомлення",
      btnText: "Надіслати"
    },
    en: {
      title: "Fill in the details",
      item_0: "Surname",
      item_1: "Name",
      item_2: "Email",
      item_3: "Message",
      btnText: "Send"
    }
  }

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!!surname) return
    const userMessage = {
      name: name,
      email: email,
      message: message
    }
    console.log(userMessage)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div>
      <h3 className="text-2xl text-center font-bold">{content[lang].title}</h3>
      <form onSubmit={handleSubmit} className="py-7 flex flex-col">
        <label htmlFor="name">{content[lang].item_1}</label>
        <input 
          id="name" 
          className="h-9 bg-white rounded-md mb-7 outline-0 text-txt-dark px-2" 
          value={name} 
          placeholder="Enter your name" 
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="surname" className="hidden" >{content[lang.item_0]}</label>
        <input 
          id="surname" 
          className="hidden" 
          value={surname} 
          placeholder="Enter your name"
          onChange={(e) => setSurname(e.target.value)}
        />
        <label htmlFor="email">{content[lang].item_2}</label>
        <input 
          id="email" 
          className="h-9 bg-white rounded-md mb-7 outline-0 text-txt-dark px-2" 
          value={email} 
          placeholder="Enter your email" 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="message">{content[lang].item_3}</label>
        <input 
          id="message" 
          className="h-9 bg-white rounded-md mb-7 outline-0 text-txt-dark px-2" 
          value={message} 
          placeholder="Type your message here" 
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-center">
          <BtnSolid variant="bronze" btnType="submit">
            {content[lang].btnText}
          </BtnSolid>
        </div>
      </form>

    </div>
  )
}

export default UserForm