import React, { useState } from 'react';
import LlistCalifiacions from '@/Components/ComponentsComentari/LlistCalifiacions';


const FormCalificacio = ({ auth, itinerari }) => {
  const [comentari, setComentari] = useState('');
  const [puntuacio, setPuntuacio] = useState(0);
  const [completat, setCompletat] = useState(false);
  const [insertat, setInsertat] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCalificacio = {
      itinerari_id: itinerari.id,
      puntuacio,
      comentari,
      completat,
      usuari_id: auth.user.id,
    };
    console.log(JSON.stringify(newCalificacio)); // retorna aixó: {"itinerari_id":1,"puntuacio":2,"comentari":"test","completat":true}

    try {
      const response = await fetch('/api/calificacions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCalificacio),
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      insertat ? setInsertat(false) : setInsertat(true);
      console.log('Success:', data);

      // si s'ha completat al comentari afagiex una visita al itinerari


      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setComentari('');
    setPuntuacio(0);
    setCompletat(false);
  }


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4"> Comentaris </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <label htmlFor="comentari" className="block text-sm font-medium text-gray-700">
              Comentario:
            </label>
            <textarea
              id="comentari"
              name="comentari"
              value={comentari}
              onChange={(e) => setComentari(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="puntuacio" className="block text-sm font-medium text-gray-700">
              Valoración:
            </label>
            <input
              type="number"
              id="puntuacio"
              name="puntuacio"
              min="0"
              max="5"
              value={puntuacio}
              onChange={(e) => setPuntuacio(Number(e.target.value))}
              className=" px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label htmlFor="completat">l'has visitat? </label>
          <input
            name='completat'
            type="checkbox"
            id="completat"
            checked={completat}
            onChange={() => setCompletat(!completat)}
            className=" ml-2 form-checkbox h-5 w-5 text-blue-500"
          />
          <label htmlFor="completat" className="ml-2 text-sm text-gray-700">
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Envia comentari
        </button>
      </form>
      <LlistCalifiacions auth={auth} itinerari={itinerari} insertat={insertat} />
    </div>
  );
};

export default FormCalificacio;
