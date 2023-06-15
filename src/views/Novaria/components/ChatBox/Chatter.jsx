import React, { useRef, useState } from 'react'
// import './Chat.css'
import styled from 'styled-components'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/analytics'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

// uses firestore
firebase.initializeApp({
  apiKey: 'AIzaSyDxzdcsfbSTcGjR5FiPddoRb20lVS8fTa0',
  authDomain: 'shibanova-64bff.firebaseapp.com',
  projectId: 'shibanova-64bff',
  storageBucket: 'shibanova-64bff.appspot.com',
  messagingSenderId: '507398672762',
  appId: '1:507398672762:web:6e55dfb040ba17173586c3',
  measurementId: 'G-VZRSSNPMW1',
})

// const auth = firebase.auth();
const firestore = firebase.firestore()
const analytics = firebase.analytics()

// styled components
const Wrapper = styled.div`
  margin: 10px;
  padding: 5px;
  background: #00000030;
`
const Header = styled.div`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #5affff;
`

const Main = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 5px;
  max-width: 300px;
`

const Input = styled.input`
  width: 85%;
`

const MessageBox = styled.div`
  display: flex;
  margin: 5px;
  align-self: ${(props) => props.usermessage === true && 'flex-end'};
  flex-direction: column;
  text-align: ${(props) => props.usermessage === true && 'right'};
  color: ${(props) => props.usermessage === true && 'white'};
`
const MsgItem = styled.div``
const MsgName = styled.div`
  font-size: 0.7rem;
`

function MSGApp({ username }) {
  const user = username.toString()

  return (
    <Wrapper>
      <Header>
        <h1>NOVARIA CHAT</h1>
      </Header>

      <section>{user ? <ChatRoom user={user} /> : 'CONNECT WALLET TO CHAT'}</section>
    </Wrapper>
  )
}

function ChatRoom({ user }) {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25)

  const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    const uid = user

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Main>
        {messages && messages.reverse().map((msg) => <ChatMessage user={user} key={msg.id} message={msg} />)}

        <span ref={dummy} />
      </Main>

      <Input id="txt" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type message" />

      <button id="send" type="button" disabled={!formValue} onClick={sendMessage}>
        🕊️
      </button>
    </>
  )
}

function ChatMessage({ message, user }) {
  const { text, uid } = message

  const messageClass = uid === user

  return (
    <>
      <MessageBox usermessage={messageClass}>
        <MsgName>{uid}</MsgName>
        <MsgItem>{text}</MsgItem>
      </MessageBox>
    </>
  )
}

export default MSGApp
