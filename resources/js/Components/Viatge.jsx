import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/inertia-react";
import { usePage, Link } from '@inertiajs/react';

dayjs.extend(relativeTime);

const Viatge = ({ viatge }) => {
    
    const { auth, errors } = usePage().props

    const [editing, setEditing] = useState(false);
    const { data, setData, patch, processing, reset } = useForm({
        nomViatge: viatge.nomViatge,
        descripcio: viatge.descripcio,
        dataInici: viatge.dataInici,
        dataFi: viatge.dataFi,
    });

    const handleSubmitEditForm = (e) => {
        e.preventDefault();
        patch(route('viatges.update', viatge.id), {
            onSuccess: () => setEditing(false),
        });
    }

    return (
        <div className="bg-white p-6 mb-4 rounded-lg shadow-md hover:bg-gray-200 hover:border-gray-400 transition duration-300 ease-in-out">
            <div className="flex justify-between items-center">
                <p className="text-gray-500">Autor: {viatge.usuari.name}</p>
                <p className="text-gray-500">
                    Creat fa {dayjs(viatge.created_at).fromNow()}
                </p>
                {viatge.created_at !== viatge.updated_at && <div className="text-gray-500"> &middot; {dayjs(viatge.updated_at).fromNow()}</div>}


                {viatge.usuari_id === auth.user.id &&
                    <Dropdown>
                        <Dropdown.Trigger >
                            {/*put the button at left side*/}
                            <button className="flex justify-end items-center">
                                <b>Accions</b>
                                <span className="mr-2">
                                    {/* Puedes cambiar el icono SVG por otro que prefieras */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                </span>
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <button className="flex items-center" onClick={() => setEditing(true)}>
                                <span className="mr-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        {/* Icono de lápiz o editar */}
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                </span>
                                Editar
                            </button>
                            <Dropdown.Link
                                as="button"
                                method="delete"
                                href={route('viatges.destroy', viatge.id)}
                            >
                                <button>
                                    <span className="mr-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            {/* Icono de basura o eliminar */}
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </span>
                                    Eliminar
                                </button>
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                }
            </div>
            {
                editing ?
                    <form onSubmit={handleSubmitEditForm}>
                        <input
                            type="text"
                            name="nomViatge"
                            id="nomViatge"
                            value={data.nomViatge}
                            onChange={e => setData('nomViatge', e.target.value)}
                            placeholder="Titul del viatge"
                            autoFocus
                            className="w-full border border-gray-300 rounded p-2 mt-2"
                        />
                        <InputError message={errors.nomViatge} className="mt-2" />

                        <textarea name="descripcio" id="descripcio" cols="30" rows="10"
                            value={data.descripcio}
                            onChange={e => setData('descripcio', e.target.value)}
                            placeholder="Descripció del viatge"
                            className="w-full border border-gray-300 rounded p-2 mt-2"
                        >
                        </textarea>
                        <InputError message={errors.descripcio} className="mt-2" />

                        <input type="date" name="dataInici" id="dataInici"
                            value={data.dataInici}
                            onChange={e => setData('dataInici', e.target.value)}
                            placeholder="Data d'inici"
                            className="w-full border border-gray-300 rounded p-2 mt-2"
                        />
                        <InputError message={errors.dataInici} className="mt-2" />

                        <input type="date" name="dataFi" id="dataFi"
                            value={data.dataFi}
                            onChange={e => setData('dataFi', e.target.value)}
                            placeholder="Data de fi"
                            className="w-full border border-gray-300 rounded p-2 mt-2"
                        />
                        <InputError message={errors.dataFi} className="mt-2" />
                        <div>
                            <PrimaryButton className="mt-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"

                                processing={processing ? 'Actualitzant...' : 'Actualitzar'}
                            >
                                Actualitzar
                            </PrimaryButton>

                            <button className="mt-2 ml-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                onClick={() => setEditing(false) && reset()}
                            >
                                Cancel·lar

                            </button>
                        </div>


                    </form>
                    : (
                        <>
                            <Link href={`/itineraris?viatgeId=${viatge.id}&usuari_id=${viatge.usuari_id}`} key={viatge.id}>
                                <h2 className="text-2xl font-semibold mb-2">{viatge.nomViatge}</h2>

                                <p className="text-gray-600 mb-4">{viatge.descripcio}</p>

                                <div className="">

                                    <p className="text-gray-500">Inici: {viatge.dataInici}</p>
                                    <p className="text-gray-500">Fi: {viatge.dataFi}</p>

                                </div>
                            </Link>
                        </>
                    )
            }


        </div>

    );
}

export default Viatge;