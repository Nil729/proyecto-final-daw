import React from 'react';
import Dropdown from './Dropdown'; // Assegura't d'importar correctament el component Dropdown
// Ajusta les rutes i altres valors segons la teva aplicació

const DropdownItem = ({ viatge, setEditing }) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button className="flex justify-center items-center">
                    <b>Accions</b>
                    <span className="mr-2">
                        {/* Icono */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                    </span>
                </button>
            </Dropdown.Trigger>

            <Dropdown.Content>
                <button className="flex items-center" onClick={() => setEditing(true)}>
                    <span className="mr-2">
                        {/* Icono de editar */}
                        <svg className="w-4 h-4" fill="none" stroke="blue" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </span>
                    Editar
                </button>
                <Dropdown.Link
                    as="button"
                    method="delete"
                    href={route('itineraris.destroy', viatge.id)}
                >
                    <button className="flex items-center">
                        <span className="mr-2">
                            {/* Icono de eliminar */}
                            <svg className="w-4 h-4" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </span>
                        Eliminar
                    </button>
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default DropdownItem;
