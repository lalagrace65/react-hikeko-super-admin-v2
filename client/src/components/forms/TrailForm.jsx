import React, { useState } from 'react';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { ReactSortable } from 'react-sortablejs';
import toast from 'react-hot-toast';
import GoogleMapView from '../maps/GoogleMapView';
import { UserLocationContext } from '@/context/UserLocationContext';
import { TextField, Button, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TrailForm() {
    const [trails, setTrails] = useState('');
    const [title, setTitle] = useState('');
    const [trailLocation, setTrailLocation] = useState('');
    const [features, setFeatures] = useState('');
    const [description, setDescription] = useState('');
    const [trailClass, setTrailClass] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [elevation, setElevation] = useState('');
    const [latitude, setLatitude] = useState(null); 
    const [longitude, setLongitude] = useState(null);
    const [errors, setErrors] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [trailImages, setTrailImages] = useState([]);
    const navigate = useNavigate();
    // Helper function to check required fields and whitespace
    const validateForm = () => {
        const newErrors = {};
        const checkEmptyOrWhitespace = (value) => typeof value === 'string' && value.trim() === '';

        if (checkEmptyOrWhitespace(title)) newErrors.title = 'Trail name is required';
        if (checkEmptyOrWhitespace(trailLocation)) newErrors.trailLocation = 'Location is required';
        if (checkEmptyOrWhitespace(features)) newErrors.features = 'Features are required';
        if (trailImages.length === 0) newErrors.trailImages = 'Photos are required';        if (checkEmptyOrWhitespace(description)) newErrors.description = 'Description is required';
        if (checkEmptyOrWhitespace(trailClass)) newErrors.trailClass = 'Trail class is required';
        if (checkEmptyOrWhitespace(difficultyLevel)) newErrors.difficultyLevel = 'Difficulty level is required';
        if (checkEmptyOrWhitespace(elevation)) newErrors.elevation = 'Elevation is required';
        if (!latitude || isNaN(latitude)) newErrors.latitude = 'Valid latitude is required';
        if (!longitude || isNaN(longitude)) newErrors.longitude = 'Valid longitude is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post('/trails', {
                title,
                description,
                features,
                trailLocation,
                trailClass,
                difficultyLevel,
                elevation,
                trailImages,
                coordinates: { latitude, longitude }
            });
            toast.success('Trail saved successfully');
            navigate('/trails');
        } catch (e) {
            toast.error('Saving Trail failed. Please try again later.');
        }
    };
     //Sortable image upload
     async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file);
            }
            try {
                const res = await axios.post('/api/upload', data);
                setTrailImages(oldImages => {
                    return [...oldImages, ...res.data.links];
                });
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setIsUploading(false);
            }
        }
    }
    function updateTrailImagesOrder(trailImages){
        setTrailImages(trailImages);
    }

    
    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <Typography variant="h5" gutterBottom>Trail Form</Typography>
        <div className="grid grid-cols-2 gap-4">
            <TextField
                label="Trail Name"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                error={!!errors.title}
                helperText={errors.title}
            />

            <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={trailLocation}
                onChange={(ev) => setTrailLocation(ev.target.value)}
                error={!!errors.trailLocation}
                helperText={errors.trailLocation}
            />

            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                error={!!errors.description}
                helperText={errors.description}
            />  
            <div className="mb-2 flex flex-col flex-wrap gap-1">
            <label>Photos</label>
                <ReactSortable
                    list={trailImages}
                    className="flex flex-wrap gap-1"
                    setList={updateTrailImagesOrder}>
                    {!!trailImages?.length && trailImages.map(link => {
                        return(
                            <div key={link} className=" w-36 h-36">
                                <img src ={link} alt="" className="w-full h-full object-cover rounded-lg"/>
                            </div>
                        );
                    })}
                    
                </ReactSortable>
                {isUploading && (
                <div className="h-24 flex items-center">
                    <PulseLoader color={'#D83713'} speedMultiplier={2}/>
                </div>
                )}
                <label className="w-40 h-10 cursor-pointer text-center 
                flex  items-center justify-center text-gray-500
                rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 
                    2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 
                    2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    <div className="ml-1  text-gray-500">
                        Upload
                    </div>
                    <input type="file" 
                            onChange={uploadImages}
                            accept="image/*" 
                            className="hidden"
                            error={!!errors.trailImages}
                            helperText={errors.trailImages}
                    />
                </label>
            </div>
            
            <TextField
                label="Features"
                variant="outlined"
                fullWidth
                value={features}
                onChange={(ev) => setFeatures(ev.target.value)}
                error={!!errors.features}
                helperText={errors.features}
            />

            <TextField
                label="Trail Class"
                variant="outlined"
                fullWidth
                value={trailClass}
                onChange={(ev) => setTrailClass(ev.target.value)}
                error={!!errors.trailClass}
                helperText={errors.trailClass}
            />

            <TextField
                label="Difficulty Level"
                variant="outlined"
                fullWidth
                value={difficultyLevel}
                onChange={(ev) => setDifficultyLevel(ev.target.value)}
                error={!!errors.difficultyLevel}
                helperText={errors.difficultyLevel}
            />

            <TextField
                label="Elevation"
                variant="outlined"
                fullWidth
                value={elevation}
                onChange={(ev) => setElevation(ev.target.value)}
                error={!!errors.elevation}
                helperText={errors.elevation}
            />

            <TextField
                label="Latitude"
                variant="outlined"
                fullWidth
                value={latitude || ''}
                onChange={(ev) => setLatitude(ev.target.value)}
                error={!!errors.latitude}
                helperText={errors.latitude}
            />

            <TextField
                label="Longitude"
                variant="outlined"
                fullWidth
                value={longitude || ''}
                onChange={(ev) => setLongitude(ev.target.value)}
                error={!!errors.longitude}
                helperText={errors.longitude}
            />
        </div>
        <div className='flex flex-col'>
            <label>Map</label>
                <UserLocationContext.Provider value={{ userLocation: { lat: parseFloat(latitude), lng: parseFloat(longitude) } }}>
                    <GoogleMapView height="200px" latitude={latitude} longitude={longitude} />
                </UserLocationContext.Provider>          
        </div>
        <div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Save
            </Button>
        </div>
        </form>
    );
}
