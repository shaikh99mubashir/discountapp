import React, { useEffect, useState } from 'react'
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


    const [videoData, setVideoData] = useState([])
    React.useEffect(() => {
        const getData = dbRef(db, `videolink/`);
        onValue(getData, (e) => {
            const val = e.val()
            const data = Object.entries(val).map(([key, value]) => {
                return {
                    ...value,
                    id: key,
                };
            });
            setVideoData(data);
        });
    }, []);
    console.log('videoData', videoData);

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
                // console.log('File available at', downloadURL);
            });
        })

    }
    // useEffect(() => {
    //     videoData.some((scheduledVideo) => {
    //         let startDate = new Date(scheduledVideo.startDate)
    //         let endDate = new Date(scheduledVideo.endDate)
    //         console.log(startDate, "startDate======>")
    //         console.log('endDate=======>', endDate);
    //         let startDayDifference = startDate.getDate()
    //         let startMonthDifference = startDate.getMonth()
    //         let startYear = startDate.getFullYear()
    //         let startHour = startDate.getHours()
    //         let startMin = startDate.getMinutes()

    //         let userSelectedStartDay = uploadVideo.startDate.getDate()
    //         let userSelectedStartMonth = uploadVideo.startDate.getMonth()
    //         let userSelectedStartYear = uploadVideo.startDate.getFullYear()
    //         let userSelectedStartHour = uploadVideo.startDate.getHours()
    //         let userSelectedStartMin = uploadVideo.startDate.getMinutes()

    //         let endDayDifference = endDate.getDate()
    //         let endMonthDifference = endDate.getMonth()
    //         let endYear = endDate.getFullYear()
    //         let endHour = endDate.getHours()
    //         let endMin = endDate.getMinutes()

    //         let userSelectedEndDay   = uploadVideo.endDate.getDate()
    //         let userSelectedEndMonth = uploadVideo.endDate.getMonth()
    //         let userSelectuserSelectedEndMonthedEndYear  = uploadVideo.endDate.getFullYear()
    //         let userSelectedEndHour  = uploadVideo.endDate.getHours()
    //         let userSelectedEndMin  = uploadVideo.endDate.getMinutes()



    //         console.log('uploadVideo.startDate', uploadVideo.startDate);
    //         console.log('uploadVideo.startDate', uploadVideo.endDate);
    //         console.log('scheduledVideo', scheduledVideo);
    //         const startTime = new Date(scheduledVideo.startDate).getTime();
    //         const endTime = new Date(scheduledVideo.endDate).getTime();
    //         // console.log('startYime', startTime);
    //         return uploadVideo.startDate >= startTime && uploadVideo.startDate <= endTime;
    //     });
    // }, [uploadVideo.startDate])

    const sendVideo = () => {

        const isOverlap = videoData.length > 0 && videoData.every((scheduledVideo) => {
            let startDate = new Date(scheduledVideo.startDate)
            let endDate = new Date(scheduledVideo.endDate)
            let userStartDate = new Date(uploadVideo?.startDate)
            let userEndDate = new Date(uploadVideo.endDate)
            console.log(startDate, "startDate======>")
            console.log('endDate=======>', endDate);
            let startDayDifference = startDate.getDate()
            let startMonthDifference = startDate.getMonth()
            let startYear = startDate.getFullYear()
            let startHour = startDate.getHours()
            let startMin = startDate.getMinutes()

            let userSelectedStartDay = userStartDate.getDate()
            let userSelectedStartMonth = userStartDate.getMonth()
            let userSelectedStartYear = userStartDate.getFullYear()
            let userSelectedStartHour = userStartDate.getHours()
            let userSelectedStartMin = userStartDate.getMinutes()

            let endDayDifference = endDate.getDate()
            let endMonthDifference = endDate.getMonth()
            let endYear = endDate.getFullYear()
            let endHour = endDate.getHours()
            let endMin = endDate.getMinutes()

            let userSelectedEndDay = userEndDate.getDate()
            let userSelectedEndMonth = userEndDate.getMonth()
            let userSelectuserEndYear = userEndDate.getFullYear()
            let userSelectedEndHour = userEndDate.getHours()
            let userSelectedEndMin = userEndDate.getMinutes()
            return userStartDate >= startDate && userStartDate <= endDate
        });

        console.log(isOverlap, 'isOverlapisOverlapisOverlapisOverlap');

        if (isOverlap) {

            alert("The selected time overlaps with an existing scheduled video.");
        }
        else if (uploadVideo.videoLink == "" || uploadVideo.startDate == "" || uploadVideo.endDate == "") {
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
            <button type="submit" onClick={handleSubmit} disabled={!selectedFile}>{uploadVideo.videoLink ? 'Upload Successfully' : 'Upload'}</button>
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