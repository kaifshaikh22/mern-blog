import { Alert ,Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUplaodProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const handleUplaodImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = 
                       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                       setImageUplaodProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUplaodProgress(null);
                },
                () => {
                       getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
                        setImageUplaodProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: getDownloadURL });
                       });
                }
            );

        } catch (error) {
            setImageUploadError('Image uplaod failed');
            setImageUplaodProgress(null);
            console.log(error);
        }
    };
  return (
  <div className="p-3 max-w-3xl mx-auto min-h-screen">
    <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
    <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text' placeholder='Title' required id="title"
            className="flex-1"/>
            <Select>
                <option value="uncategorized">Select a category</option>
                <option vlaue="javascript">JavaScript</option>
                <option vlaue="reactjs">React.js</option>
                <option vlaue="nextjs">Next.js</option>
            </Select>

        </div>
        <div className="flex gap-4 items-center justify-between border-4
        border-teal-500 border-dotted p-3">
            <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
            <Button 
            type='button' 
            gradientDuoTone='purpleToBlue' 
            size='sm'
            outline
            onClick={handleUplaodImage}
            disabled={imageUploadProgress}
            >
                {imageUploadProgress ? (
                    <div className="w-16 h-16">
                        <CircularProgressbar
                        value={imageUploadProgress}
                        text={`${imageUploadProgress || 0}%`}
                        />
                  </div>
                ) : (
                    'Uplaod Image'
                )}
                </Button>

        </div>
        {imageUploadError &&  <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
            <img
            src={formData.image}
            alt='upload'
            className="w-full h-72 object-cover"
            />
        )
}
        <ReactQuill theme="snow" placeholder="Write something..." className="h-72 mb-12" required
        />
        <Button type="submit" gradientDuoTone='purpleToPink'>
            Publish
        </Button>
    </form>

  </div>
    
 ); 
}
