import { useState , useCallback , useEffect , useRef} from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed , setnumAllowed] = useState(false);
  const [charAllow , setcharAllow] = useState(false);
  const [password , setPassword]= useState();
  //useRef
  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+= "0123456789"
    if(charAllow) str+= "!@#$%^&*(){}~`"
    for(let i=0; i<length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char) //we will concatenate characters
    }
    setPassword (pass) 
  }, [length, numAllowed, charAllow])

  const copyPassword = useCallback(()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  }, [password])
//now look we need to call this function for numbers as well as characters, now to optimise this
//  will use useCallback hook , to memomise this
useEffect (()=>{
  passwordgenerator()
}, [length, numAllowed, charAllow, passwordgenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-center text-orange-500 bg-gray-700 '>
     <h1 className='text-white my-3'>Password Generator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type= "text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      >
      </input>
      <button onClick={copyPassword} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={8}        //slider
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=> {setLength(e.target.value)}}
         />
         <label>Length : {length}</label>

      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked= {numAllowed}
        id = "numInput"
        onChange={()=> {
          setnumAllowed((prev)=> !prev)
        }}
         />
         <label>Add Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked= {numAllowed}
        id = "charInput"
        onChange={()=> {
          setcharAllow((prev)=> !prev)
        }}
         />
         <label>Add Characters</label>
      </div>
     </div>
     </div>
     
     
    </>
  )
}

export default App
