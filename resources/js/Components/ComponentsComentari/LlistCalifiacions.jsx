import React from "react";
import { useState, useEffect } from 'react';

const LlistCalifiacions = ({ auth, itinerari, insertat }) => {
  const [califiacions, setCalifiacions] = useState([]);

  // get califiacions from api
  const handleCalifiacions = async () => {
    try {
      const response = await fetch('/api/calificacions');
      const data = await response.json();
      setCalifiacions(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleCalifiacions();
  }, [insertat]);
  // delete califiacio

  const onDeleteCalificacio = async (index) => {
    const id = califiacions[index].id;
    console.log(itinerari.id);
    try {
      const response = await fetch(`/api/calificacions/${id}/${itinerari.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Success:', data);
      handleCalifiacions();
    } catch (error) {
      console.error('Error:', error);
    }
  }


  // edit califiacio

  const onEditCalifiacio = async (index) => {
    const id = califiacions[index].id;
    const newCalificacio = {
      itinerari_id: itinerari.id,
      puntuacio: 5,
      comentari: 'test',
      completat: true,
    };

    try {
      const response = await fetch(`/api/calificacios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCalificacio),
      });
      const data = await response.json();
      console.log('Success:', data);
      handleCalifiacions();
    } catch (error) {
      console.error('Error:', error);
    }

  }


  // ...

  return (


    <>
      {califiacions.map((calificacio, index) => (
        calificacio.itinerari_id === itinerari.id ? (
          <div key={index} className="border p-3 mb-3 flex items-center transition-all duration-300">
            {
              auth.user.id === calificacio.usuari_id ? (
                <div className="flex-shrink-0">
                <button onClick={() => onDeleteCalificacio(index)} className="ml-2 p-2 rounded-full hover:bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              ) : null

            }


            <div className="ml-4">
              <p>{calificacio.comentari}</p>
              <p className="flex items-center">Valoració:
                {[...Array(calificacio.puntuacio)].map((star, index) => (
                  <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 0 1 .775.37l3.55 4.437 5.215.763a1 1 0 0 1 .554 1.705l-3.037 3.612.719 5.215a1 1 0 0 1-1.45 1.054L10 15.789l-4.707 2.365a1 1 0 0 1-1.45-1.054l.72-5.215-3.036-3.612a1 1 0 0 1 .554-1.705l5.215-.762L9.225 2.37A1 1 0 0 1 10 2zm0 2.291L8.945 7.39a1 1 0 0 1-.774.37l-4.097.595 2.955 3.51a1 1 0 0 1 .288.944l-.621 4.51 3.244-1.63a1 1 0 0 1 .938 0l3.244 1.63-.621-4.51a1 1 0 0 1 .288-.944l2.955-3.51-4.096-.595a1 1 0 0 1-.774-.37z" />
                  </svg>
                ))}
              </p>
              <p>Completat: {calificacio.completat ? 'Sí' : 'No'}</p>
            </div>
          </div>
        ) : null
      ))}

    </>
  )
}


export default LlistCalifiacions;