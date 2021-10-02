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

  const handleRemove = (placeholder: string) => {
    const newPlaceholders = [...placeholders, placeholder]
    const newChosenPlaceholders = chosenPlaceholders.filter(
      (chosenPlaceholder) => chosenPlaceholder !== placeholder
    )

    setPlaceholders(newPlaceholders)
    setChosenPlaceholders(newChosenPlaceholders)
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
              <input className="drop-down" type="text" name="name" />
            </label>
            <br />
            <label>
              Critérios:
              <br />
              <select className="drop-down" value={''} onChange={handleChange}>
                {placeholders.map((placeholder: string) => (
                  <option key={placeholder} value={placeholder}>
                    {placeholder}
                  </option>
                ))}
              </select>
            </label>
            {chosenPlaceholders.map((placeholder: string) => (
              <div key={placeholder}>
                <label>
                  {placeholder}
                  <button onClick={() => handleRemove(placeholder)}>x</button>
                </label>
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
