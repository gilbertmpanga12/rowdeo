import React, { useCallback } from 'react';
import { useAuth } from 'reactfire';
import { Redirect } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

export default function Dashboard() {
    const auth = useAuth();
    const signOut = auth => auth.signOut().then(() => <Redirect to='/' />);
    const onDrop = useCallback(
        acceptedFiles => {
            //upload the files to firebase storage...
        }, []
    )
    const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop });
    return (
        <div className="dashboard flex">
            <h3>Dashboard...</h3>
            <button onClick={() => signOut(auth)}>
                Signout
            </button>

            <div className="dropzone"  {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
                {/**
                 * Button toggles the upload form
                 */}
            <button className="flex" onClick={``}>
                <span className="">
                    Upload...
                    </span>
            </button>
        </div>
    )
}