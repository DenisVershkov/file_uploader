import Navbar from '../Navbar/Navbar';
import ResultsTable from '../ResultsTable/ResultsTable';
import FileUpload from '../FileUpload/FileUpload';
import { Fragment } from 'react';
import { setFiles } from '../../redux/actions/files.ac'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const MainPAge = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(setFiles())
   }, [])

  return (
    <Fragment>
    <Navbar />
    <FileUpload />
    <ResultsTable />
    </Fragment>
  )
}

export default MainPAge;
