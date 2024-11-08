import { useState } from 'react';
import FormLoader from '../../components/PropertyForm/FormLoader/FormLoader';
import PropertyForm from '../../components/PropertyForm/PropertyForm';

const RegisterPropertyPage: React.FC = () => {
  const [isLoadingForm, setisLoadingForm] = useState(false);
  if (isLoadingForm) return <FormLoader />;
  return (
    <>
      <PropertyForm setIsLoadingForm={setisLoadingForm} />
    </>
  );
};

export default RegisterPropertyPage;