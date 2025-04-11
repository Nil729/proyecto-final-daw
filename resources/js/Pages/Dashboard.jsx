import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Viatge from "@/Components/Viatge";
import UserLocation from '@/Components/UserLocation'
import React, { useState, useEffect } from 'react';

export default function Dashboard({ auth, viatges }) {

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [pais, setPais] = useState('España');
    const [seleccion, setSeleccion] = useState('Posicio');
    const handlePositionChange = (newPosition) => {
        setPosition(newPosition);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div>
                                <h1 className="text-2xl font-bold mb-4">Hola, {auth.user.name}</h1>
                                <b>Vols buscar itineraris prop teu?</b>
                                <br />

                                <div className="flex flex-col items-center justify-center">

                                    <div className='flex flex-row '>
                                        <select
                                            name="pais"
                                            id="pais"
                                            className="flex mr-3  border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                                            value={seleccion}
                                            onChange={e => setSeleccion(e.target.value)}
                                        >
                                            <option value="posicio">Posicio actual</option>
                                            <option value="pais">Pais</option>

                                        </select>
                                        {seleccion === 'pais' && (
                                            <input
                                                type="text"
                                                name="pais"
                                                id="pais"
                                                placeholder="Introdueix el pais"
                                                className=" border border-gray-300 rounded p-2 mb-4"
                                                value={pais}
                                                onChange={e => setPais(e.target.value)}
                                                required
                                            />

                                            

                                            
                                            
                                        )

                                        }
                                    </div>




                                    {/* botón para buscar */}
                                    <a
                                        href={seleccion === 'posicio' ? `/itineraris/${position.latitude}/${position.longitude}` : `/itineraris/${pais}`}
                                        className="inline-block  py-2 px-40 bg-gray-950 hover:bg-slate-800 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Explorar
                                    </a>
                                </div>


                                <h2 className="text-2x3 font-bold mb-4">Els teus viatges: </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        // viatges del usuari

                                        viatges.map((viatge) => viatge.usuari_id == auth.user.id && (
                                            <Viatge key={viatge.id} viatge={viatge} />
                                        ))
                                    }
                                </div>

                                A questa  es la teva Ubicació:

                                <UserLocation onPositionChange={handlePositionChange} />


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
