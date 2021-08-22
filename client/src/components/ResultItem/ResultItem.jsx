import './ResultItem.css'

const ResultItem = ({url, fileName, size, id, handleClick}) => {
  return (
    <tr>
      <td><center><img style={{align: 'center'}} className='pictures-main' src={url}/></center></td>
      <td>{fileName}</td>
      <td>{size}</td>
      <td>
        <img onClick={handleClick} data-id={id} className='pictures-icons delete' src='/images/delete.svg'/>
        <img onClick={handleClick} data-id={id} className='pictures-icons edit' src='/images/edit.svg'/>
        </td>
    </tr>
  )
}

export default ResultItem;
