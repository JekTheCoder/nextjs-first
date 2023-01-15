import Table, { Row } from '@/components/table'
import styles from './Table1.module.scss'

type Data = {
  name: string
}

export default function Table1() {
  return (
    <div className={styles.card}>
      <Table source={source} RowFactory={Row} rowKey={data => data.name}>
        <thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Surname</th>
						<th></th>
						<th>Actions</th>
					</tr>
				</thead>
      </Table>
    </div>
  )
}

function source(): Data[] {
  return [{ name: 'cr' }]
}

function Row({ data, index }: Row<Data>) {
	const { name } = data;

  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
			<td></td>
			<td></td>
    </tr>
  )
}
