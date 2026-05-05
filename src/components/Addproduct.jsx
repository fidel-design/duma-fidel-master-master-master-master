import React, { useState } from 'react'
import axios from "axios"

const Addproduct = () => {
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [cost, setCost] = useState("")
  const [productPhoto, setProductPhoto] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const submit= async(e) =>{
    e.preventDefault()
    setLoading ("Please wait to Add Products")

    try {
      const data = new FormData()
      data.append("product_name", productName)
      data.append("product_description" , description)
      data.append("product_cost", cost)
      data.append("product_photo" , productPhoto)

      const response = await axios.post("http://dumafidel.alwaysdata.net/api/add_product", data)

      setLoading("")
      setSuccess(response.data.message)

      setProductName("")
      setDescription("")
      setCost("")
      setProductPhoto("")

    } catch (error) {
      setLoading("")
      
      setError(error.message)

      
    }
  }
  return (
    <div className='row mt-4 justify-content-center'> 
      
        <div className='col-md-6 p-4 card shadow'>
          <h2>Add Product</h2>
          <form onSubmit={submit}>

            {loading}
            {error}
            {success}
            <p className='text-start'>Product Name</p>
            <input type="text" className='form-control' value={productName} onChange={(e) => setProductName(e.target.value)}/>
          
            <p className='text-start'>Description</p>
            <textarea name="" id="" className='form-control' value={description} onChange={(e) => setDescription(e.target.value)}></textarea> 
            
            <p className='text-start'>Cost(Ksh)</p>
            <input type="text" className='form-control' value={cost} onChange={(e) => setCost(e.target.value)}/> 
            
            <p className='text-start'>Product Photo</p>
            <input type="file" accept='image/*' className='form-control' onChange={(e) => setProductPhoto(e.target.files[0])} /> <br />
            <button type='submit' className='btn btn-primary w-100'>Add Product</button>
          </form>
        </div>
    </div>
  )
}

export default Addproduct