import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input, Button, Typography } from "@material-tailwind/react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import {  useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export function ApplicationUpdate() {
  // Récupérer l'ID de l'application depuis les paramètres d'URL
  const { id } = useParams();
  const navigate = useNavigate();

  // State pour stocker les données de l'application à mettre à jour
  const [formData, setFormData] = useState({
    motivation: "",
    email: "",
    disponibilite: "",
    salaire: "",
    status: "",
    cv: null, // Changer à null
    coverLetter: null, // Changer à null
    job_seeker: "",
    job_offer: "",
  });

  useEffect(() => {
    const fetchApplication = async () => {
        try {
            // Check if the access token exists in localStorage
            const accessToken = localStorage.getItem("accessToken");

            // If the access token does not exist, handle the error
            if (!accessToken) {
                console.error("Access token not found");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios.get(`/applications/get/${id}`, config);
            setFormData(response.data);
        } catch (error) {
            console.error("Failed to fetch application:", error.response ? error.response.data : error.message);
        }
    };

    fetchApplication();
}, [id]);

  // Fonction pour mettre à jour l'application
const handleUpdate = async () => {
  try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");

      // If the access token does not exist, handle the error
      if (!accessToken) {
          console.error("Access token not found");
          return;
      }

      const config = {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };

      const response = await axios.put(`/applications/update/${id}`, formData, config);
      console.log("Application updated:", response.data);
      // Rediriger vers la page de consultation des applications après la mise à jour
      navigate(`/applicationDetails/${id}`);
  } catch (error) {
      console.error("Failed to update application:", error.response ? error.response.data : error.message);
      // Afficher une alerte en cas d'erreur
      window.alert("Failed to update application");
  }
};


  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
 
 <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-24 pb-8">

   </div>
   </div>

   <div className="container mx-auto p-4">
        <h1 className="text-2xl text-white font-bold mb-4 bg-red-800 px-4 py-4 rounded-lg">Update Application</h1>
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4">
          <div>
          <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
    Email
  </Typography>
  <Input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                    Motivation
                  </Typography>
           
            <Input type="text" name="motivation" value={formData.motivation} onChange={handleChange} placeholder="Motivation" />
           
  <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
    Disponibility
  </Typography>
  <Input type="text" name="disponibilite" value={formData.disponibilite} onChange={handleChange} placeholder="Disponibilité" />
  <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
    Salary Informations
  </Typography>
  <Input type="text" name="salaire" value={formData.salaire} onChange={handleChange} placeholder="Salaire" />
</div>
          <div>
          <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
            Resume
  </Typography>
          <Input type="text" name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Cover Letter"  />
          <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
            Upload New Resume
          </Typography>
          <Input type="file" name="cv" onChange={handleChange} /> {/* Champ de fichier pour CV */}
  <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
            Cover Letter
  </Typography> 
            <Input type="text" name="cv" value={formData.cv} onChange={handleChange} placeholder="CV" />
          
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
            Upload New Cover Letter
          </Typography>
          <Input type="file" name="coverLetter" onChange={handleChange} /> {/* Champ de fichier pour Lettre de motivation */}
        
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={handleUpdate} className="w-60 bg-red-800">Update</Button>
        </div>
      </div>

      <div className="flex justify-end mt-4">
          <Link
            to={`/applicationDetails/${id}`}
            className="inline-block p-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </Link>
        </div>
        


      <div className="useful-links ml-80">
  <a href="https://www.linkedin.com/esprit/">
    <LinkedInIcon fontSize="large" /> LinkedIn
  </a>
  <a href="https://www.facebook.com/esprit/">
    <FacebookIcon fontSize="large" /> Facebook
  </a>
  <a href="https://www.instagram.com/esprit/">
    <InstagramIcon fontSize="large" /> Instagram
  </a>
</div>
    </>
  );
}

export default ApplicationUpdate;
