// src/components/UserForm.js
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Option = styled.option`
  padding: 10px;
`;

const UserForm = ({ onSubmit }) => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    identification_type: "",
    identification_value: "",
    birthdate: "",
    gender: "",
    email: "",
    phone: "",
    tax_identification_type: "",
    tax_identification_value: "",
    nationality: "",
    legal_address: {
      street_name: "",
      street_number: "",
      floor: "",
      apartment: "",
      zip_code: "",
      neighborhood: "",
      city: "",
      region: "",
      additional_info: "",
      country: "",
    },
    operation_country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name in userData.legal_address) {
      setUserData({
        ...userData,
        legal_address: {
          ...userData.legal_address,
          [name]: value,
        },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          onChange={handleChange}
          value={userData.name}
          placeholder="Nombre"
        />

        <Label htmlFor="surname">Apellido</Label>
        <Input
          id="surname"
          name="surname"
          onChange={handleChange}
          value={userData.surname}
          placeholder="Apellido"
        />

        <Label htmlFor="identification_type">Tipo de documento</Label>
        <Input
          id="identification_type"
          name="identification_type"
          onChange={handleChange}
          value={userData.identification_type}
          placeholder="Tipo de documento"
        />

        <Label htmlFor="identification_value">Número de documento</Label>
        <Input
          id="identification_value"
          name="identification_value"
          onChange={handleChange}
          value={userData.identification_value}
          placeholder="Número de documento"
        />

        <Label htmlFor="birthdate">Fecha de nacimiento</Label>
        <Input
          id="birthdate"
          name="birthdate"
          onChange={handleChange}
          value={userData.birthdate}
          placeholder="Fecha de nacimiento"
        />

        <Label htmlFor="gender">Género</Label>
        <Input
          id="gender"
          name="gender"
          onChange={handleChange}
          value={userData.gender}
          placeholder="Género"
        />

        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          onChange={handleChange}
          value={userData.email}
          placeholder="Email"
        />

        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          onChange={handleChange}
          value={userData.phone}
          placeholder="Teléfono"
        />

        <Label htmlFor="tax_identification_type">
          Tipo de identificación fiscal
        </Label>
        <Input
          id="tax_identification_type"
          name="tax_identification_type"
          onChange={handleChange}
          value={userData.tax_identification_type}
          placeholder="Tipo de identificación fiscal"
        />

        <Label htmlFor="tax_identification_value">
          Número de identificación fiscal
        </Label>
        <Input
          id="tax_identification_value"
          name="tax_identification_value"
          onChange={handleChange}
          value={userData.tax_identification_value}
          placeholder="Número de identificación fiscal"
        />

        <Label htmlFor="nationality">Nacionalidad</Label>
        <Input
          id="nationality"
          name="nationality"
          onChange={handleChange}
          value={userData.nationality}
          placeholder="Nacionalidad"
        />
        {/* <Select
          id="nationality"
          name="nationality"
          onChange={handleChange}
          value={userData.nationality}
        >
          <Option value="">Selecciona una opción</Option>
          <Option value="ARG">ARG</Option>
          <Option value="BRA">BRA</Option>
          <Option value="MEX">MEX</Option>
          <Option value="COL">COL</Option>
          <Option value="PER">PER</Option>
          <Option value="CHL">CHL</Option>
        </Select> */}

        <Label htmlFor="legal_address">Dirección legal</Label>
        <Input
          id="street_name"
          name="street_name"
          onChange={handleChange}
          value={userData.legal_address.street_name}
          placeholder="Calle"
        />
        <Input
          id="street_number"
          name="street_number"
          onChange={handleChange}
          value={userData.legal_address.street_number}
          placeholder="Número"
        />
        <Input
          id="floor"
          name="floor"
          onChange={handleChange}
          value={userData.legal_address.floor}
          placeholder="Piso"
        />
        <Input
          id="apartment"
          name="apartment"
          onChange={handleChange}
          value={userData.legal_address.apartment}
          placeholder="Departamento"
        />
        <Input
          id="zip_code"
          name="zip_code"
          onChange={handleChange}
          value={userData.legal_address.zip_code}
          placeholder="Código postal"
        />
        <Input
          id="neighborhood"
          name="neighborhood"
          onChange={handleChange}
          value={userData.legal_address.neighborhood}
          placeholder="Barrio"
        />
        <Input
          id="city"
          name="city"
          onChange={handleChange}
          value={userData.legal_address.city}
          placeholder="Ciudad"
        />
        <Input
          id="region"
          name="region"
          onChange={handleChange}
          value={userData.legal_address.region}
          placeholder="Región"
        />
        <Input
          id="additional_info"
          name="additional_info"
          onChange={handleChange}
          value={userData.legal_address.additional_info}
          placeholder="Información adicional"
        />
        <Input
          id="country"
          name="country"
          onChange={handleChange}
          value={userData.legal_address.country}
          placeholder="País"
        />

        <Label htmlFor="operation_country">País de operación</Label>
        <Input
          id="operation_country"
          name="operation_country"
          onChange={handleChange}
          value={userData.operation_country}
          placeholder="País de operación"
        />
        {/* <Select
          id="operation_country"
          name="operation_country"
          onChange={handleChange}
          value={userData.operation_country}
        >
          <Option value="">Selecciona una opción</Option>
          <Option value="ARG">ARG</Option>
          <Option value="BRA">BRA</Option>
          <Option value="MEX">MEX</Option>
          <Option value="COL">COL</Option>
          <Option value="PER">PER</Option>
          <Option value="CHL">CHL</Option>
        </Select> */}

        <Button type="submit">Crear Usuario</Button>
      </Form>
    </FormContainer>
  );
};

export default UserForm;
