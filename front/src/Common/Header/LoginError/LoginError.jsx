
import { useContext } from 'react'
import './LoginError.scss'
import MyContext from '../../Context/MyContext'

const LoginError = ({title}) => {

  const {Navigate} = useContext(MyContext)
    
    
    return (
    <div className='loginerror'>
    To View {title} Please Login First
    <span onClick={()=> Navigate('/login') }>click here to Login</span>
    </div>
  )
}

export default LoginError