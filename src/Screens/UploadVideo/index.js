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
                console.log('File available at', downloadURL);
            });
        })

    }

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


    // else if (uploadVideo.startDate && uploadVideo.endDate) {
    //     console.log(typeof uploadVideo.startDate, "typeOfStart")
    //     console.log(uploadVideo.startDate, "uploadsTART")
    //     console.log(uploadVideo.endDate, "uploadEnd")

    //     let startDate = new Date(uploadVideo.startDate.slice(0, 10))
    //     let endDate = new Date(uploadVideo.endDate.slice(0, 10))

    //     console.log(endDate, "endDate")
    //     console.log(startDate, "startDate")

    //     startDate = startDate.getTime()
    //     endDate = endDate.getTime()

    //     console.log(startDate, "start")
    //     console.log(endDate, "end")
    // }

    return (
        <>
            <div>UploadVideo</div>
            <input type="file" accept="video/mp4" onChange={handleFileInputChange} />
            <button type="submit" onClick={handleSubmit} disabled={!selectedFile}>Upload</button>
            <br />
            <label for=""> Vedio Start Date And Time</label>
            <input
                style={{ marginTop: "20px" }}
                type="datetime-local"
                id="startDateTime"
                name="Shedule Date And Time"
                onChange={(e) => { setUploadVideo({ ...uploadVideo, startDate: e.target.value }) }}
            />
            <br />
            <label for=""> Vedio End Date And Time </label>
            <input
                style={{ marginTop: "20px" }}
                type="datetime-local"
                id="endDateTime"
                name="Shedule Date And Time"
                onChange={(e) => { setUploadVideo({ ...uploadVideo, endDate: e.target.value }) }}
            />
            <br />

            <button type="submit" onClick={sendVideo}>Submit</button>
        </>
    )
}

export default UploadVideo