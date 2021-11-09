import { useTransactions } from "../../hooks/useTransactions";
import { formatDate, formatReal } from "../../helpers/formatValues";

import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();
  
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions && transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {formatReal(transaction.amount)}                
              </td>
              <td>{transaction.category}</td>
              <td>
                {formatDate(transaction.createdAt)}
                </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </Container>
  )
}