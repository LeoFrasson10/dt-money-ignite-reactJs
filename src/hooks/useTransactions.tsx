import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface TransactionProps{
  id: string;
  title: string;
  amount: number;  
  type: string;
  category: string;
  createdAt: string;
}

// omit pega todos os campos e retira alguns
type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>

// pick seleciono os campos que quero
// type TransactionInput = Pick<TransactionProps, 'title' | 'amount' | 'type' | 'category'>

// interface TransactionInput {
//   title: string;
//   amount: number;  
//   type: string;
//   category: string;
// }

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const loadTransactions = async () => {
    const {data} = await api.get("/transactions");
    
    if(data){
      setTransactions(data.transactions);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date()      
    })
    const { transaction } = response.data;

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
  
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}