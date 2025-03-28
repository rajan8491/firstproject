import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    
    let str="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*?"

    for(let i=1;i<=length;i++){
      let idx=Math.floor(Math.random()*str.length+1)
      pass+=str[idx]
    }

    setPassword(pass)


  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  
  const copyPasswordToClipboard = ()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  return (
    <>
      <div className='w-full mx-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center'>Password generator</h1>
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password}
            className='outline-none w-auto py-1 px-3'
            placeholder='Password'
            ref={passwordRef}
            readOnly
          />
          <button 
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>
        <div> 
          <div>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer' 
              onChange={(e)=> {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex">
            <input 
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }}
            />
            <label htmlFor="numberInput" >Numbers</label>
          </div>
          <div className="inline-block">
            <input 
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={()=>{
                setCharAllowed((prev)=>!prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>         
        </div>
      </div>
    </>
  )
}

export default App
