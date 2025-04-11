import React,{useState, useEffect} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/inertia-react";
import { router, usePage } from '@inertiajs/react';
import Viatge from "@/Components/Viatge";

const Index = ({ auth, viatges }) => {
    const { errors } = usePage().props
    const { data, setData, processing, reset } = useForm({
        nomViatge: '',
        descripcio: '',
        dataInici: '',
        dataFi: '',
    });




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data); // Verifica les dades aquí abans d'enviar-les
        router.post('viatges', data, {
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear viatge
                </h2>
            }
        >
            <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                <form onSubmit={handleSubmit}>
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

                    <div className="mt-3">
                        <label htmlFor="dataInici">Data d'inici</label>
                        <input type="date" name="dataInici" id="dataInici"
                            value={data.dataInici}
                            onChange={e => setData('dataInici', e.target.value)}
                            placeholder="Data d'inici"
                            className="w-full border border-gray-300 rounded p-2 mt-2"
                        />
                        <InputError message={errors.dataInici} className="mt-2" />
                    </div>


                    <div className="mt-3">
                        <label htmlFor="dataFi">Data de fi</label>
                        <input type="date" name="dataFi" id="dataFi"
                            value={data.dataFi}
                            onChange={e => setData('dataFi', e.target.value)}
                            placeholder="Data de fi"
                            className="w-full border border-gray-300 rounded p-2 mt-2"
                        />
                        <InputError message={errors.dataFi} className="mt-2" />
                    </div>

                    <PrimaryButton
                        className="mt-4"
                        processing={processing ? 'Creant...' : 'Crear'}
                    >
                        Crear viatge
                    </PrimaryButton>

                </form>
                <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <div>
                        {alert &&
                            <div className="alert alert-warning">
                                {alert}
                            </div>
                        }
                        {/* Rest of your component */}
                    </div>
                    {
                        viatges.map((viatge) => (

                            <Viatge key={viatge.id} viatge={viatge} />
                        ))
                    }
                </div>
            </div>
        </AuthenticatedLayout>



    );
}

export default Index;