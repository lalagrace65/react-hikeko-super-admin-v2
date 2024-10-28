import React, { useState } from 'react';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { ReactSortable } from 'react-sortablejs';
import toast from 'react-hot-toast';

// Utility function to parse coordinate strings
function parseCoordinate(coordinate) {
    const [value, direction] = coordinate.split(/°\s*/);
    const number = parseFloat(value);

    if (direction === 'S' || direction === 'W') {
        return -number; // Convert to negative for South and West
    }
    return number;
}
export default function TrailForm() {
    const [trails, setTrails] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [trailLocation, setTrailLocation] = useState('');
    const [features, setFeatures] = useState('');
    const [description, setDescription] = useState('');
    const [trailClass, setTrailClass] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [elevation, setElevation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const  [trailImages,setTrailImages] = useState([]);

    const [error, setError] = useState(null); // Error state
    const[isUploading,setIsUploading] = useState(false);
    const inputClassName = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-red-300 transition duration-200";

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

    async function saveTrail(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/trails', {
                email,
                password,
            });
            setUser(data);
            toast.success('Login successful. You are now logged in.');
            navigateTo('/dashboard');
        } catch (e) {
            toast.error('Login failed. Please try again later.');
        }
    }

    return (
        <form onSubmit={saveTrail}
            className="grid grid-cols-2 gap-4"
        >
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

            <div>
                <label>Trail Name</label>
                <input
                    className={inputClassName}
                    type="text"
                    placeholder="trail name"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />
                
                <label>Category</label>
                <input
                    className={inputClassName}
                    type="text"
                    placeholder="trail category"
                    value={category}
                    onChange={(ev) => setCategory(ev.target.value)}
                />

                <label>Photos</label>
                <div className="mb-2 flex flex-wrap gap-1">
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
                        <input type="file" onChange={uploadImages} className="hidden"/>
                    </label>
                </div>

                <label>Location</label>
                <input
                    className={inputClassName}
                    type="text"
                    placeholder="location"
                    value={trailLocation}
                    onChange={ev => setTrailLocation(ev.target.value)}
                />
                
                <label>Description</label>
                <textarea
                    className={inputClassName}
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />
            </div>

            <div>
                <label>Features</label>
                <input
                    className={inputClassName}
                    type="text"
                    placeholder="features"
                    value={features}
                    onChange={ev => setFeatures(ev.target.value)}
                />

                
                <div className="grid grid-cols-2 gap-2">
                    <label>Trail Class</label>
                    <input
                        className={inputClassName}
                        type="text"
                        placeholder="trail class"
                        value={trailClass}
                        onChange={ev => setTrailClass(ev.target.value)}
                    />

                    <label>Difficulty Level</label>
                    <input
                        className={inputClassName}
                        type="text"
                        placeholder="difficulty level"
                        value={difficultyLevel}
                        onChange={ev => setDifficultyLevel(ev.target.value)}
                    />
                </div>

                <label>Elevation</label>
                <input
                    className={inputClassName}
                    type="text"
                    placeholder="elevation"
                    value={elevation}
                    onChange={ev => setElevation(ev.target.value)}
                />

                
                <div className="grid grid-cols-2 gap-2">
                <label>Latitude</label>
                <label>Longitude</label>
                    <input
                        className={inputClassName}
                        type="text"
                        placeholder="Latitude (e.g., 14.0379° N)"
                        value={latitude}
                        onChange={ev => setLatitude(ev.target.value)}
                    />
                    <input
                        className={inputClassName}
                        type="text"
                        placeholder="Longitude (e.g., 120.8061° E)"
                        value={longitude}
                        onChange={ev => setLongitude(ev.target.value)}
                    />
                </div>

                <label>Map</label>
                {/* Here you can add your map component */}
            </div>

            <button
                type="submit"
                className="bg-customPrBg col-span-2 mt-4">Save</button>
        </form>
    );
}
