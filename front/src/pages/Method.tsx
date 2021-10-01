import { useState } from 'react'
import '../styles/pages/main-page.css'
import '../styles/pages/method-page.css'

export default function Method() {
  const [placeholders, setPlaceholders] = useState<Array<string>>([
    '',
    'banana',
    'apple',
    'orange',
    'pear',
    'grape',
  ])
  const [chosenPlaceholders, setChosenPlaceholders] = useState<Array<string>>(
    []
  )

  const handleChange = (e: any) => {
    const { value } = e.target

    const newPlaceholders = placeholders.filter(
      (placeholder) => placeholder !== value
    )

    setPlaceholders(newPlaceholders)
    setChosenPlaceholders([...chosenPlaceholders, value])
  }

  return (
    <div id="page-component">
      <main>
        <div id="page-container">
          <h1>Dados</h1>
          <br />
          <form>
            <label>
              Nome:
              <br />
              <input type="text" name="name" />
            </label>
            <br />
            <label>
              Critérios:
              <br />
              <select value={''} onChange={handleChange}>
                {placeholders.map((placeholder: string) => (
                  <option key={placeholder} value={placeholder}>
                    {placeholder}
                  </option>
                ))}
              </select>
            </label>
            {chosenPlaceholders.map((placeholder: string) => (
              <div key={placeholder}>
                <p>{placeholder}</p>
              </div>
            ))}
            <br />
            <br />
            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
