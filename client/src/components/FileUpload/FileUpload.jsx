import './FileUpload.css';
import { useState } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {uploadFile} from '../../redux/actions/files.ac';
import * as endPoints from '../../config/endPoints';
import formatBytes from '../../service/converter-service';
const {REACT_APP_CLOUDINARY_URL: host, REACT_APP_CLOUDINARY_NAME: cloudName, REACT_APP_CLOUDINARY_UPLOAD_PRESET: upload_preset} = process.env;

const FileUpload = () => {
   const [file, setFile] = useState('');
   const [fileNameAndSize, setFileNameAndSize] = useState('');
   const [fileName, setFileName] = useState('');
   const [uploadPercentage, setUploadPercentage] = useState(0);
   const userId = useSelector(state => state?.user?.id);
   const [errMsg, setErrMsg] = useState('');
   const dispatch = useDispatch();

    function changeHandler(e) {
    const [file] = e.target.files;
    const { name: fileName, size } = file;
    const fileSize = (size / 1000).toFixed(2);
    const fileNameAndSize = `${fileName} - ${fileSize}KB`;
    setFile(file);
    setFileName(fileName);
    setFileNameAndSize(fileNameAndSize);
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (!fileNameAndSize) return;
    await uploadImage();
  };

  const uploadImage = async () => {
    const formData = new FormData;
    formData.append('file', file);
    formData.append('upload_preset', `${upload_preset}`);
    try{
      const url = `${host}/${cloudName}/upload`;
      const res = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)));
            }
          });
          setTimeout(() => {
            setUploadPercentage(0);
            setFileNameAndSize('');
          }, 3000);
          if(res.status === 200) {
            const fileInfo = res.data;
            const serverResponse = await axios.post(endPoints.uploadFile(), {fileInfo}, {withCredentials: true});
            serverResponse.data.size = formatBytes(serverResponse.data.size);
            dispatch(uploadFile(serverResponse.data))
          }
    } catch (err) {
            setErrMsg(err)
    }
      }
          
  return (
    <div style={{marginBottom:'100px'}}>
    <div style={{textAlign: 'center', marginTop: '50px', maxWidth: '500px', margin: '50px auto'}}>
    <ProgressBar variant="success" now={uploadPercentage} />
    {uploadPercentage}%
    </div>
    <form onSubmit={submitHandler} style={{marginTop: '30px', display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} className="file-input">
  <input type="file" id="file" className="file" onChange={changeHandler}/>
  <label htmlFor="file">
  {fileNameAndSize.length !== 0 && fileNameAndSize || 'Select file'}
    <p className="file-name"></p>
  </label>
  <button>Upload</button>
</div>
    </form>
  </div>
  )
}

export default FileUpload;
