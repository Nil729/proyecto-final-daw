import React, { useState } from "react";
import FormCalifiacio from "@/Components/ComponentsComentari/FormCalifiacio";
import DropdownItem from "@/Components/DropdownItem";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, errors, } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import { usePage, Link } from '@inertiajs/react';
import Clima from "@/Components/Clima";
import axios from 'axios';
import { router } from '@inertiajs/react';


const Itinerari = ({ itinerari }) => {
    const { auth, errors } = usePage().props
    const [editing, setEditing] = useState(false);

    const { data, setData, patch, processing, reset } = useForm({
        itinerari_id: itinerari.id,
        nomItinerari: itinerari.nomItinerari,
        pais: itinerari.pais,
        descripcio: itinerari.descripcio,
        latitud: itinerari.latitud,
        longitud: itinerari.longitud,
        durada: itinerari.durada,
        climatologia: itinerari.climatologia,
        transport: itinerari.transport,
        visites: itinerari.visites,
        accessible: itinerari.accessible,
    });

    //const ubicacio = '48.8567,2.3508'
    const formatCordenades = (latitud, longitud) => {
        return `${latitud},${longitud}`
    }
    const ubicacio = (formatCordenades(itinerari.latitud, itinerari.longitud));

    const handleSubmitEditForm = (e) => {
        e.preventDefault();
        patch(route('itineraris.update', itinerari.id), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <div>
                {itinerari.viatge.usuari_id === auth.user.id &&
                    <div className="flex">
                        <DropdownItem viatge={itinerari} setEditing={setEditing} />
                    </div>
                }
                {
                    editing ?
                        <div className=" flex items-center justify-center  bg-white p-6 rounded-lg shadow-md hover:border-gray-400 transition duration-300 ease-in-out">
                            <form onSubmit={handleSubmitEditForm} encType="multipart/form-data" >
                                <div className="mb-4">
                                    <label htmlFor="nomItinerari" className="block text-gray-600 text-sm font-semibold mb-2">
                                        Nom del itinerari
                                    </label>
                                    <input
                                        type="text"
                                        id="nomItinerari"
                                        name="nomItinerari"
                                        value={data.nomItinerari}
                                        onChange={(e) => setData('nomItinerari', e.target.value)}
                                        placeholder="Nom del itinerari"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <InputError message={errors.nomItinerari} />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="descripcio" className="block text-gray-600 text-sm font-semibold mb-2">
                                        Descripció
                                    </label>
                                    <textarea
                                        id="descripcio"
                                        name="descripcio"
                                        value={data.descripcio}
                                        onChange={(e) => setData('descripcio', e.target.value)}
                                        placeholder="Descripció del itinerari"
                                        className="w-full border border-gray-300 rounded p-2"
                                    ></textarea>
                                    <InputError message={errors.descripcio} />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="pais" className="block text-gray-600 text-sm font-semibold mb-2">
                                        Pais
                                    </label>
                                    <input
                                        id="pais"
                                        name="pais"
                                        value={data.pais}
                                        onChange={(e) => setData('pais', e.target.value)}
                                        placeholder="Pais del itinerari"
                                        className="w-full border border-gray-300 rounded p-2"
                                    ></input>
                                    <InputError message={errors.pais} />
                                </div>

                                <p>Cordenades</p>
                                <div className="mb-4">
                                    <label htmlFor="latitud" className="block text-gray-600 text-sm font-semibold mb-2">
                                        Latitud
                                    </label>
                                    <input
                                        type="text"
                                        id="latitud"
                                        name="latitud"
                                        value={data.latitud}
                                        onChange={(e) => setData('latitud', e.target.value)}
                                        placeholder="Latitud"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <InputError message={errors.coordenades} />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="longitud" className="block text-gray-600 text-sm font-semibold mb-2">
                                        Longitud
                                    </label>
                                    <input
                                        type="text"
                                        id="longitud"
                                        name="longitud"
                                        value={data.longitud}
                                        onChange={(e) => setData('longitud', e.target.value)}
                                        placeholder="Longitud"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <InputError message={errors.coordenades} />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="transport" className="block text-gray-600 text-sm font-semibold mb-2">
                                        Transport
                                    </label>
                                    <input
                                        type="text"
                                        id="transport"
                                        name="transport"
                                        value={data.transport}
                                        onChange={(e) => setData('transport', e.target.value)}
                                        placeholder="Transport"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <InputError message={errors.transport} />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="durada" className="block text-gray-600 text-sm font-semibold mb-2">
                                        Durada (format hh:mm:ss)
                                    </label>
                                    <input
                                        type="text"
                                        id="durada"
                                        name="durada"
                                        value={data.durada}
                                        onChange={(e) => setData('durada', e.target.value)}
                                        placeholder="Durada"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <InputError message={errors.durada} />
                                </div>


                                <div>
                                    <PrimaryButton
                                        type="submit"
                                        className="mt-4"
                                        processing={processing ? 'Guardant...' : 'Guardar'}
                                    >
                                        Guardar Itinerari
                                    </PrimaryButton>

                                    <button className="mt-2 ml-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        onClick={() => setAdding(false) && reset()}
                                    >
                                        Cancel·lar
                                    </button>
                                </div>

                            </form>
                        </div>

                        : (

                            <>
                                <div className="flex items-center mb-4">
                                    <div className="pl-40 md:w-2/3 md:pr-8">
                                        <div className="mb-4">
                                            <h2 className="text-4xl font-bold text-black-700">{itinerari.nomItinerari}</h2>
                                            <span className="text-sm text-gray-700">(Itinerari)</span>
                                        </div>
                                        <div className=" mb-4 text-gray-800">
                                            <p className="text-lg">{itinerari.descripcio}</p>
                                            <p className="mt-4"><b className="text-xl">Pais:</b> {itinerari.pais}</p>
                                            <div className="mt-4">
                                                <p className="text-sm font-semibold">Coordenades</p>
                                                <div className="flex">
                                                    <p className="mr-4"><span className="text-xl">{itinerari.latitud}</span> Latitud</p>
                                                    <p className="mr-4"><span className="text-xl">{itinerari.longitud}</span> Longitud</p>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-xl">Duració: {itinerari.durada}</p>
                                            <p className="mt-4 text-xl">Transport: {itinerari.transport}</p>
                                            <div className="mt-4">
                                                <small className="text-gray-600">{itinerari.visites} visites</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mr-10 w-1/3">
                                        {/*<img className="w-full h-auto" src="https://picsum.photos/400/600" alt="" />*/}
                                        <img className="w-full h-auto" src={`http://localhost/img/itinerarisImg/${itinerari.foto}`} alt="" />
                                    </div>
                                </div>
                                <Clima ubicacio={ubicacio} />
                                <div className=" mt-10 mb-10 bg-white p-6 rounded-lg shadow-md hover:border-gray-400 transition duration-300 ease-in-out">
                                    <FormCalifiacio auth={auth} itinerari={itinerari} />
                                </div>
                                <div>

                                    <div className='items-center justify-center'>
                                        <iframe
                                            width="1000"
                                            height="450"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            allowFullScreen
                                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${itinerari.longitud}%2C${itinerari.latitud}%2C${itinerari.longitud}%2C${itinerari.latitud}&layer=mapnik&marker=${itinerari.latitud}%2C${itinerari.longitud}`}
                                        ></iframe>
                                    </div>
                                </div>
                            </>
                        )
                }
        </div>

    )
}

export default Itinerari;