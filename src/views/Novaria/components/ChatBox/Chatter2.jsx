import React, { useEffect, useRef, useState, useMemo } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/analytics'
import 'firebase/compat/app-check'
import useRefresh from 'hooks/useRefresh'
import Filter from 'bad-words'

const filter = new Filter()

// uses firebase real-time database
firebase.initializeApp({
  apiKey: "AIzaSyD5BYm6GWsTf9LNt2vrGG9pUGVvv4z9DXA",
  authDomain: "novaria-chat.firebaseapp.com", 
  projectId: "novaria-chat",
  storageBucket: "novaria-chat.appspot.com",
  messagingSenderId: "778958864134",
  appId: "1:778958864134:web:d0954aa81fc2b951f32887",
  measurementId: "G-WLM7ED9HN0"
})

// const appCheck = firebase.appCheck();
// // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// // key is the counterpart to the secret key you set in the Firebase console.
// appCheck.activate(
//   '6LfavC4fAAAAAJaICCAhbbbiyTNdcR17HV73GGiV',

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   true);



// const auth = firebase.auth();

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
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;
  padding: 5px;
  max-width: 300px;
  
  &::-webkit-scrollbar { 
    width: 5px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
`

const Input = styled.input`
  width: 80%;
`

const MessageBox = styled.div`
  display: flex;
  margin: 5px;
  align-self: ${props => props.usermessage === true && 'flex-end'};
  flex-direction: column;
  text-align: ${props => props.usermessage === true && 'right'};
  color: ${props => props.usermessage === true && 'white'};
`
const MsgItem = styled.div`

`
const MsgName = styled.div`
  font-size: .7rem;
  color: ${props => props.usermessage === true ? 'gray' : '#00c4c4'};
`

function MSGApp({username, playerExists}) {

  const user = username.toString();

  return (
    <Wrapper>
      <Header>
        <h1>NOVARIA CHAT</h1>
        
      </Header>

      <section>
        {user && playerExists ? <ChatRoom user={user} /> : 'MUST BE SIGNED IN TO GAME TO CHAT'}
      </section>

    </Wrapper>
  );
}

function ChatRoom({user}) {
  const dummy = useRef();
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('')
  const messagesRef = firebase.database().ref('messages/')
  const { slowRefresh } = useRefresh()

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const uid = user;

    await messagesRef.push({
      text: filter.clean(formValue),
      createdAt: new Date().toDateString(),
      uid
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

 
  useEffect(() => {
    const fetchData = async () => {
      // firebase.database().ref('messages/').orderByChild('createdAt').limitToLast(25).on('value', resp => {
      firebase.database().ref('messages/').limitToLast(50).on('value', resp => {
        setMessages([]);
        setMessages(snapshotToArray(resp))
      })
    }
    fetchData();
  }, [])
  return (<>
    <Main>

      {messages && messages.map(msg => <ChatMessage user={user} key={msg.id} message={msg} />)}

      <span ref={dummy} />

    </Main>

    
    
      <Input id='txt' maxlength="240" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type message" />

      <button id='send' type="button" disabled={!formValue} onClick={sendMessage}>🕊️</button>
    
    
  </>)
}


function ChatMessage({message, user}) {
  const { text, uid } = message;

  const messageClass = uid === user;
  

  return (<>
    <MessageBox usermessage={messageClass}>
      <MsgName usermessage={messageClass}>{uid}</MsgName>
      <MsgItem>{text}</MsgItem>
    </MessageBox>
  </>)
}


export default MSGApp;