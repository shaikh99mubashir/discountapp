import React, { useState } from 'react'
// import app from '../../../FirebaseConfig/Config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";
import app from "../../FirebaseConfig/Config";
import {
    getDatabase,
    onValue,
    ref as dbRef,
    push,
    set,
    update,
    remove,
} from "firebase/database";

const UploadVideo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const auth = getAuth(app);
    const db = getDatabase(app);

    const [uploadVideo, setUploadVideo] = useState({
        videoLink: '',
        startDate: '',
        endDate: ''
    })
    console.log('startDate', uploadVideo.startDate);

    console.log('uploadVideo', uploadVideo);

    function handleFileInputChange(event) {
        const file = event.target.files[0];
        if (file && file.type === 'video/mp4') {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Create a storage reference
        const storage = getStorage();
        const storageRef = ref(storage, 'videos/' + selectedFile.name);
        // Upload the file to Firebase Storage
        const uploadTask = uploadBytes(storageRef, selectedFile);
        console.log('upload', uploadTask);
        uploadTask.then((snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            getDownloadURL(storageRef).then((downloadURL) => {
                setUploadVideo({ ...uploadVideo, videoLink: downloadURL })
                // console.log('File available at', downloadURL);
            });
        })

    }
    const date = new Date();
    let currentTime = date.getTime()

    let currentDay = date.getDate()
    let currentMonth = date.getMonth()
    let currentYear = date.getFullYear()
    const currenthours = Math.floor(currentTime / 3600000);
    const currentminutes = Math.floor((currentTime % 3600000) / 60000);
    const currentseconds = Math.floor(((currentTime % 3600000) % 60000) / 1000);


    const sendVideo = () => {
        if (uploadVideo.videoLink == "" || uploadVideo.startDate == "" || uploadVideo.endDate == "") {
            alert('Kindly Fill The Fields')
        }
        else {
            const reference = dbRef(db, `videolink/`)
            push(reference, uploadVideo).then(() => {
                alert('Successfully Scheduled!')
                uploadVideo.videoLink = ""
                uploadVideo.startDate = ""
                uploadVideo.endDate = ""
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <>
            <div>UploadVideo</div>
            <input type="file" accept="video/mp4" onChange={handleFileInputChange} />
            <button type="submit" onClick={handleSubmit} disabled={!selectedFile}>{selectedFile ? 'Upload Successfully' : 'Upload'}</button>
            <br />
            <label for=""> Vedio Start Date And Time</label>

            <input
                style={{ marginTop: "20px" }}
                type="datetime-local"
                id="startDateTime"
                name="Schedule Date And Time"
                value={uploadVideo.startDate}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) => {
                    const selectedDateTime = new Date(e.target.value).getTime();
                    const currentDateTime = new Date().getTime();
                    if (selectedDateTime < currentDateTime) {
                        alert("Please select a current or future date and time.");
                    } else {
                        setUploadVideo({
                            ...uploadVideo,
                            startDate: e.target.value,
                        });
                    }
                }}
            />
            <br />
            <label for=""> Vedio End Date And Time </label>
            <input
                style={{ marginTop: "20px" }}
                type="datetime-local"
                id="startDateTime"
                name="Schedule Date And Time"
                value={uploadVideo.endDate}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) => {
                    const selectedDateTime = new Date(e.target.value).getTime();
                    const currentDateTime = new Date().getTime();
                    if (selectedDateTime < currentDateTime) {
                        alert("Please select a current or future date and time.");
                    } else {
                        setUploadVideo({
                            ...uploadVideo,
                            endDate: e.target.value,
                        });
                    }
                }}
            />

            <br />

            <button type="submit" onClick={sendVideo}>Submit</button>
        </>
    )
}

export default UploadVideo