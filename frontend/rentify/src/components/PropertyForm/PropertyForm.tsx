import React, { useState } from 'react';

type PropertyType = 'casa' | 'departamento';

interface PropertyData {
  nombre: string;
  apellido: string;
  tipoDePropiedad: PropertyType;
  pais: string;
  ciudad: string;
  direccion: string;
  fotos: File[];
}

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<PropertyData>({
    nombre: '',
    apellido: '',
    tipoDePropiedad: 'casa',
    pais: '',
    ciudad: '',
    direccion: '',
    fotos: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({ ...formData, fotos: Array.from(event.target.files) });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un servidor
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="apellido" className="block mb-2">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="tipoDePropiedad" className="block mb-2">
          Tipo de Propiedad:
        </label>
        <select
          id="tipoDePropiedad"
          name="tipoDePropiedad"
          value={formData.tipoDePropiedad}
          onChange={handleInputChange}
          className="border border-gray-400 px-3 py-2 rounded w-full"
        >
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="pais" className="block mb-2">
            País:
          </label>
          <input
            type="text"
            id="pais"
            name="pais"
            value={formData.pais}
            onChange={handleInputChange}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="ciudad" className="block mb-2">
            Ciudad:
          </label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleInputChange}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="direccion" className="block mb-2">
          Dirección:
        </label>
        <textarea
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          required
        />
      </div>

      <div className="mt-4">
        <label htmlFor="fotos" className="block mb-2">
          Fotos (máximo 12):
        </label>
        <input
          type="file"
          id="fotos"
          name="fotos"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-400 px-3 py-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Registrar Propiedad
      </button>
    </form>
  );
};

export default PropertyForm;