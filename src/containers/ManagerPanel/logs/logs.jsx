import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';

export const MediaOptimizationLogs = () => {
    // router
    const history = useHistory();
    const { media_id } = useParams();

    // effect
    useEffect(() => {
        
    }, [])

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-12">
                    <button onClick={() => history.goBack()} className="btn btn-primary mb-2">Back</button>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className='cart-title'>Media Details</h3>
                            <table>
                                <tr>
                                    <th>Cover Image</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Media Info</th>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className='cart-title'>Logs</h3>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
