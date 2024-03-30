import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [isNumber, setIsNumber] = useState(false)
  const [ischaracter, setCharacter] = useState(false)
  const [password, setPassword] = useState('')

  // use ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstvwxyz'

    str += isNumber ? '0123456789' : ''
    str += ischaracter ? '@#$%&*{}[]=-^><~?' : ''
    // if (isNumber) str += '0123456789'
    // if (ischaracter) str += '@#$%&*{}[]=-^><~?'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, isNumber, ischaracter, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, isNumber, ischaracter, passwordGenerator])

  const copypasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500  bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-noe w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-sky-700"
            onClick={copypasswordtoclipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              id="numberInput"
              onChange={() => {
                setIsNumber((prev) => !prev)
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              id="characterInput"
              onChange={() => {
                setCharacter((prev) => !prev)
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
