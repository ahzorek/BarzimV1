'use client'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('./app'))

const AdminPage = async () => {
  return <App />
}

export default AdminPage
