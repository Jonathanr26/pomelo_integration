// src/components/UserForm.js
import React, { useState } from "react";
import styled from "styled-components";
import { getUserID } from "../utils/FetchData";

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

const CardForm = ({ onSubmit }) => {
  const [emailUser, setEmailUser] = useState("");
  const [user_id, setUserID] = useState(null);

  const [cardData, setCardData] = useState({
    card_type: "PHYSICAL",
    address: {
      street_name: "",
      street_number: "",
      floor: "",
      apartment: "",
      city: "",
      region: "",
      country: "",
      zip_code: "",
      neighborhood: "",
    },
    pin: "",
  });

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmailUser(value);
  };

  const handleUserIDSumbit = async (emailUser) => {
    try {
      const response = await getUserID(emailUser);

      // Verifica si la respuesta contiene al menos un objeto
      if (response.data && response.data.length > 0) {
        const userID = response.data[0].id; // Obtiene el 'id' del primer objeto en el arreglo
        setUserID(userID);
        alert("User ID obtenido con éxito");
      } else {
        alert("No se encontró el usuario");
      }
    } catch (error) {
      console.error("Error al obtener el User ID", error);
      alert("Error al obtener el User ID");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in cardData.address) {
      setCardData({
        ...cardData,
        address: {
          ...cardData.address,
          [name]: value,
        },
      });
    } else {
      setCardData({ ...cardData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user_id) {
      onSubmit(cardData, user_id);
    } else {
      alert("Primero obtén el User ID");
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    handleUserIDSumbit(emailUser);
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmitEmail}>
          <Label htmlFor="emailUser">Ingresa tu Email</Label>
          <Input
            id="emailUser"
            name="emailUser"
            onChange={handleChangeEmail}
            value={emailUser}
            placeholder="Ingresa tu Email"
          />
          <Button type="submit">Iniciar</Button>
        </Form>
      </FormContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="card_type">Tipo de Tarjeta</Label>
          {/* <Input
          id="card_type"
          name="card_type"
          onChange={handleChange}
          value={cardData.card_type}
          placeholder="Tipo de Tarjeta"
        /> */}
          <Select
            id="card_type"
            name="card_type"
            onChange={handleChange}
            value={cardData.card_type}
          >
            <Option value="">Selecciona una opción</Option>
            <Option value="VIRTUAL">Virtual</Option>
            <Option value="PHYSICAL">Física</Option>
          </Select>
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="street_name"
            name="street_name"
            onChange={handleChange}
            value={cardData.address.street_name}
            placeholder="Calle"
          />
          <Input
            id="street_number"
            name="street_number"
            onChange={handleChange}
            value={cardData.address.street_number}
            placeholder="Número"
          />
          <Input
            id="floor"
            name="floor"
            onChange={handleChange}
            value={cardData.address.floor}
            placeholder="Piso"
          />
          <Input
            id="apartment"
            name="apartment"
            onChange={handleChange}
            value={cardData.address.apartment}
            placeholder="Departamento"
          />
          <Input
            id="city"
            name="city"
            onChange={handleChange}
            value={cardData.address.city}
            placeholder="Ciudad"
          />
          <Input
            id="region"
            name="region"
            onChange={handleChange}
            value={cardData.address.region}
            placeholder="Región"
          />
          <Input
            id="country"
            name="country"
            onChange={handleChange}
            value={cardData.address.country}
            placeholder="País"
          />
          <Input
            id="zip_code"
            name="zip_code"
            onChange={handleChange}
            value={cardData.address.zip_code}
            placeholder="Código postal"
          />
          <Input
            id="neighborhood"
            name="neighborhood"
            onChange={handleChange}
            value={cardData.address.neighborhood}
            placeholder="Barrio"
          />
          <Button type="submit">Crear tarjeta</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CardForm;
