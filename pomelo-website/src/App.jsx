// src/App.js
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';
import UserForm from './components/UserForm';
import CardForm from './components/CardForm';
import { createUsers, createCard } from './utils/FetchData';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const App = () => {
  const removeEmptyFields = (data) => {
    // Recorre cada campo en el objeto y verifica si está vacío
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] === null) {
        delete data[key];
      } else if (typeof data[key] === 'object') {
        // Aplica la misma lógica a los objetos anidados
        data[key] = removeEmptyFields(data[key]);
      }
    });
    return data;
  };
  
  const handleUserSubmit = async (userData) => {
    try {
      // Elimina los campos vacíos antes de enviar
      const cleanedData = removeEmptyFields({ ...userData });
      console.log("Datos enviados:", cleanedData); // Para depuración
      await createUsers(cleanedData);
      alert('Usuario creado con éxito');
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert('Error al crear usuario');
    }
  };
  
  

  const handleCardSubmit = async (cardData, user_id) => {
    try {
      // Elimina los campos vacíos antes de enviar
      const cleanedData = removeEmptyFields({ ...cardData });
      console.log("Datos enviados:", cleanedData); // Para depuración
      await createCard(cleanedData, user_id);
      alert('Tarjeta creada con éxito');
    } catch (error) {
      console.log("Error al crear la tarjeta:", error)
      alert('Error al crear tarjeta');
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab sx={{color: "white"}} label="Crear Usuario" {...a11yProps(0)} />
            <Tab sx={{color: "white"}} label="Crear Tarjeta" {...a11yProps(1)} />
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        <UserForm onSubmit={handleUserSubmit} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <CardForm onSubmit={handleCardSubmit} />
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel> */}
      </Box>
      </>
  );
};

export default App;
