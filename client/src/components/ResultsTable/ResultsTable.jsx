import axios from 'axios';
import './ResultsTable.css'
import { useSelector } from 'react-redux';
import ResultItem from '../ResultItem/ResultItem';
import * as endPoints from '../../config/endPoints';
import { useDispatch } from 'react-redux';
import { deleteFile } from '../../redux/actions/files.ac';

const ResultsTable = () => {
  const currentState = useSelector(state => state.files);
  const dispatch = useDispatch();

 async function handleClick(e) {
    const id = e.target.dataset.id;
    if(e.target.className === 'pictures-icons delete'){
      const url = endPoints.deleteFile();
      const res = await axios.delete(url, {withCredentials: true}, {data: {id}});
      if(res.status === 200) {
        dispatch(deleteFile(id));
      }
    } 
  }

  return (
    <table>
<tr>
  <th style={{textAlign: 'center'}}>Превью</th>
  <th>Название файла</th>
  <th>Размер</th>
  <th>Действия</th>
  </tr>
  {currentState.map(item => {
   return <ResultItem 
    key={item._id}
    url={item. url}
    fileName={item.fileName}
    size={item.size}
    id={item._id}
    handleClick={handleClick}
    />
  }
  )}
</table>
  )
}

export default ResultsTable;
