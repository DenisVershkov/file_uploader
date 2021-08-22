import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import {signOut} from '../../redux/actions/user.ac'
const { Header } = Layout;

export default function Navbar() {
const dispatch = useDispatch()
const history = useHistory()

  const signOutHandler = (e) => {
    dispatch(signOut(history))
  }

  return (
    <Layout className="layout">
    <Header>
      <Menu theme="dark" mode="horizontal" style={{justifyContent: 'flex-end'}}>
      <Menu.Item >{'Home'}</Menu.Item>
      <Menu.Item onClick={signOutHandler}>{'SignOut'}</Menu.Item>
      </Menu>
    </Header>
  </Layout>
  )
}
