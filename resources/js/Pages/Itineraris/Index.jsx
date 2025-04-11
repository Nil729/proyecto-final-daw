import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Head, useForm } from "@inertiajs/inertia-react";
import { router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Itinerari from "@/Components/Itinerari";
import { FaPlus } from "react-icons/fa";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";


const Index = ({ auth, viatge, itineraris, request }) => {
    const [adding, setAdding] = useState(false);
    const { data, setData, processing, reset, errors } = useForm({
        viatge_id: viatge.id,
        nomItinerari: itineraris.nomItinerari,
        descripcio: itineraris.descripcio,
        pais: itineraris.pais,
        latitud: itineraris.latitud,
        longitud: itineraris.longitud,
        transport: itineraris.transport,
        visites: 0,
        durada: itineraris.durada,
        completat: false,
        foto: itineraris.foto ,
    });

    const handleSubmitItinerari = (e) => {
        e.preventDefault();
        router.post('itineraris', data, {
            onSuccess: () => reset(),
            setAdding: () => setAdding(false),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Itineraris
                </h2>
            }
        >
            <div className="container  mx-auto p-2 px-4 sm:px-8 max-w-3x2">

                <div className="flex mx-auto mt-16 w-1/2">
                    <h1 className="flex text-4xl font-bold text-gray-800 w-2/3 items-center">
                        {viatge.nomViatge}
                    </h1>
                    {viatge.usuari.id == auth.user.id &&
                    <button className="w-1/3 mt-7 flex items-center justify-center text-white bg-slate-500 font-semibold rounded-md hover:bg-slate-900"
                        onClick={() => adding ? setAdding(false) : setAdding(true)}
                    >

                        {
                            adding ? '...'
                                : (
                                    <>

                                        <FaPlus className="mr-2" />
                                        <p>Afegir itinerari</p>

                                    </>
                                )}
                    </button>
                    }
                </div>

                {adding && (
                    <div className="flex flex-col mt-8">


                        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                            <h1 className="text-2xl font-bold text-gray-800">Afegir itinerari</h1>
                            <form onSubmit={handleSubmitItinerari} encType="multipart/form-data">
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

                                <div className="mb-4">
                                    <label htmlFor="foto" className="block text-gray-600 text-sm font-semibold mb-2">
                                        Imatge del itinerari
                                    </label>
                                    <input

                                        type="file"
                                        id="foto"
                                        name="foto"
                                        accept="image/*"
                                        onChange={(e) => setData('foto', e.target.files[0])}
                                        placeholder="Foto"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <InputError message={errors.foto} />
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

                    </div>

                )}

                {
                    itineraris.map(itinerari => (
                        <Itinerari key={itinerari.id} itinerari={itinerari} />
                    ))
                }

            </div>

        </AuthenticatedLayout >

    );
}

export default Index;
