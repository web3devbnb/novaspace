import React, { useEffect, useRef, useState, useMemo } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/analytics'
import 'firebase/compat/app-check'
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check'
import useRefresh from 'hooks/useRefresh'
import Filter from 'bad-words'

const filter = new Filter()

// uses firebase real-time database
firebase.initializeApp({
  apiKey: "AIzaSyDxzdcsfbSTcGjR5FiPddoRb20lVS8fTa0",
  authDomain: "shibanova-64bff.firebaseapp.com",
  projectId: "shibanova-64bff",
  storageBucket: "shibanova-64bff.appspot.com",
  messagingSenderId: "507398672762",
  appId: "1:507398672762:web:6e55dfb040ba17173586c3",
  measurementId: "G-VZRSSNPMW1",
})

// const appCheck = firebase.appCheck();
// // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// // key is the counterpart to the secret key you set in the Firebase console.
const app = initializeApp({
  apiKey: "AIzaSyDxzdcsfbSTcGjR5FiPddoRb20lVS8fTa0",
  authDomain: "shibanova-64bff.firebaseapp.com",
  projectId: "shibanova-64bff",
  storageBucket: "shibanova-64bff.appspot.com",
  messagingSenderId: "507398672762",
  appId: "1:507398672762:web:6e55dfb040ba17173586c3",
  measurementId: "G-VZRSSNPMW1"
})

// use for localhost
// eslint-disable-next-line no-restricted-globals
// self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('6Le6zTwfAAAAADHtkEE3mOJ3NHtOS8J0bet5CDrD'),
//   isTokenAutoRefreshEnabled: true
// });
firebase.appCheck().activate('6Le6zTwfAAAAADHtkEE3mOJ3NHtOS8J0bet5CDrD', true)

// const auth = firebase.auth();

// styled components
const Wrapper = styled.div`
  padding: 5px;
  background: #000000;
  border: 1px solid #5affff;
  position: fixed;
  bottom: 40px;
  right: 10px;
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
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;
  padding: 5px;
  // max-width: 300px;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 300px;
  }
`

const Input = styled.input`
  width: 85%;
  margin-left: 5px;
`
const InputMenu = styled.div``

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
  color: ${(props) => (props.usermessage === true ? 'gray' : '#009d9d')};
`

const NameSpan = styled.span`
  font-size: 0.9rem;
`

const WarningWrapper = styled.div`
  max-width: 300px;
  text-align: center;
`

const WarningButton = styled.button``

function MSGApp({ username, playerExists }) {
  const user = username.toString()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    // check when the component is loaded
    const localStorageToggled = localStorage.getItem('toggle')

    // If is not null
    if (localStorageToggled) {
      setToggle(localStorageToggled === 'true' && true)
    } else {
      // If null set the localStorage key/value as a string.
      localStorage.setItem('toggle', `${toggle}`)
    }
  }, [toggle])

  const handleToggle = (tog) => {
    localStorage.setItem('toggle', `${tog}`)
    setToggle(tog)
  }

  return (
    <Wrapper>
      <Header>
        <h1>NOVARIA CHAT</h1>
      </Header>
      {!toggle && (
        <WarningWrapper>
          This chat box is open to all players. Never share your personal information, anyone asking for it is scamming
          you. Anyone asking you to go to a different website is scamming you. Chat at your own risk. <br />
          <WarningButton onClick={() => handleToggle(!toggle)}>I Understand</WarningButton>
        </WarningWrapper>
      )}

      <section>{user && playerExists ? <ChatRoom user={user} /> : 'MUST BE SIGNED IN TO GAME TO CHAT'}</section>
    </Wrapper>
  )
}

function ChatRoom({ user }) {
  const dummy = useRef()
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('')
  const messagesRef = firebase.database().ref('messages/')
  const { slowRefresh } = useRefresh()

  const snapshotToArray = (snapshot) => {
    const returnArr = []

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val()
      item.key = childSnapshot.key
      returnArr.push(item)
    })

    return returnArr
  }

  const sendMessage = async (e) => {
    // e.preventDefault();

    const uid = user

    await messagesRef.push({
      text: filter.clean(formValue),
      createdAt: new Date().toUTCString(),
      uid,
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }
  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      sendMessage()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      // firebase.database().ref('messages/').orderByChild('createdAt').limitToLast(25).on('value', resp => {
      firebase
        .database()
        .ref('messages/')
        .limitToLast(50)
        .on('value', (resp) => {
          setMessages([])
          setMessages(snapshotToArray(resp))
          // this scroll method moves the whole page... need to find better solution
          dummy.current.scrollIntoView({ behavior: 'auto' })
        })
    }
    fetchData()
  }, [])

  return (
    <>
      <Main>
        {messages && messages.map((msg) => <ChatMessage user={user} key={msg.id} message={msg} />)}

        <span ref={dummy} />
      </Main>
      <Input
        id="txt"
        maxlength="240"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        onKeyUp={handleKeypress}
        placeholder="type message"
      />

      <button id="send" type="button" disabled={!formValue} onClick={sendMessage}>
        🕊️
      </button>
    </>
  )
}

function ChatMessage({ message, user }) {
  const { text, uid, createdAt } = message

  const messageClass = uid === user
  const timeStamp = new Date(createdAt).toLocaleTimeString()

  return (
    <>
      <MessageBox usermessage={messageClass}>
        {/* <MsgName usermessage={messageClass}>{uid}</MsgName> */}
        <MsgName usermessage={messageClass}>
          <NameSpan>{uid}</NameSpan> - {timeStamp}
        </MsgName>
        <MsgItem>{text}</MsgItem>
      </MessageBox>
    </>
  )
}

export default MSGApp
