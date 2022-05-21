import React from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'

const LoadingSpinner = () => {
  return (
    <div className="spinner">
        <Spinner animation="grow" variant="dark" />
    </div>
  )
}

export default LoadingSpinner