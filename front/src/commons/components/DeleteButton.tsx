import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'

export default function DeleteButton(props: { action: any; id: number }) {
  const [level, setLevel] = useState(0)
  const [color, setColor] = useState('#e7dddd')
  const { action, id } = props

  function handleClick() {
    setLevel(level + 1)
    if (level === 0) {
      setColor('#e04056')
    }
    if (level === 1) {
      action(id)
      setLevel(0)
      setColor('#e7dddd')
    }
  }

  return (
    <i onClick={handleClick}>
      <FiTrash2 size={24} color={color} />
    </i>
  )
}
