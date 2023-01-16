import { useDebounce } from '@/hooks/use-debounce'
import styles from './debounce-input.module.css'

export default function DebounceInput() {
  const [name, setName] = useDebounce('', 300)

  return (
    <div className="">
      <p>Deounced Value: {name}</p>
      <input type="text" onChange={e => setName(e.target.value)} />
    </div>
  )
}
