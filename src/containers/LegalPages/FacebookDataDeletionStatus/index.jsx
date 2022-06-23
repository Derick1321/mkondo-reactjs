import React, { useEffect, useState } from 'react'
import MkondoLogo from '../../../components/common/logo'
import { useParams } from 'react-router-dom';

export const FacebookDataDeletionStatus = () => {
    //hooks
    const { confirmation_code } = useParams();

    //state
    const [code, setCode] = useState();

    //effects
    useEffect(() => {
        if (!confirmation_code) return;
        setCode(confirmation_code);
    }, [confirmation_code])

    //handlers
    const checkStatus = () => {

    }

    return (
        <div className='container'>
            <div className="mt-2">
                <MkondoLogo />
            </div>

            <div className="row mt-5">
                <div className="col-lg-4 mx-auto">
                    <h1>Facebook Data Deletion Status</h1>
                    {code ? (
                        <>
                            <p>Your Confirmation Code is</p>
                            <h2>{code} - <small className='text-warning'>PENDING</small></h2>

                            <p>
                                We are still processing your data deletiong request internally.
                                You will be notified via your email. 
                            </p>


                        </>
                    ) : (
                        <>
                            <div className='form-group'>
                                <label htmlFor="" className="label-control">Confirmation Code</label>
                                <input type="text" className='form-control' />
                            </div>
                            <button className="btn btn-primary mt-2">Check My Data Deletion Status</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
