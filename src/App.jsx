import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import imgqr from "./images/defaultqr.png"
import checkqr from "./images/image1.jpeg"

function App() {

  const[qr,setqr] = useState("")
  const[loading,setloading]  = useState(false)
  const[qrdata,setqrdata] = useState("")
  const[size,setsize] = useState("")
  console.log(size)

  async function generateqr(){
    setloading(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURI(qrdata)}`;
      setqr(url)
      console.log(url)
    } catch (error) {
      console.error("Error generating QR code",error)
    }finally{
      setloading(false)
    }
    
  }
  function downloadqr() {
    fetch(qr)
        .then((response) => response.blob())
        .then((blob) => {
            const link = document.createElement("a"); // Create a new anchor element
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link); // Append the link to the body
            link.click(); // Simulate a click on the link to initiate download
        })
        .catch((error) => {
            console.error("Error downloading QR code", error);
        });
}


  return (
    <div id = "contain"className="container mt-5">
      <h1 className='text-center'>QR code Generator</h1>
     <div className="qrspace">
      {loading && <p>Please wait .....</p>}
     {qr && <img src={qr} className='image-qr'/>}
      </div>

    <form className='mb-5'>
    <div class="mb-4 mt-5">
    <label for="urlinput" class="form-label h5">Data for QR code:</label>
    <input type="text" 
    class="form-control"
     id="urlinput" 
    placeholder="Enter url"
    value={qrdata}
    onChange={(e) => {setqrdata(e.target.value)}}
    />
  </div>
  <div class="mb-4">
    <label for="size" class="form-label h5">Image size (e.g.150):</label>
    <input type="text" class="form-control" 
    id="size" 
    placeholder="Enter size"
    value={size}
    onChange={(e) => {setsize(e.target.value)}}
    />
  </div>
 
  <div className="btns">
    <button type='button' 
    class="btn btn-primary m-2"
    onClick={generateqr}
    disabled={loading}
    >Generate QR</button>

  <button type='button'
   class="btn btn-success m-2"
   onClick={downloadqr}
   >Download QR</button>
 
    </div>  
</form>
      <div className="btns">
        <p>Designed by sneha</p>
      </div>
    
  </div>
  )
}

export default App
